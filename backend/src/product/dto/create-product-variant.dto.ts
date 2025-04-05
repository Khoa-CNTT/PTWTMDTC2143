import {
  ProductVariantOptionValue,
  ProductVariantStatus,
  WeightUnit,
} from '@prisma/client';

export class CreateProductVariantDto {
  price: number;
  compareAtPrice: number;
  weight: number;
  weightUnit: WeightUnit;
  description: string;
  status: ProductVariantStatus;
  optionValues: ProductVariantOptionValue[];
}
