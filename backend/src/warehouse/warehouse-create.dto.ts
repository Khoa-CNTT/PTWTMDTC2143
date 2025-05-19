import { IsString, IsEnum } from 'class-validator';
import { WarehouseStatus } from '@prisma/client';

export class WarehouseCreateDTO {
  @IsString()
  name: string;

  @IsString()
  location: string;

  @IsEnum(WarehouseStatus)
  status: WarehouseStatus;
}
