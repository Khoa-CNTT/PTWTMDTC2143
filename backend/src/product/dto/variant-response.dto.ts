import { VariantStatus, WeightUnit } from '@prisma/client';
import { ImageResponseDTO } from './image-response.dto';

export class VariantResponseDTO {
  id: string;
  sku: string;
  price: number;
  compareAtPrice: number;
  weight: number;
  weightUnit: WeightUnit;
  dimensions: string;
  description: string;
  status: VariantStatus;
  attributes: {
    attribute: string;
    value: string;
  }[];
  images: ImageResponseDTO[];
}
