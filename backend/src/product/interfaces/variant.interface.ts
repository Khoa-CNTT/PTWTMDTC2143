import { VariantOptionValue, VariantStatus, WeightUnit } from '@prisma/client';

export interface Variant {
  id: string;
  sku: string;
  price: number;
  compareAtPrice: number;
  weight: number;
  weightUnit: WeightUnit;
  description: string;
  status: VariantStatus;
  optionValues: VariantOptionValue[];
}
