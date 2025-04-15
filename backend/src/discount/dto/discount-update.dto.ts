import { ApplyType, DiscountStatus, DiscountType } from '@prisma/client';
import {
  IsDateString,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
} from 'class-validator';

export class DiscountUpdateDTO {
  @IsInt()
  @IsOptional()
  discount?: number;

  @IsEnum(DiscountType)
  @IsOptional()
  type?: DiscountType;

  @IsDateString()
  @IsOptional()
  startDate?: string;

  @IsDateString()
  @IsOptional()
  endDate?: string;

  @IsEnum(DiscountStatus)
  @IsOptional()
  status?: DiscountStatus;

  @IsEnum(ApplyType)
  @IsOptional()
  applyType?: ApplyType;

  @IsOptional()
  @IsString({ each: true })
  categories?: string[];

  @IsOptional()
  @IsString({ each: true })
  products?: string[];
}
