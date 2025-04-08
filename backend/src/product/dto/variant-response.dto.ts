import { VariantStatus, WeightUnit } from '@prisma/client';
import { OptionValueResponseDTO } from './option-value-response.dto';

export class VariantResponseDTO {
  id: string;
  sku: string;
  price: number;
  compareAtPrice: number;
  weight: number;
  weightUnit: WeightUnit;
  description: string;
  status: VariantStatus;
  optionValues: OptionValueResponseDTO[];
}
