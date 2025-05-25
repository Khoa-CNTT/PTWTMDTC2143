import { IsString, IsInt, Min, IsOptional, IsEnum } from 'class-validator';
import { InventoryStatus } from '@prisma/client';

export class InventoryUpdateDTO {
  @IsString()
  variantId: string;

  @IsString()
  warehouseId: string;

  @IsInt()
  @Min(0)
  quantity: number;

  @IsInt()
  @Min(0)
  reserved: number;

  @IsOptional()
  @IsEnum(InventoryStatus)
  status?: InventoryStatus;
}
