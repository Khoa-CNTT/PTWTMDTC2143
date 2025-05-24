import { Module } from '@nestjs/common';
import { FlashSaleService } from './flashsale.service';
import { FlashSaleController } from './flashsale.controller';

@Module({
  controllers: [FlashSaleController],
  providers: [FlashSaleService],
})
export class FlashsaleModule {}
