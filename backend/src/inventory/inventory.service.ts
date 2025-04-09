import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { InventoryCreateDTO } from './dto/inventory-create.dto';
import { InventoryUpdateDTO } from './dto/inventory-update.dto';
import { CheckStockDTO } from './dto/check-stock.dto';
import { WarehouseStatus } from '@prisma/client';

@Injectable()
export class InventoryService {
  constructor(private readonly prisma: PrismaService) {}

  async addProductToWarehouse(inventoryCreateDTO: InventoryCreateDTO) {
    const { variantId, warehouseId, quantity, status } = inventoryCreateDTO;

    const existingInventory = await this.prisma.inventory.findUnique({
      where: { variantId_warehouseId: { variantId, warehouseId } },
    });

    if (existingInventory) {
      return await this.prisma.inventory.update({
        where: { id: existingInventory.id },
        data: {
          quantity: existingInventory.quantity + quantity,
          status,
        },
      });
    } else {
      return await this.prisma.inventory.create({
        data: {
          variantId,
          warehouseId,
          quantity,
          reserved: 0,
          status,
        },
      });
    }
  }

  async updateInventoryQuantity(inventoryUpdateDTO: InventoryUpdateDTO) {
    const { variantId, warehouseId, quantityChange } = inventoryUpdateDTO;

    const inventory = await this.prisma.inventory.findUnique({
      where: { variantId_warehouseId: { variantId, warehouseId } },
    });

    if (!inventory) {
      throw new NotFoundException('Sản phẩm không tồn tại trong kho');
    }

    return await this.prisma.inventory.update({
      where: { id: inventory.id },
      data: {
        quantity: inventory.quantity + quantityChange,
      },
    });
  }

  async checkStockAvailability(checkStockDto: CheckStockDTO) {
    const { variantId, warehouseId, requiredQuantity } = checkStockDto;

    const inventory = await this.prisma.inventory.findUnique({
      where: { variantId_warehouseId: { variantId, warehouseId } },
    });

    if (!inventory || inventory.quantity < requiredQuantity) {
      return false;
    }

    return true;
  }

  async updateWarehouseStatus(warehouseId: string, status: WarehouseStatus) {
    return await this.prisma.warehouse.update({
      where: { id: warehouseId },
      data: { status },
    });
  }

  async getInventoryByVariant(variantId: string) {
    return await this.prisma.inventory.findMany({
      where: { variantId },
      include: {
        warehouse: true,
      },
    });
  }
}
