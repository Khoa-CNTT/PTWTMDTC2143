import { VoucherStatus, VoucherType } from '@prisma/client';

export class VoucherResponseDTO {
  id: string;
  code: string;
  discountValue: number;
  maxDiscount?: number;
  type: VoucherType;
  startDate: string;
  endDate: string;
  status: VoucherStatus;
  usageLimit: number;
  usedCount: number;
  minPrice?: number;
  isPublic: boolean;
}
