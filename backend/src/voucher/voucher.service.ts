import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { VoucherCreateDTO } from './dto/voucher-create.dto';
import { VoucherResponseDTO } from './dto/voucher-response.dto';
import { VoucherMapper } from './voucher.mapper';
import { VoucherUpdateDTO } from './dto/voucher-update.dto';

@Injectable()
export class VoucherService {
  constructor(private prisma: PrismaService) {}

  async create(
    voucherCreateDTO: VoucherCreateDTO
  ): Promise<VoucherResponseDTO> {
    const voucher = await this.prisma.voucher.create({
      data: voucherCreateDTO,
    });
    return VoucherMapper.toDTO(voucher);
  }

  async update(
    id: string,
    voucherUpdateDTO: VoucherUpdateDTO
  ): Promise<VoucherResponseDTO> {
    const voucher = await this.prisma.voucher.update({
      where: { id },
      data: voucherUpdateDTO,
    });
    return VoucherMapper.toDTO(voucher);
  }
  async findAll(
    limit: number,
    cursor?: string
  ): Promise<{ data: VoucherResponseDTO[]; nextCursor: string | null }> {
    const vouchers = await this.prisma.voucher.findMany({
      take: limit + 1,
      ...(cursor && {
        skip: 1,
        cursor: { id: cursor },
      }),
      orderBy: { id: 'asc' },
    });

    let nextCursor: string | null = null;
    if (vouchers.length > limit) {
      const nextVoucher = vouchers.pop();
      nextCursor = nextVoucher?.id || null;
    }

    const formatted = vouchers.map((voucher) => VoucherMapper.toDTO(voucher));

    return { data: formatted, nextCursor };
  }

  async findOne(id: string): Promise<VoucherResponseDTO> {
    const voucher = await this.prisma.voucher.findUnique({ where: { id } });
    if (!voucher) throw new NotFoundException('Voucher not found');
    return VoucherMapper.toDTO(voucher);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.voucher.delete({ where: { id } });
  }

  async toggleStatus(id: string): Promise<VoucherResponseDTO> {
    const voucher = await this.prisma.voucher.findUnique({ where: { id } });
    if (!voucher) throw new NotFoundException('Voucher not found');

    const updated = await this.prisma.voucher.update({
      where: { id },
      data: {
        status: voucher.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE',
      },
    });

    return VoucherMapper.toDTO(updated);
  }

  async validateVoucher(userId: string, voucherId: string, total: number) {
    const voucher = await this.prisma.voucher.findUnique({
      where: { id: voucherId },
    });
    if (!voucher || voucher.status !== 'ACTIVE') {
      throw new NotFoundException('Voucher không hợp lệ hoặc không hoạt động');
    }

    const now = new Date();
    if (voucher.startDate > now || voucher.endDate < now) {
      throw new BadRequestException(
        'Voucher không trong khoảng thời gian hợp lệ'
      );
    }

    if (voucher.minPrice && total < voucher.minPrice) {
      throw new BadRequestException(
        `Tổng đơn hàng phải ít nhất là ${voucher.minPrice}`
      );
    }

    if (voucher.usageLimit > 0 && voucher.usedCount >= voucher.usageLimit) {
      throw new BadRequestException('Voucher đã vượt quá giới hạn sử dụng');
    }

    const hasUsed = await this.prisma.voucherUsage.findFirst({
      where: { userId, voucherId },
    });

    if (hasUsed) {
      throw new BadRequestException('Bạn đã sử dụng voucher này trước đó');
    }

    return voucher;
  }

  calculateVoucherDiscount(voucher, total: number): number {
    let discountAmount = 0;
    if (voucher.type === 'PERCENTAGE') {
      discountAmount = (total * voucher.discountValue) / 100;
      if (voucher.maxDiscount && discountAmount > voucher.maxDiscount) {
        discountAmount = voucher.maxDiscount;
      }
    } else if (voucher.type === 'FIXED_AMOUNT') {
      discountAmount = voucher.discountValue;
    }
    return discountAmount > total ? total : discountAmount;
  }

  async applyVoucherUsage(userId: string, voucherId: string, tx) {
    await tx.voucher.update({
      where: { id: voucherId },
      data: {
        usedCount: { increment: 1 },
      },
    });

    await tx.voucherUsage.create({
      data: { userId, voucherId },
    });
  }
}
