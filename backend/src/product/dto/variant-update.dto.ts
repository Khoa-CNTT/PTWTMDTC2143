import {
  IsNumber,
  IsPositive,
  IsEnum,
  IsString,
  IsOptional,
  IsArray,
  ValidateNested,
  IsUUID,
} from 'class-validator';
import { Type } from 'class-transformer';
import { VariantOptionValue, VariantStatus, WeightUnit } from '@prisma/client';

export class VariantImageUpdateDTO {
  @IsUUID()
  id: string;

  @IsOptional()
  file?: Express.Multer.File;
}

export class VariantUpdateDTO {
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

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Object)
  optionValues?: VariantOptionValue[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => VariantImageUpdateDTO)
  oldImages?: VariantImageUpdateDTO[];

  @IsOptional()
  @IsArray()
  newImages?: Express.Multer.File[];

  @IsOptional()
  @IsArray()
  @IsUUID('4', { each: true })
  replaceIds?: string[];
}
