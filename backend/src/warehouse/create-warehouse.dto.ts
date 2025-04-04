import { WarehouseStatus } from '@prisma/client';

export class CreateWarehouseDTO {
  name: string;
  location: string;
  status: WarehouseStatus;
}
