import { Injectable } from '@nestjs/common';
import { PaymentMethod, PaymentStatus, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PaymentService {
  constructor(private prisma: PrismaService) {}

  async createPayment(input: {
    orderId: string;
    userId: string;
    amount: number;
    method: PaymentMethod;
    paymentStatus: PaymentStatus;
  }) {
    const transactionCode = this.generateTransactionCode();

    const payment = await this.prisma.payment.create({
      data: {
        orderId: input.orderId,
        userId: input.userId,
        totalAmount: input.amount,
        method: input.method,
        status: 'UNPAID',
        refundStatus: 'NONE',
        transactions: {
          create: {
            userId: input.userId,
            amount: input.amount,
            type: 'PAYMENT',
            status: 'PENDING',
            transactionCode,
          },
        },
      },
      include: { transactions: true },
    });

    return payment;
  }
  async createPaymentWithTx(
    tx: Prisma.TransactionClient,
    input: {
      orderId: string;
      userId: string;
      amount: number;
      method: PaymentMethod;
      paymentStatus: 'PENDING' | 'COMPLETED';
      transactionDetails?: unknown;
    }
  ) {
    const transactionCode = this.generateTransactionCode();

    const payment = await tx.payment.create({
      data: {
        orderId: input.orderId,
        userId: input.userId,
        totalAmount: input.amount,
        method: input.method,
        status: input.paymentStatus,
        refundStatus: 'NONE',
        transactions: {
          create: {
            userId: input.userId,
            amount: input.amount,
            type: 'PAYMENT',
            status: input.paymentStatus,
            transactionCode,
            metadata: input.transactionDetails
              ? JSON.stringify(input.transactionDetails)
              : undefined,
          },
        },
      },
      include: { transactions: true },
    });

    return payment;
  }

  private generateTransactionCode() {
    return `TRX-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  }
}
