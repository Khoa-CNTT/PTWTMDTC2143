import { VariantOptionValue, VariantStatus, WeightUnit } from '@prisma/client';

export class VariantImageUpdateDTO {
  id: string; // ID ảnh cũ cần thay thế
  file?: Express.Multer.File; // Ảnh mới (gửi qua form-data)
}

export class VariantUpdateDTO {
  price: number;
  compareAtPrice: number;
  weight: number;
  weightUnit: WeightUnit;
  dimensions: string;
  description: string;
  status: VariantStatus;
  optionValues?: VariantOptionValue[];
  oldImages?: VariantImageUpdateDTO[];
  newImages?: Express.Multer.File[];
  replaceIds?: string[];
}
