import { IsString, IsInt, Min } from 'class-validator';

export class CheckStockDTO {
  @IsString()
  variantId: string;

  @IsString()
  warehouseId: string;

  @IsInt()
  @Min(1)
  requiredQuantity: number;
}
