import {
  ProductVariantOptionValue,
  ProductVariantStatus,
  WeightUnit,
} from '@prisma/client';

export interface ProductVariant {
  id: string;
  sku: string;
  price: number;
  compareAtPrice: number;
  weight: number;
  weightUnit: WeightUnit;
  description: string;
  status: ProductVariantStatus;
  optionValues: ProductVariantOptionValue[];
}
