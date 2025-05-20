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

    // Lấy thông tin variants từ database
    const variants = await this.prisma.variant.findMany({
      where: { id: { in: variantIds } },
    });

    // Kiểm tra xem các variant có tồn tại không
    if (variants.length !== dto.items.length) {
      throw new NotFoundException('Some variants not found');
    }

    // Tạo các order items
    const orderItems = await Promise.all(
      dto.items.map(async (item) => {
        const variant = variants.find((v) => v.id === item.variantId);
        const product = await this.prisma.product.findUnique({
          where: { id: variant.productId },
          include: { category: true },
        });

        if (!product) throw new NotFoundException('Product not found');
        const category = product.category;

        // Lấy các discount áp dụng cho product và category
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

        // Tính toán giá gốc và giảm giá cho từng item
        let discountedPrice = variant.price;
        const originalPrice = variant.price; // Giá gốc

        let isDiscountApplied = false;

        for (const discount of discounts) {
          // Kiểm tra xem discount có còn hiệu lực không
          if (
            discount.status === 'ACTIVE' &&
            new Date() >= discount.startDate &&
            new Date() <= discount.endDate
          ) {
            if (
              discount.applyType === 'PRODUCT' ||
              discount.applyType === 'ALL' // Giảm giá cho tất cả sản phẩm
            ) {
              isDiscountApplied = true;
              // Áp dụng discount cho variant
              if (discount.type === 'PERCENTAGE') {
                discountedPrice -= (discountedPrice * discount.discount) / 100;
              } else if (discount.type === 'FIXED_AMOUNT') {
                discountedPrice -= discount.discount;
              }
            }
          }
        }

        // Nếu không có discount hợp lệ, sử dụng giá gốc
        if (!isDiscountApplied) {
          discountedPrice = originalPrice;
        }

        // Tính tổng tiền cho item (quantity * discountedPrice)
        const price = discountedPrice * item.quantity;
        return {
          variantId: item.variantId,
          quantity: item.quantity,
          unitPrice: originalPrice,
          price,
          discount: originalPrice - discountedPrice, // Chênh lệch giá trị giảm
        };
      })
    );

    // Tính tổng tiền cho đơn hàng (cộng dồn tất cả các order items)
    let total = orderItems.reduce((sum, item) => sum + item.price, 0);
    let voucherDiscount = 0;

    // Kiểm tra voucher và áp dụng
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

      // Tính toán voucher discount
      voucherDiscount = this.calculateVoucherDiscount(
        voucher.type,
        voucher.discountValue,
        total,
        voucher.maxDiscount
      );

      // Voucher không thể giảm quá tổng giá trị của đơn hàng
      if (voucherDiscount > total) {
        voucherDiscount = total;
      }

      total -= voucherDiscount; // Cập nhật tổng tiền sau khi áp dụng voucher
    }

    // Thực hiện tạo đơn hàng, cập nhật giỏ hàng, và cập nhật voucher nếu có
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

  async getAll(userId: string): Promise<OrderResponseDTO[]> {
    const orders = await this.prisma.order.findMany({
      where: { userId },
      include: { items: true },
    });

    return orders.map((order) => OrderMapper.toOrderDTO(order));
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
