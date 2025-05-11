import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ImageModule } from 'src/image/image.module';

@Module({
  imports: [PrismaModule, ImageModule],
  providers: [CategoryService],
  controllers: [CategoryController],
})
export class CategoryModule {}
