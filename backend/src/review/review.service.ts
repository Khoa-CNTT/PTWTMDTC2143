import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { ImageService } from 'src/image/image.service';

@Injectable()
export class ReviewService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly imageService: ImageService
  ) {}

  async create(
    createReviewDto: CreateReviewDto,
    files?: Express.Multer.File[]
  ) {
    const { userId, productId, rating, content, parentId } = createReviewDto;

    const product = await this.prisma.product.findUnique({
      where: { id: productId },
    });
    if (!product) throw new NotFoundException('Product not found');

    const finalRating = parentId ? (rating ?? null) : rating;

    let imagesUrls: string[] = [];
    if (files && files.length > 0) {
      imagesUrls = await Promise.all(
        files.map((file) => this.imageService.uploadImage(file, 'reviews'))
      );
    }

    const images = imagesUrls.length > 0 ? JSON.stringify(imagesUrls) : null;

    const review = await this.prisma.review.create({
      data: {
        userId,
        productId,
        rating: finalRating,
        content,
        images,
        parentId,
      },
    });

    return review;
  }

  async findByProduct(productId: string) {
    return this.prisma.review.findMany({
      where: { productId, parentId: null },
      include: {
        replies: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: string) {
    const review = await this.prisma.review.findUnique({
      where: { id },
      include: { replies: true },
    });
    if (!review) throw new NotFoundException('Review not found');
    return review;
  }
}
