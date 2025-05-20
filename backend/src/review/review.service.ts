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

  async findOne(id: string) {
    const review = await this.prisma.review.findUnique({
      where: { id },
      include: { replies: true },
    });
    if (!review) throw new NotFoundException('Review not found');
    return review;
  }

  private async paginateReviews(options: {
    limit: number;
    cursor?: string;
    filter?: object;
    orderBy?: object;
    includeReplies?: boolean;
  }) {
    const {
      limit,
      cursor,
      filter = {},
      orderBy = { createdAt: 'desc' },
      includeReplies = true,
    } = options;

    const parsedLimit = parseInt(limit.toString(), 10);

    const reviews = await this.prisma.review.findMany({
      where: filter,
      include: includeReplies ? { replies: true } : undefined,
      orderBy,
      take: parsedLimit,
      skip: cursor ? 1 : 0,
      cursor: cursor ? { id: cursor } : undefined,
    });

    const total = await this.prisma.review.count({ where: filter });

    return {
      reviews,
      total,
      hasMore: reviews.length === limit,
      nextCursor: reviews.length > 0 ? reviews[reviews.length - 1].id : null,
    };
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

  async findByUsername(name: string, limit: number, cursor?: string) {
    const user = await this.prisma.user.findFirst({
      where: { name: { contains: name } },
    });

    if (!user) throw new NotFoundException('User not found');

    return this.paginateReviews({
      limit,
      cursor,
      filter: { userId: user.id },
      includeReplies: true,
    });
  }

  async getAllReviews(limit: number, cursor?: string) {
    return this.paginateReviews({
      limit,
      cursor,
      filter: {},
      includeReplies: true,
    });
  }
}
