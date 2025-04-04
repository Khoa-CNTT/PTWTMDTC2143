import { WarehouseStatus } from '@prisma/client';

export class UpdateWarehouseDTO {
  name?: string;
  location?: string;
  status?: WarehouseStatus;
}
