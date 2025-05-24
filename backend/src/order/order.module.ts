import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { CartModule } from 'src/cart/cart.module';
import { DiscountModule } from 'src/discount/discount.module';
import { VoucherModule } from 'src/voucher/voucher.module';
import { PaypalModule } from 'src/paypal/paypal.module';
import { PaymentModule } from 'src/payment/payment.module';
import { InvoiceModule } from 'src/invoice/invoice.module';
import { InventoryModule } from 'src/inventory/inventory.module';

@Module({
  imports: [
    CartModule,
    DiscountModule,
    VoucherModule,
    PaypalModule,
    PaymentModule,
    InvoiceModule,
    InventoryModule,
  ],
  providers: [OrderService],
  controllers: [OrderController],
})
export class OrderModule {}
