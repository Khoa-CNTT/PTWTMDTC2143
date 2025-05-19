import { IsUUID, IsInt, Min, IsOptional, IsEnum } from 'class-validator';
import { InventoryStatus } from '@prisma/client';

export class InventoryDTO {
  @IsUUID('4', { message: 'variantId phải là UUID hợp lệ' })
  variantId: string;

  @IsUUID('4', { message: 'warehouseId phải là UUID hợp lệ' })
  warehouseId: string;

  @IsInt({ message: 'quantity phải là số nguyên' })
  @Min(0, { message: 'quantity phải lớn hơn hoặc bằng 0' })
  quantity: number;

  @IsInt({ message: 'reserved phải là số nguyên' })
  @Min(0, { message: 'reserved phải lớn hơn hoặc bằng 0' })
  reserved: number;

  @IsOptional()
  @IsEnum(InventoryStatus, { message: 'status không hợp lệ' })
  status?: InventoryStatus;
}
