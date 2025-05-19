import { Module } from '@nestjs/common';
import { VnpayController } from './vnpay.controller';
import { VnpayService } from './vnpay.service';
import { ConfigModule } from '@nestjs/config'; // Import ConfigModule if you plan to use .env variables for config

@Module({
  imports: [
    ConfigModule, // Add ConfigModule here if you use it for vnpayConfig
  ],
  controllers: [VnpayController],
  providers: [VnpayService],
})
export class VnpayModule {}
