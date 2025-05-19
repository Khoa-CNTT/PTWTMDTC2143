import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { WishlistService } from './wishlist.service';
import { CreateWishlistItemDTO } from './dto/create-wishlist-item';

@Controller('wishlist')
export class WishlistController {
  constructor(private readonly wishlistService: WishlistService) {}
  private readonly fakeUserId = 'US001'; // ID user giả định

  @Get()
  async getWishlist() {
    return this.wishlistService.getWishlist(this.fakeUserId);
  }

  @Post()
  async addToWishlist(@Body() dto: CreateWishlistItemDTO) {
    return this.wishlistService.addToWishlist(this.fakeUserId, dto);
  }

  @Delete(':variantId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeFromWishlist(@Param('variantId') variantId: string) {
    await this.wishlistService.removeFromWishlist(this.fakeUserId, variantId);
  }
}
