import { Injectable, Logger, Inject } from '@nestjs/common';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';

@Injectable()
export class RedisLockService {
  private readonly logger = new Logger(RedisLockService.name);

  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  private getLockKey(key: string) {
    return `lock:${key}`;
  }

  // Thử lấy lock, timeout là ms lock tồn tại
  async acquireLock(key: string, ttl = 10000): Promise<boolean> {
    const lockKey = this.getLockKey(key);
    const existing = await this.cacheManager.get(lockKey);
    if (existing) {
      // Lock already exists
      return false;
    }
    await this.cacheManager.set(lockKey, 'locked', ttl / 1000);
    return true; // Lock acquired
  }

  async releaseLock(key: string): Promise<void> {
    const lockKey = this.getLockKey(key);
    await this.cacheManager.del(lockKey);
  }
}
