import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { InventoryCreateDTO } from './dto/inventory-create.dto';
import { InventoryUpdateDTO } from './dto/inventory-update.dto';
import { CheckStockDTO } from './dto/check-stock.dto';
import { WarehouseStatus } from '@prisma/client';
import { InventoryRedisService } from './inventory-redis.service';
import { RedisLockService } from 'src/common/redis-lock.service';

@Injectable()
export class InventoryService {
  constructor(
    private readonly prisma: PrismaService,
    private inventoryRedisService: InventoryRedisService,
    private redisLockService: RedisLockService
  ) {}

  async getAllInventory() {
    return await this.prisma.inventory.findMany({
      include: {
        warehouse: true,
      },
    });
  }

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

  async checkAvailableStock(
    variantId: string,
    requestedQuantity: number
  ): Promise<boolean> {
    // Lấy toàn bộ inventory của variant
    const inventories = await this.prisma.inventory.findMany({
      where: { variantId },
      select: {
        quantity: true,
        reserved: true,
      },
    });

    if (!inventories.length) {
      throw new BadRequestException(
        `Không tìm thấy tồn kho cho Variant ${variantId}`
      );
    }

    // Tính tổng số lượng khả dụng từ tất cả kho
    const available = inventories.reduce(
      (total, inv) => total + (inv.quantity - inv.reserved),
      0
    );

    return available >= requestedQuantity;
  }

  // reserveStock: Cần sửa lại logic kiểm tra và cập nhật reserved cho tất cả kho của variant
  async reserveStock(variantId: string, quantity: number) {
    const lockAcquired = await this.redisLockService.acquireLock(
      `inventory:${variantId}`,
      5000
    );
    if (!lockAcquired)
      throw new ConflictException(
        'Có người khác đang đặt hàng. Vui lòng thử lại.'
      );

    try {
      // Lấy tổng lượng còn khả dụng trên tất cả kho
      const inventories = await this.prisma.inventory.findMany({
        where: { variantId },
      });
      const totalAvailable = inventories.reduce(
        (acc, inv) => acc + (inv.quantity - inv.reserved),
        0
      );
      if (totalAvailable < quantity) {
        throw new BadRequestException('Không đủ hàng trong kho');
      }

      // Ví dụ bạn có thể ưu tiên giảm trên kho đầu tiên còn đủ tồn
      let remaining = quantity;
      for (const inv of inventories) {
        const available = inv.quantity - inv.reserved;
        if (available <= 0) continue;

        const reserveAmount = Math.min(available, remaining);
        await this.prisma.inventory.update({
          where: { id: inv.id },
          data: { reserved: { increment: reserveAmount } },
        });
        remaining -= reserveAmount;
        if (remaining <= 0) break;
      }
    } finally {
      await this.redisLockService.releaseLock(`inventory:${variantId}`);
    }
  }

  // Giải phóng reserved stock (khi hủy hoặc hoàn thành đặt hàng)
  async releaseReserveStock(
    variantId: string,
    quantity: number
  ): Promise<void> {
    await this.inventoryRedisService.releaseReserve(variantId, quantity);
  }
}
