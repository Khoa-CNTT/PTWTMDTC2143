import { Injectable, NotFoundException } from '@nestjs/common';
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
}
