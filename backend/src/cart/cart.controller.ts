import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AddToCartDTO } from './dto/add-to-cart.dto';
import { CartService } from './cart.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UpdateCartItemQuantityDTO } from './dto/cart-item-update-quantity.dto';
import { SelectCartItemDTO } from './dto/select-cart-item.dto';

@UseGuards(JwtAuthGuard)
@Controller('cart')
export class CartController {
  constructor(private cartService: CartService) {}

  @Get()
  getCart(@Req() req: { user: { id: string } }) {
    return this.cartService.getCart(req.user.id);
  }

  @Post()
  addToCart(@Req() req: { user: { id: string } }, @Body() dto: AddToCartDTO) {
    return this.cartService.addToCart(req.user.id, dto);
  }

  @Patch('update-quantity')
  updateQuantity(
    @Req() req: { user: { id: string } },
    @Body() dto: UpdateCartItemQuantityDTO
  ) {
    return this.cartService.updateQuantity(req.user.id, dto);
  }

  @Patch('select-item')
  selectItem(
    @Req() req: { user: { id: string } },
    @Body() dto: SelectCartItemDTO
  ) {
    return this.cartService.selectCartItem(req.user.id, dto);
  }

  @Get('selected-items')
  getSelectedItems(@Req() req: { user: { id: string } }) {
    return this.cartService.getSelectedItems(req.user.id);
  }

  @Delete('item/:id')
  removeItem(@Req() req: { user: { id: string } }, @Param('id') id: string) {
    return this.cartService.removeCartItem(req.user.id, id);
  }

  @Delete('clear')
  clearCart(@Req() req: { user: { id: string } }) {
    return this.cartService.clearCart(req.user.id);
  }
}
