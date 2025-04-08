import { InventoryStatus } from '@prisma/client';

export class InventoryDTO {
  variantId: string;
  warehouseId: string;
  quantity: number;
  reserved: number;
  status?: InventoryStatus;
}
