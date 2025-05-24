import { Injectable, Logger, Inject } from '@nestjs/common';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';

@Injectable()
export class InventoryRedisService {
  private readonly logger = new Logger(InventoryRedisService.name);

  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  private getReserveKey(variantId: string): string {
    return `variant:${variantId}:reserved`;
  }

  // Lấy số lượng đã reserve hiện tại
  async getReservedQuantity(variantId: string): Promise<number> {
    const key = this.getReserveKey(variantId);
    const reserved = await this.cacheManager.get<number>(key);
    return reserved || 0;
  }

  // Tăng reserved (giữ hàng) trong Redis, ttl: 15 phút (mặc định)
  async reserveStock(
    variantId: string,
    quantity: number,
    ttlSeconds = 900
  ): Promise<void> {
    const key = this.getReserveKey(variantId);
    const currentReserved = (await this.getReservedQuantity(variantId)) || 0;
    const newReserved = currentReserved + quantity;
    await this.cacheManager.set(key, newReserved, ttlSeconds);
    this.logger.log(
      `Reserved ${quantity} units for variant ${variantId}, total reserved: ${newReserved}`
    );
  }

  // Giảm reserved khi đơn hàng thành công hoặc hết hạn
  async releaseReserve(variantId: string, quantity: number): Promise<void> {
    const key = this.getReserveKey(variantId);
    const currentReserved = (await this.getReservedQuantity(variantId)) || 0;
    const newReserved = Math.max(0, currentReserved - quantity);
    await this.cacheManager.set(key, newReserved, 900);
    this.logger.log(
      `Released ${quantity} units for variant ${variantId}, total reserved now: ${newReserved}`
    );
  }
}
