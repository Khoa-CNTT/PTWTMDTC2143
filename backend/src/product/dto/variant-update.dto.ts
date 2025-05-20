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
import { VariantStatus, WeightUnit } from '@prisma/client';

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
  @IsOptional()
  @IsPositive()
  compareAtPrice?: number;

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
  @ValidateNested({ each: true })
  @Type(() => VariantOptionValueDTO)
  @IsOptional()
  optionValues?: VariantOptionValueDTO[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => VariantImageUpdateDTO)
  oldImages?: VariantImageUpdateDTO[];

  @IsArray()
  @IsOptional()
  newImages?: Express.Multer.File[];

  @IsArray()
  @IsOptional()
  @IsUUID('4', { each: true })
  replaceIds?: string[];
}

export class VariantOptionValueDTO {
  @IsString()
  optionValueId: string;
}
