import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateWarehouseDTO } from './create-warehouse.dto';
import { WarehouseResponseDTO } from './warehouse-response.dto';
import { Warehouse, WarehouseStatus } from '@prisma/client';
import { UpdateWarehouseDTO } from './update-warehouse.dto';

@Injectable()
export class WarehouseService {
  constructor(private prisma: PrismaService) {}

  async createWarehouse(
    createWarehouseDTO: CreateWarehouseDTO
  ): Promise<WarehouseResponseDTO> {
    await this.checkWarehouseExists(createWarehouseDTO.name);
    const newWarehouse = await this.prisma.warehouse.create({
      data: createWarehouseDTO,
    });
    return this.toWarehouseResponseDTO(newWarehouse);
  }

  async getAllWarehouses(): Promise<WarehouseResponseDTO[]> {
    const warehouses = await this.prisma.warehouse.findMany();
    return warehouses.map((warehouse) =>
      this.toWarehouseResponseDTO(warehouse)
    );
  }

  async getWarehouseById(id: string): Promise<WarehouseResponseDTO> {
    const warehouse = await this.findWarehouseById(id);
    return this.toWarehouseResponseDTO(warehouse);
  }

  // New method to get warehouse by name
  async getWarehouseByName(name: string): Promise<WarehouseResponseDTO> {
    const warehouse = await this.findWarehouseByName(name);
    return this.toWarehouseResponseDTO(warehouse);
  }

  async updateWarehouse(
    id: string,
    updateWarehouseDTO: UpdateWarehouseDTO
  ): Promise<WarehouseResponseDTO> {
    const warehouse = await this.findWarehouseById(id);
    const updatedWarehouse = await this.prisma.warehouse.update({
      where: { id },
      data: { ...warehouse, ...updateWarehouseDTO },
    });
    return this.toWarehouseResponseDTO(updatedWarehouse);
  }

  async deleteWarehouse(id: string): Promise<void> {
    await this.findWarehouseById(id);
    await this.prisma.warehouse.delete({ where: { id } });
  }

  async updateWarehouseStatus(
    id: string,
    status: WarehouseStatus
  ): Promise<WarehouseResponseDTO> {
    await this.findWarehouseById(id);

    const updatedWarehouse = await this.prisma.warehouse.update({
      where: { id },
      data: { status },
    });

    return this.toWarehouseResponseDTO(updatedWarehouse);
  }

  private async findWarehouseById(id: string): Promise<Warehouse> {
    const warehouse = await this.prisma.warehouse.findUnique({
      where: { id },
    });
    if (!warehouse) {
      throw new NotFoundException(`Warehouse with ID ${id} not found`);
    }
    return warehouse;
  }

  private async findWarehouseByName(name: string): Promise<Warehouse> {
    const warehouse = await this.prisma.warehouse.findUnique({
      where: { name },
    });
    if (!warehouse) {
      throw new NotFoundException(`Warehouse with name ${name} not found`);
    }
    return warehouse;
  }

  private async checkWarehouseExists(name: string): Promise<void> {
    const existingWarehouse = await this.prisma.warehouse.findUnique({
      where: { name },
    });
    if (existingWarehouse) {
      throw new ConflictException('Warehouse with this name already exists');
    }
  }

  private toWarehouseResponseDTO(warehouse: Warehouse): WarehouseResponseDTO {
    return {
      id: warehouse.id,
      name: warehouse.name,
      location: warehouse.location,
      status: warehouse.status,
    };
  }
}
