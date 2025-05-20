import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  UploadedFiles,
  UseInterceptors,
  Query,
} from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post()
  @UseInterceptors(FilesInterceptor('images'))
  async create(
    @Body() createReviewDto: CreateReviewDto,
    @UploadedFiles() files?: Express.Multer.File[]
  ) {
    return this.reviewService.create(createReviewDto, files);
  }

  @Get('/user/:name/reviews')
  async findByUsername(
    @Param('name') name: string,
    @Query('limit') limit: number = 10,
    @Query('cursor') cursor?: string
  ) {
    return this.reviewService.findByUsername(name, limit, cursor);
  }

  @Get('product/:productId')
  async getByProduct(@Param('productId') productId: string) {
    return this.reviewService.findByProduct(productId); // Không phân trang ở đây
  }

  @Get(':id')
  async getOne(@Param('id') id: string) {
    return this.reviewService.findOne(id);
  }

  @Get()
  async getAllReviews(
    @Query('limit') limit: number = 10,
    @Query('cursor') cursor?: string
  ) {
    return this.reviewService.getAllReviews(limit, cursor);
  }
}
