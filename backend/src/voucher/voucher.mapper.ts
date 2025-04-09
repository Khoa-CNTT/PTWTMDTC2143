import { Voucher } from '@prisma/client';
import { VoucherResponseDTO } from './dto/voucher-response.dto';

export class VoucherMapper {
  static toDTO(voucher: Voucher): VoucherResponseDTO {
    return {
      id: voucher.id,
      code: voucher.code,
      discountValue: Number(voucher.discountValue),
      maxDiscount: Number(voucher.maxDiscount),
      type: voucher.type,
      startDate: voucher.startDate.toISOString(),
      endDate: voucher.endDate.toISOString(),
      status: voucher.status,
      usageLimit: voucher.usageLimit,
      usedCount: voucher.usedCount,
      minPrice: voucher.minPrice,
      isPublic: Boolean(voucher.isPublic),
    };
  }
}
