import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

interface OrderItemInput {
  id: string;
}

@Injectable()
export class InvoiceService {
  constructor(private prisma: PrismaService) {}

  async createInvoice(input: {
    userId: string;
    transactionId: string;
    totalAmount: number;
    orderItems: OrderItemInput[];
  }) {
    const invoice = await this.prisma.invoice.create({
      data: {
        userId: input.userId,
        transactionId: input.transactionId,
        invoiceNumber: this.generateInvoiceNumber(),
        totalAmount: input.totalAmount,
        status: 'PAID',
        items: {
          create: input.orderItems.map((item) => ({
            orderItemId: item.id,
          })),
        },
      },
    });

    return invoice;
  }

  private generateInvoiceNumber(): string {
    return `INV-${Date.now()}`;
  }
}
