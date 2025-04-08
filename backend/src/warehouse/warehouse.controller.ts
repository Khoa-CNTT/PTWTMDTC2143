import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { WarehouseService } from './warehouse.service';
import { WarehouseResponseDTO } from './warehouse-response.dto';
import { WarehouseStatus } from '@prisma/client';
import { WarehouseCreateDTO } from './warehouse-create.dto';
import { WarehouseUpdateDTO } from './warehouse-update.dto';

@Controller('warehouses')
export class WarehouseController {
  constructor(private readonly warehouseService: WarehouseService) {}

  @Post()
  async createWarehouse(
    @Body() warehouseCreateDTO: WarehouseCreateDTO
  ): Promise<WarehouseResponseDTO> {
    return this.warehouseService.createWarehouse(warehouseCreateDTO);
  }

  @Get()
  async getAllWarehouses(): Promise<WarehouseResponseDTO[]> {
    return this.warehouseService.getAllWarehouses();
  }

  @Get(':id')
  async getWarehouseById(
    @Param('id') id: string
  ): Promise<WarehouseResponseDTO> {
    return this.warehouseService.getWarehouseById(id);
  }

  @Get('name/:name')
  async getWarehouseByName(
    @Param('name') name: string
  ): Promise<WarehouseResponseDTO> {
    return this.warehouseService.getWarehouseByName(name);
  }

  @Put(':id')
  async updateWarehouse(
    @Param('id') id: string,
    @Body() warehouseUpdateDTO: WarehouseUpdateDTO
  ): Promise<WarehouseResponseDTO> {
    return this.warehouseService.updateWarehouse(id, warehouseUpdateDTO);
  }

  @Put(':id/status')
  async updateWarehouseStatus(
    @Param('id') id: string,
    @Body('status') status: WarehouseStatus
  ): Promise<WarehouseResponseDTO> {
    return this.warehouseService.updateWarehouseStatus(id, status);
  }

  @Delete(':id')
  async deleteWarehouse(@Param('id') id: string): Promise<{ message: string }> {
    await this.warehouseService.deleteWarehouse(id);
    return { message: 'Warehouse deleted successfully' };
  }
}
