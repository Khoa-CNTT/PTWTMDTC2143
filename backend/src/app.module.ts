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
import { OpenaiModule } from './openai/openai.module';
import { ImageService } from './image/image.service';
import { ImageModule } from './image/image.module';
import jwtConfig from './auth/config/jwt.config';
import { VnpayModule } from './vnpay/vnpay.module';

@Module({
  imports: [
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
    OpenaiModule,
    ImageModule,
    VnpayModule,
  ],
  controllers: [AppController],
  providers: [AppService, ImageService],
})
export class AppModule {}
