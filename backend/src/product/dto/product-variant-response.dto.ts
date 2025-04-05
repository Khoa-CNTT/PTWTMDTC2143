import { ProductVariantStatus, WeightUnit } from '@prisma/client';
import { OptionValueResponseDTO } from './option-value-response.dto';

export class ProductVariantResponseDTO {
  id: string;
  sku: string;
  price: number;
  compareAtPrice: number;
  weight: number;
  weightUnit: WeightUnit;
  description: string;
  status: ProductVariantStatus;
  optionValues: OptionValueResponseDTO[];
}
