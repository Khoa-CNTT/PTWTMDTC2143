import { VariantOptionValue, VariantStatus, WeightUnit } from '@prisma/client';

export class VariantUpdateDTO {
  price: number;
  compareAtPrice: number;
  weight: number;
  weightUnit: WeightUnit;
  dimensions: string;
  description: string;
  status: VariantStatus;
  optionValues?: VariantOptionValue[];
}
