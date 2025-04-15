import { ApplyType, DiscountStatus, DiscountType } from '@prisma/client';

export class DiscountResponseDTO {
  id: string;
  discount: number;
  type: DiscountType;
  startDate: string;
  endDate: string;
  status: DiscountStatus;
  applyType: ApplyType;
  categories: string[];
  products: string[];
}
