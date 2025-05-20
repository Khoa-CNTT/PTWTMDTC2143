import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { ImageModule } from 'src/image/image.module';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule, ImageModule],
  controllers: [ReviewController],
  providers: [ReviewService],
})
export class ReviewModule {}
