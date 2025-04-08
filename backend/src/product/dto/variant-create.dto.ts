import { VariantOptionValue, VariantStatus, WeightUnit } from '@prisma/client';

export class VariantCreateDTO {
  price: number;
  compareAtPrice: number;
  weight: number;
  weightUnit: WeightUnit;
  description: string;
  status: VariantStatus;
  optionValues: VariantOptionValue[];
}
