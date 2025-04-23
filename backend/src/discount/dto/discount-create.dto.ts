import { ApplyType, DiscountStatus, DiscountType } from '@prisma/client';
import {
  IsDateString,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
} from 'class-validator';

export class DiscountCreateDTO {
  @IsInt()
  discount: number;

  @IsEnum(DiscountType)
  type: DiscountType;

  @IsDateString()
  startDate: string;

  @IsDateString()
  endDate: string;

  @IsEnum(DiscountStatus)
  status: DiscountStatus;

  @IsEnum(ApplyType)
  applyType: ApplyType;

  @IsOptional()
  @IsString({ each: true })
  categories?: string[];

  @IsOptional()
  @IsString({ each: true })
  products?: string[];
}
