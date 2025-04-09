import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AddToCartDTO } from './dto/add-to-cart.dto';
import { CartService } from './cart.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('cart')
export class CartController {
  constructor(private cartService: CartService) {}

  @Post()
  addToCart(@Req() req: { user: { id: string } }, @Body() dto: AddToCartDTO) {
    return this.cartService.addToCart(req.user.id, dto);
  }
}
