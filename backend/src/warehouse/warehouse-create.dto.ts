import { WarehouseStatus } from '@prisma/client';

export class WarehouseCreateDTO {
  name: string;
  location: string;
  status: WarehouseStatus;
}
