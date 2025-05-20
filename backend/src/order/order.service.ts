import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateOrderDTO } from './dto/order-create.dto';
import { OrderResponseDTO } from './dto/order-response.dto';
import { OrderMapper } from './order.mapper';
import { UpdateOrderStatusDTO } from './dto/order-update-status.dto';
import { VoucherStatus, VoucherType } from '@prisma/client';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, dto: CreateOrderDTO): Promise<OrderResponseDTO> {
    const variantIds = dto.items.map((item) => item.variantId);

    const variants = await this.prisma.variant.findMany({
      where: { id: { in: variantIds } },
    });

    if (variants.length !== dto.items.length) {
      throw new NotFoundException('Some variants not found');
    }

    const orderItems = await Promise.all(
      dto.items.map(async (item) => {
        const variant = variants.find((v) => v.id === item.variantId);
        const product = await this.prisma.product.findUnique({
          where: { id: variant.productId },
          include: { category: true },
        });

        if (!product) throw new NotFoundException('Product not found');
        const category = product.category;

        const productDiscounts = await this.prisma.productDiscount.findMany({
          where: { productId: product.id },
          include: { discount: true },
        });

        const categoryDiscounts = await this.prisma.categoryDiscount.findMany({
          where: { categoryId: category.id },
          include: { discount: true },
        });

        const discounts = [
          ...productDiscounts.map((pd) => pd.discount),
          ...categoryDiscounts.map((cd) => cd.discount),
        ];

        let discountedPrice = variant.price;
        const originalPrice = variant.price;

        let isDiscountApplied = false;

        for (const discount of discounts) {
          if (
            discount.status === 'ACTIVE' &&
            new Date() >= discount.startDate &&
            new Date() <= discount.endDate
          ) {
            if (
              discount.applyType === 'PRODUCT' ||
              discount.applyType === 'ALL'
            ) {
              isDiscountApplied = true;
              if (discount.type === 'PERCENTAGE') {
                discountedPrice -= (discountedPrice * discount.discount) / 100;
              } else if (discount.type === 'FIXED_AMOUNT') {
                discountedPrice -= discount.discount;
              }
            }
          }
        }

        if (!isDiscountApplied) {
          discountedPrice = originalPrice;
        }

        const price = discountedPrice * item.quantity;
        return {
          variantId: item.variantId,
          quantity: item.quantity,
          unitPrice: originalPrice,
          price,
          discount: originalPrice - discountedPrice,
        };
      })
    );

    let total = orderItems.reduce((sum, item) => sum + item.price, 0);
    let voucherDiscount = 0;

    if (dto.voucherId) {
      const voucher = await this.prisma.voucher.findUnique({
        where: { id: dto.voucherId },
      });

      if (!voucher || voucher.status !== VoucherStatus.ACTIVE) {
        throw new NotFoundException('Voucher is not valid or inactive');
      }

      const now = new Date();
      if (voucher.startDate > now || voucher.endDate < now) {
        throw new BadRequestException('Voucher is not in valid date range');
      }

      if (voucher.minPrice && total < voucher.minPrice) {
        throw new BadRequestException(
          `Order total must be at least ${voucher.minPrice}`
        );
      }

      if (voucher.usageLimit > 0 && voucher.usedCount >= voucher.usageLimit) {
        throw new BadRequestException('Voucher has reached its usage limit');
      }

      const hasUsed = await this.prisma.voucherUsage.findFirst({
        where: {
          userId,
          voucherId: voucher.id,
        },
      });

      if (hasUsed) {
        throw new BadRequestException('You have already used this voucher');
      }

      voucherDiscount = this.calculateVoucherDiscount(
        voucher.type,
        voucher.discountValue,
        total,
        voucher.maxDiscount
      );

      if (voucherDiscount > total) {
        voucherDiscount = total;
      }

      total -= voucherDiscount;
    }

    const [order] = await this.prisma.$transaction([
      this.prisma.order.create({
        data: {
          userId,
          fullName: dto.fullName,
          phone: dto.phone,
          streetAddress: dto.streetAddress,
          ward: dto.ward,
          district: dto.district,
          city: dto.city,
          province: dto.province,
          country: dto.country,
          status: 'PENDING',
          total,
          voucherId: dto.voucherId,
          voucherDiscount,
          items: {
            create: orderItems,
          },
        },
        include: { items: true },
      }),

      this.prisma.cartItem.deleteMany({
        where: {
          cart: { userId },
          isSelected: true,
        },
      }),

      this.prisma.cart.update({
        where: { userId },
        data: { totalAmount: 0 },
      }),

      ...(dto.voucherId
        ? [
            this.prisma.voucher.update({
              where: { id: dto.voucherId },
              data: {
                usedCount: { increment: 1 },
              },
            }),
            this.prisma.voucherUsage.create({
              data: {
                userId,
                voucherId: dto.voucherId,
              },
            }),
          ]
        : []),
    ]);

    return OrderMapper.toOrderDTO(order);
  }

  private calculateVoucherDiscount(
    type: VoucherType,
    value: number,
    total: number,
    maxDiscount?: number | null
  ): number {
    if (type === VoucherType.PERCENTAGE) {
      const discount = (value / 100) * total;
      return maxDiscount ? Math.min(discount, maxDiscount) : discount;
    }
    if (type === VoucherType.FIXED_AMOUNT) {
      return value;
    }
    return 0;
  }

  async getAll(
    userId: string,
    limit: number,
    cursor?: string
  ): Promise<{ data: OrderResponseDTO[]; nextCursor: string | null }> {
    const orders = await this.prisma.order.findMany({
      where: { userId },
      take: limit + 1,
      ...(cursor && {
        skip: 1,
        cursor: { id: cursor },
      }),
      orderBy: { id: 'asc' },
      include: {
        items: true,
      },
    });

    let nextCursor: string | null = null;
    if (orders.length > limit) {
      const nextItem = orders.pop();
      nextCursor = nextItem?.id || null;
    }

    const formatted = orders.map((order) => OrderMapper.toOrderDTO(order));

    return { data: formatted, nextCursor };
  }

  async getAllOrders(): Promise<OrderResponseDTO[]> {
    const orders = await this.prisma.order.findMany({
      include: { items: true },
    });

    return orders.map((order) => OrderMapper.toOrderDTO(order));
  }

  async getById(userId: string, id: string): Promise<OrderResponseDTO> {
    const order = await this.prisma.order.findUnique({
      where: { id },
      include: { items: true },
    });

    if (!order || order.userId !== userId) {
      throw new NotFoundException('Order not found');
    }

    return OrderMapper.toOrderDTO(order);
  }

  async updateStatus(
    orderId: string,
    dto: UpdateOrderStatusDTO
  ): Promise<OrderResponseDTO> {
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
      include: { items: true },
    });

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    const updated = await this.prisma.order.update({
      where: { id: orderId },
      data: { status: dto.status },
      include: { items: true },
    });

    return OrderMapper.toOrderDTO(updated);
  }
}
