import { IsString, IsInt, Min, IsEnum } from 'class-validator';
import { InventoryStatus } from '@prisma/client';

export class InventoryCreateDTO {
  @IsString()
  variantId: string;

  @IsString()
  warehouseId: string;

  @IsInt()
  @Min(0)
  quantity: number;

  @IsEnum(InventoryStatus)
  status: InventoryStatus;
}
