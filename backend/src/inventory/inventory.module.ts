import { Module } from '@nestjs/common';
import { InventoryController } from './inventory.controller';
import { InventoryService } from './inventory.service';
import { InventoryRedisService } from './inventory-redis.service';
import { RedisLockModule } from 'src/common/redis-lock.module';

@Module({
  imports: [RedisLockModule],
  controllers: [InventoryController],
  providers: [InventoryService, InventoryRedisService],
  exports: [InventoryService],
})
export class InventoryModule {}
