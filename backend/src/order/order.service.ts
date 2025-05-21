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
import { DiscountService } from 'src/discount/discount.service';
import { VoucherService } from 'src/voucher/voucher.service';
import { CartService } from 'src/cart/cart.service';
import { OrderItemResponseDTO } from './dto/order-item-response.dto';
import { PaypalService } from 'src/paypal/paypal.service';
import { PaymentService } from 'src/payment/payment.service';
import { InvoiceService } from 'src/invoice/invoice.service';

@Injectable()
export class OrderService {
  constructor(
    private prisma: PrismaService,
    private discountService: DiscountService,
    private voucherService: VoucherService,
    private cartService: CartService,
    private paypalService: PaypalService,
    private paymentService: PaymentService,
    private invoiceService: InvoiceService
  ) {}

  async create(userId: string, dto: CreateOrderDTO): Promise<OrderResponseDTO> {
    const variantIds = dto.items.map((item) => item.variantId);

    const variants = await this.prisma.variant.findMany({
      where: { id: { in: variantIds } },
    });

    if (variants.length !== dto.items.length) {
      throw new NotFoundException('Một số variant không tồn tại');
    }

    // Tính từng item
    const orderItems: Omit<OrderItemResponseDTO, 'id'>[] = [];

    let total = 0;

    for (const item of dto.items) {
      const variant = variants.find((v) => v.id === item.variantId);
      const product = await this.prisma.product.findUnique({
        where: { id: variant.productId },
        include: { category: true },
      });

      if (!product) throw new NotFoundException('Product không tồn tại');

      const discountedPrice =
        await this.discountService.calculateDiscountedPrice(
          variant,
          product,
          product.category
        );

      const unitPrice = variant.price;
      const price = discountedPrice * item.quantity;
      const discountAmount = unitPrice - discountedPrice;

      total += price;

      orderItems.push({
        variantId: item.variantId,
        quantity: item.quantity,
        unitPrice,
        price,
        discount: discountAmount,
      });
    }

    // Voucher
    let voucherDiscount = 0;
    if (dto.voucherId) {
      const voucher = await this.voucherService.validateVoucher(
        userId,
        dto.voucherId,
        total
      );

      voucherDiscount = this.voucherService.calculateVoucherDiscount(
        voucher,
        total
      );

      total -= voucherDiscount;
    }

    // Transaction
    const order = await this.prisma.$transaction(async (tx) => {
      const createdOrder = await tx.order.create({
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
            create: orderItems.map((i) => ({
              variantId: i.variantId,
              quantity: i.quantity,
              unitPrice: i.unitPrice,
              price: i.price,
              discount: i.discount,
            })),
          },
        },
        include: { items: true },
      });

      await this.cartService.clearSelectedItems(userId, tx);
      await this.cartService.resetCartTotal(userId, tx);

      if (dto.voucherId) {
        await this.voucherService.applyVoucherUsage(userId, dto.voucherId, tx);
      }

      return createdOrder;
    });

    return {
      id: order.id,
      userId: order.userId,
      fullName: order.fullName,
      phone: order.phone,
      total: order.total,
      voucherDiscount: order.voucherDiscount,
      status: order.status,
      items: order.items,
      streetAddress: order.streetAddress,
      ward: order.ward,
      district: order.district,
      city: order.city,
      province: order.province,
      country: order.country,
      paymentMethod: order.paymentMethod,
    };
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

  async createPaypalOrder(userId: string, dto: CreateOrderDTO) {
    const variantIds = dto.items.map((item) => item.variantId);
    const variants = await this.prisma.variant.findMany({
      where: { id: { in: variantIds } },
    });

    if (variants.length !== dto.items.length) {
      throw new NotFoundException('Một số variant không tồn tại');
    }

    let total = 0;
    for (const item of dto.items) {
      const variant = variants.find((v) => v.id === item.variantId);
      const product = await this.prisma.product.findUnique({
        where: { id: variant.productId },
        include: { category: true },
      });

      const discountedPrice =
        await this.discountService.calculateDiscountedPrice(
          variant,
          product,
          product.category
        );
      total += discountedPrice * item.quantity;
    }

    if (dto.voucherId) {
      const voucher = await this.voucherService.validateVoucher(
        userId,
        dto.voucherId,
        total
      );
      const voucherDiscount = this.voucherService.calculateVoucherDiscount(
        voucher,
        total
      );
      total -= voucherDiscount;
    }

    const paypalOrder = await this.paypalService.createOrder(total.toFixed(2));
    return { paypalOrderId: paypalOrder.id };
  }

  async createOrderAndPaypalOrder(userId: string, dto: CreateOrderDTO) {
    const variantIds = dto.items.map((i) => i.variantId);
    const variants = await this.prisma.variant.findMany({
      where: { id: { in: variantIds } },
    });
    if (variants.length !== dto.items.length)
      throw new NotFoundException('Variant không tồn tại');

    let total = 0;
    const orderItemsData = [];
    for (const item of dto.items) {
      const variant = variants.find((v) => v.id === item.variantId);
      const product = await this.prisma.product.findUnique({
        where: { id: variant.productId },
        include: { category: true },
      });
      const discountedPrice =
        await this.discountService.calculateDiscountedPrice(
          variant,
          product,
          product.category
        );
      const unitPrice = variant.price;
      const price = discountedPrice * item.quantity;
      const discount = unitPrice - discountedPrice;
      total += price;

      orderItemsData.push({
        variantId: item.variantId,
        quantity: item.quantity,
        unitPrice,
        price,
        discount,
      });
    }

    let voucherDiscount = 0;
    if (dto.voucherId) {
      const voucher = await this.voucherService.validateVoucher(
        userId,
        dto.voucherId,
        total
      );
      voucherDiscount = this.voucherService.calculateVoucherDiscount(
        voucher,
        total
      );
      total -= voucherDiscount;
    }

    const createdOrder = await this.prisma.order.create({
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
        paymentMethod: 'PAYPAL',
        items: {
          create: orderItemsData,
        },
      },
      include: { items: true },
    });

    const paypalOrder = await this.paypalService.createOrder(total.toFixed(2));
    const approvalUrl = paypalOrder.links.find(
      (link) => link.rel === 'approve'
    )?.href;

    return {
      orderId: createdOrder.id,
      paypalOrderId: paypalOrder.id,
      approvalUrl,
    };
  }

  async confirmPaypalPayment(
    userId: string,
    orderId: string,
    paypalOrderId: string
  ) {
    const capture = await this.paypalService.captureOrder(paypalOrderId);
    if (!capture || capture.status !== 'COMPLETED') {
      throw new BadRequestException('Thanh toán PayPal thất bại');
    }

    const updatedOrder = await this.prisma.$transaction(async (tx) => {
      const order = await tx.order.update({
        where: { id: orderId },
        data: {
          status: 'PROCESSING',
        },
        include: { items: true },
      });

      await this.cartService.clearSelectedItems(userId, tx);
      await this.cartService.resetCartTotal(userId, tx);

      if (order.voucherId) {
        await this.voucherService.applyVoucherUsage(
          userId,
          order.voucherId,
          tx
        );
      }

      await this.paymentService.createPaymentWithTx(tx, {
        orderId: order.id,
        userId,
        amount: order.total,
        method: 'PAYPAL',
        paymentStatus: 'COMPLETED',
        transactionDetails: capture,
      });

      return order;
    });

    const payment = await this.prisma.payment.findFirst({
      where: { orderId },
      include: { transactions: true },
    });
    const transaction = payment.transactions[0];

    await this.invoiceService.createInvoice({
      userId,
      transactionId: transaction.id,
      orderItems: updatedOrder.items,
      totalAmount: updatedOrder.total,
    });

    return updatedOrder;
  }
}
