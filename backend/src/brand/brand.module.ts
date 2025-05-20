import { Module } from '@nestjs/common';
import { BrandService } from './brand.service';
import { BrandController } from './brand.controller';
import { ImageModule } from 'src/image/image.module';

@Module({
  imports: [ImageModule],
  providers: [BrandService],
  controllers: [BrandController],
})
export class BrandModule {}
