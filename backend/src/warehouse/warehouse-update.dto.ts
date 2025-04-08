import { WarehouseStatus } from '@prisma/client';

export class WarehouseUpdateDTO {
  name?: string;
  location?: string;
  status?: WarehouseStatus;
}
