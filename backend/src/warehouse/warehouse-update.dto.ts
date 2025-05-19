import { IsOptional, IsString, IsEnum } from 'class-validator';
import { WarehouseStatus } from '@prisma/client';

export class WarehouseUpdateDTO {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsEnum(WarehouseStatus)
  status?: WarehouseStatus;
}
