import { Module } from '@nestjs/common';
import { VoucherService } from './voucher.service';
import { VoucherController } from './voucher.controller';

@Module({
  providers: [VoucherService],
  controllers: [VoucherController],
  exports: [VoucherService],
})
export class VoucherModule {}
