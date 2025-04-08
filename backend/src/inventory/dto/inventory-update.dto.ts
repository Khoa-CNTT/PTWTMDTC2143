import { IsString, IsInt, Min } from 'class-validator';

export class InventoryUpdateDTO {
  @IsString()
  variantId: string;

  @IsString()
  warehouseId: string;

  @IsInt()
  @Min(0)
  quantityChange: number;
}
