import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { EmailModule } from './email/email.module';
import { CategoryModule } from './category/category.module';
import { BrandModule } from './brand/brand.module';
import { WarehouseModule } from './warehouse/warehouse.module';
import { ProductModule } from './product/product.module';
import { InventoryModule } from './inventory/inventory.module';
import { CartModule } from './cart/cart.module';
import { OrderModule } from './order/order.module';
import { VoucherModule } from './voucher/voucher.module';
import { DiscountModule } from './discount/discount.module';
import { ImageService } from './image/image.service';
import { ImageModule } from './image/image.module';
import jwtConfig from './auth/config/jwt.config';
import { VnpayModule } from './vnpay/vnpay.module';
import { WishlistModule } from './wishlist/wishlist.module';
import { ReviewModule } from './review/review.module';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { GlobalRoleGuard } from './auth/guards/global-role.guard';
import { APP_GUARD } from '@nestjs/core';
import { PaypalModule } from './paypal/paypal.module';
import { ReturnModule } from './return/return.module';
import { InvoiceModule } from './invoice/invoice.module';
import { PaymentModule } from './payment/payment.module';
import { CacheModule } from '@nestjs/cache-manager';
import { createKeyv } from '@keyv/redis';
import { Keyv } from 'keyv';
import { CacheableMemory } from 'cacheable';

@Module({
  imports: [
    CacheModule.registerAsync({
      isGlobal: true,
      useFactory: async () => {
        return {
          stores: [
            new Keyv({
              store: new CacheableMemory({ ttl: 60000, lruSize: 5000 }),
            }),
            createKeyv('redis://localhost:6379'),
          ],
        };
      },
    }),

    ConfigModule.forRoot({
      isGlobal: true,
      load: [jwtConfig],
    }),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        transport: {
          host: configService.get<string>('MAIL_HOST'),
          port: configService.get<number>('MAIL_PORT'),
          auth: {
            user: configService.get<string>('MAIL_USER'),
            pass: configService.get<string>('MAIL_PASS'),
          },
        },
        defaults: {
          from: `"No Reply" <${configService.get<string>('MAIL_FROM')}>`,
        },
      }),
    }),
    AuthModule,
    UserModule,
    EmailModule,
    CategoryModule,
    BrandModule,
    WarehouseModule,
    ProductModule,
    InventoryModule,
    CartModule,
    OrderModule,
    VoucherModule,
    DiscountModule,
    ImageModule,
    VnpayModule,
    WishlistModule,
    ReviewModule,
    PaypalModule,
    ReturnModule,
    InvoiceModule,
    PaymentModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    ImageService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard, // đầu tiên phải xác thực
    },
    {
      provide: APP_GUARD,
      useClass: GlobalRoleGuard, // sau đó check role
    },
  ],
  exports: [CacheModule],
})
export class AppModule {}
