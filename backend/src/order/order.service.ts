import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateOrderDTO } from './dto/order-create.dto';
import { OrderResponseDTO } from './dto/order-response.dto';
import { OrderMapper } from './order.mapper';
import { UpdateOrderStatusDTO } from './dto/order-update-status.dto';

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

    const orderItems = dto.items.map((item) => {
      const variant = variants.find((v) => v.id === item.variantId);
      const unitPrice = variant.price;
      const price = unitPrice * item.quantity;
      return {
        variantId: item.variantId,
        quantity: item.quantity,
        unitPrice,
        price,
        discount: 0,
      };
    });

    const total = orderItems.reduce((sum, item) => sum + item.price, 0);

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
          voucherDiscount: 0,
          items: {
            create: orderItems,
          },
        },
        include: {
          items: true,
        },
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
    ]);

    return OrderMapper.toOrderDTO(order);
  }

  async getAll(userId: string): Promise<OrderResponseDTO[]> {
    const orders = await this.prisma.order.findMany({
      where: { userId },
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
