import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  HttpCode,
  HttpStatus,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { WishlistService } from './wishlist.service';
import { CreateWishlistItemDTO } from './dto/create-wishlist-item';

interface RequestWithUser extends Request {
  user: {
    id: string;
  };
}

@Controller('wishlist')
export class WishlistController {
  constructor(private readonly wishlistService: WishlistService) {}

  @Get()
  async getWishlist(@Req() req: RequestWithUser) {
    return this.wishlistService.getWishlist(req.user.id);
  }

  @Post()
  async addToWishlist(
    @Req() req: RequestWithUser,
    @Body() dto: CreateWishlistItemDTO
  ) {
    return this.wishlistService.addToWishlist(req.user.id, dto);
  }

  @Delete(':variantId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeFromWishlist(
    @Req() req: RequestWithUser,
    @Param('variantId') variantId: string
  ) {
    await this.wishlistService.removeFromWishlist(req.user.id, variantId);
  }
}
