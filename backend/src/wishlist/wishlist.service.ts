import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateWishlistItemDTO } from './dto/create-wishlist-item';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class WishlistService {
  constructor(private prisma: PrismaService) {}

  async getWishlist(userId: string) {
    return this.prisma.wishlist.findUnique({
      where: { userId },
      include: {
        products: {
          include: {
            variant: {
              include: {
                product: true,
                images: true,
                optionValues: {
                  include: {
                    optionValue: {
                      include: {
                        option: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });
  }

  async addToWishlist(userId: string, dto: CreateWishlistItemDTO) {
    const wishlist = await this.prisma.wishlist.upsert({
      where: { userId },
      update: {},
      create: {
        userId,
      },
    });

    const exists = await this.prisma.wishlistProduct.findUnique({
      where: {
        wishlistId_variantId: {
          wishlistId: wishlist.id,
          variantId: dto.variantId,
        },
      },
    });

    if (exists) {
      throw new BadRequestException('Variant already in wishlist');
    }

    return this.prisma.wishlistProduct.create({
      data: {
        wishlistId: wishlist.id,
        variantId: dto.variantId,
      },
    });
  }

  async removeFromWishlist(userId: string, variantId: string) {
    const wishlist = await this.prisma.wishlist.findUnique({
      where: { userId },
    });
    if (!wishlist) {
      throw new NotFoundException('Wishlist not found');
    }

    return this.prisma.wishlistProduct.delete({
      where: {
        wishlistId_variantId: {
          wishlistId: wishlist.id,
          variantId,
        },
      },
    });
  }
}
