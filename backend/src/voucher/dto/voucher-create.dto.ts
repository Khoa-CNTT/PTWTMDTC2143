import {
  IsDateString,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { VoucherType, VoucherStatus } from '@prisma/client';

export class VoucherCreateDTO {
  @IsString()
  code: string;

  @IsEnum(VoucherType)
  type: VoucherType;

  @IsInt()
  @Min(0)
  discountValue: number;

  @IsOptional()
  @IsInt()
  maxDiscount?: number;

  @IsDateString()
  startDate: string;

  @IsDateString()
  endDate: string;

  @IsEnum(VoucherStatus)
  status: VoucherStatus;

  @IsOptional()
  @IsInt()
  minPrice?: number;

  @IsInt()
  @Min(1)
  usageLimit: number;

  @IsOptional()
  isPublic?: boolean;
}
