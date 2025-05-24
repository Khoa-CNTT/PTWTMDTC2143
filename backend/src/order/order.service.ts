import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CalculatedOrderData, CreateOrderDTO } from './dto/order-create.dto';
import { OrderResponseDTO } from './dto/order-response.dto';
import { OrderMapper } from './order.mapper';
import { UpdateOrderStatusDTO } from './dto/order-update-status.dto';
import { DiscountService } from 'src/discount/discount.service';
import { VoucherService } from 'src/voucher/voucher.service';
import { CartService } from 'src/cart/cart.service';
import { PaypalService } from 'src/paypal/paypal.service';
import { PaymentService } from 'src/payment/payment.service';
import { InvoiceService } from 'src/invoice/invoice.service';
import { InventoryService } from 'src/inventory/inventory.service';

@Injectable()
export class OrderService {
  constructor(
    private prisma: PrismaService,
    private discountService: DiscountService,
    private voucherService: VoucherService,
    private cartService: CartService,
    private paypalService: PaypalService,
    private paymentService: PaymentService,
    private invoiceService: InvoiceService,
    private inventoryService: InventoryService
  ) {}

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

  async preparePaypalOrder(userId: string, dto: CreateOrderDTO) {
    const variantIds = dto.items.map((i) => i.variantId);
    const variants = await this.prisma.variant.findMany({
      where: { id: { in: variantIds } },
    });

    if (variants.length !== dto.items.length) {
      throw new NotFoundException('Một số biến thể không tồn tại');
    }
    for (const item of dto.items) {
      await this.inventoryService.reserveStock(item.variantId, item.quantity);
    }
    let total = 0;
    const orderItemsData = [];

    for (const item of dto.items) {
      const variant = variants.find((v) => v.id === item.variantId);
      const product = await this.prisma.product.findUnique({
        where: { id: variant.productId },
        include: { category: true },
      });
      console.log('product', variant.productId);

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

    const paypalOrder = await this.paypalService.createOrder(total.toFixed(2));
    const approvalUrl = paypalOrder.links.find(
      (l) => l.rel === 'approve'
    )?.href;

    return {
      approvalUrl,
      paypalOrderId: paypalOrder.id,
      calculatedData: {
        dto,
        total,
        voucherDiscount,
        orderItemsData,
      },
    };
  }

  async confirmPaypalAndCreateOrder(
    userId: string,
    paypalOrderId: string,
    calculatedData: CalculatedOrderData
  ) {
    const existing = await this.prisma.order.findFirst({
      where: { paypalOrderId },
    });

    if (existing) return existing;

    const capture = await this.paypalService.captureOrder(paypalOrderId);

    if (!capture || capture.status !== 'COMPLETED') {
      throw new BadRequestException(
        `Thanh toán PayPal thất bại, trạng thái: ${capture?.status}`
      );
    }

    const { dto, total, voucherDiscount, orderItemsData } = calculatedData;

    const orderItemsDataWithPrice = orderItemsData.map((item) => ({
      variantId: item.variantId,
      quantity: item.quantity,
      unitPrice: item.price,
      discount: 0,
      price: item.price * item.quantity,
    }));

    const createdOrder = await this.prisma.$transaction(
      async (tx) => {
        for (const item of orderItemsData) {
          await tx.inventory.updateMany({
            where: { variantId: item.variantId },
            data: {
              quantity: {
                decrement: item.quantity,
              },
              reserved: {
                decrement: item.quantity,
              },
            },
          });

          await this.inventoryService.releaseReserveStock(
            item.variantId,
            item.quantity
          );
        }
        const order = await tx.order.create({
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
            status: 'PROCESSING',
            total,
            voucherId: dto.voucherId,
            voucherDiscount,
            paymentMethod: 'PAYPAL',
            paypalOrderId,
            items: {
              create: orderItemsDataWithPrice,
            },
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
          transactionDetails: JSON.stringify(capture),
        });

        return order;
      },
      { timeout: 10000 }
    );

    const payment = await this.prisma.payment.findFirst({
      where: { orderId: createdOrder.id },
      include: { transactions: true },
    });
    const transaction = payment.transactions[0];

    await this.invoiceService.createInvoice({
      userId,
      transactionId: transaction.id,
      orderItems: createdOrder.items,
      totalAmount: createdOrder.total,
    });

    return createdOrder;
  }
}
