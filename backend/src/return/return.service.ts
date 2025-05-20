import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // prisma service
import { CreateReturnDTO } from './dto/create-return.dto';
import { OrderStatus, ReturnStatus } from '@prisma/client';

@Injectable()
export class ReturnService {
  constructor(private readonly prisma: PrismaService) {}

  async createReturn(userId: string, orderId: string, dto: CreateReturnDTO) {
    // 1. Lấy order kèm các item, trả hàng trước đó
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
      include: {
        items: {
          include: { returnItems: true }, // lấy luôn trả hàng từng item
        },
      },
    });

    if (!order) throw new NotFoundException('Order not found');
    if (order.userId !== userId)
      throw new ForbiddenException('You cannot return this order');

    if (order.status !== OrderStatus.DELIVERED)
      throw new BadRequestException('Order chưa hoàn thành, không thể trả');

    // 2. Kiểm tra quantity trả không vượt quá số lượng đã mua trừ đi số lượng đã trả trước đó
    for (const returnItem of dto.items) {
      const orderItem = order.items.find(
        (i) => i.id === returnItem.orderItemId
      );
      if (!orderItem)
        throw new BadRequestException(
          `Order item ${returnItem.orderItemId} không tồn tại trong đơn`
        );

      // Tính tổng số lượng đã trả trước đó cho item này
      const totalReturnedQty = orderItem.returnItems.reduce(
        (sum, ri) => sum + ri.quantity,
        0
      );

      if (returnItem.quantity <= 0)
        throw new BadRequestException('Số lượng trả phải lớn hơn 0');

      if (returnItem.quantity > orderItem.quantity - totalReturnedQty) {
        throw new BadRequestException(
          `Số lượng trả cho item ${returnItem.orderItemId} vượt quá số lượng mua còn lại`
        );
      }
    }

    // 3. Tạo record Return và ReturnItem liên quan
    const createdReturn = await this.prisma.return.create({
      data: {
        orderId,
        userId,
        status: 'PENDING',
        reason: dto.reason,
        items: {
          create: dto.items.map((item) => ({
            orderItemId: item.orderItemId,
            quantity: item.quantity,
          })),
        },
      },
      include: {
        items: true,
      },
    });

    return createdReturn;
  }

  // Lấy danh sách trả hàng của user
  async getReturnsByUser(userId: string) {
    return this.prisma.return.findMany({
      where: { userId },
      include: {
        items: {
          include: {
            orderItem: true,
          },
        },
        order: true,
      },
    });
  }

  async getReturnById(userId: string, returnId: string) {
    const returnRecord = await this.prisma.return.findUnique({
      where: { id: returnId },
      include: {
        items: { include: { orderItem: true } },
        order: true,
      },
    });

    if (!returnRecord) throw new NotFoundException('Return not found');
    if (returnRecord.userId !== userId)
      throw new ForbiddenException('Bạn không có quyền truy cập');

    return returnRecord;
  }

  async updateReturnStatus(returnId: string, status: ReturnStatus) {
    if (!Object.values(ReturnStatus).includes(status)) {
      throw new BadRequestException('Trạng thái trả hàng không hợp lệ');
    }

    const existingReturn = await this.prisma.return.findUnique({
      where: { id: returnId },
    });

    if (!existingReturn) {
      throw new BadRequestException('Không tìm thấy bản ghi trả hàng');
    }

    const updatedReturn = await this.prisma.return.update({
      where: { id: returnId },
      data: { status },
      include: { items: true, order: true },
    });

    if (status === ReturnStatus.APPROVED) {
      await this.prisma.order.update({
        where: { id: updatedReturn.orderId },
        data: { status: 'RETURNED' }, // nhớ thay theo enum order của bạn
      });
    }

    return updatedReturn;
  }
}
