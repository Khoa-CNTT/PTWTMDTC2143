import {
  IsNumber,
  IsPositive,
  IsEnum,
  IsString,
  IsOptional,
  IsArray,
  ValidateNested,
  ArrayNotEmpty,
} from 'class-validator';
import { Type } from 'class-transformer';
import { VariantOptionValue, VariantStatus, WeightUnit } from '@prisma/client';

export class VariantCreateDTO {
  @IsNumber()
  @IsPositive()
  price: number;

  @IsNumber()
  @IsPositive()
  compareAtPrice: number;

  @IsNumber()
  @IsPositive()
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
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => Object)
  optionValues: VariantOptionValue[];

  @IsOptional()
  @IsArray()
  images?: Express.Multer.File[];
}
