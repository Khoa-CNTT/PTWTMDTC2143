import {
  IsNumber,
  // IsPositive,
  IsEnum,
  IsString,
  IsOptional,
  IsArray,
  ValidateNested,
  // ArrayNotEmpty,
  IsBoolean,
} from 'class-validator';
import { Type } from 'class-transformer';
import { VariantStatus, WeightUnit } from '@prisma/client';

export class VariantImageCreateDTO {
  @IsString()
  imageUrl: string;

  @IsBoolean()
  @IsOptional()
  isThumbnail?: boolean;
}

export class VariantCreateDTO {
  @IsString()
  sku: string;

  @IsNumber()
  price: number;

  @IsNumber()
  @IsOptional()
  compareAtPrice?: number;

  @IsNumber()
  weight: number;

  @IsEnum(WeightUnit)
  weightUnit: WeightUnit;

  @IsString()
  dimensions: string;

  @IsString()
  description: string;

  @IsEnum(VariantStatus)
  status: VariantStatus;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => VariantOptionValueDTO)
  optionValues: VariantOptionValueDTO[];

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => VariantImageCreateDTO)
  images?: VariantImageCreateDTO[];
}

export class VariantOptionValueDTO {
  @IsString()
  optionValueId: string;
}
