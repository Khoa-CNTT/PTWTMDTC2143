import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddToCartDTO } from './dto/add-to-cart.dto';
import { UpdateCartItemQuantityDTO } from './dto/cart-item-update-quantity.dto';
import { SelectCartItemDTO } from './dto/select-cart-item.dto';

@Injectable()
export class CartService {
  constructor(private prisma: PrismaService) {}

  private async getOrCreateCart(userId: string) {
    const existing = await this.prisma.cart.findUnique({ where: { userId } });
    if (existing) return existing;

    return this.prisma.cart.create({ data: { userId } });
  }

  async getCart(userId: string) {
    const cart = await this.getOrCreateCart(userId);
    return this.prisma.cart.findUnique({
      where: { id: cart.id },
      include: {
        items: { include: { variant: true } },
      },
    });
  }

  async addToCart(userId: string, dto: AddToCartDTO) {
    const cart = await this.getOrCreateCart(userId);

    const [existingItem, variant] = await Promise.all([
      this.prisma.cartItem.findFirst({
        where: { cartId: cart.id, variantId: dto.variantId },
      }),
      this.prisma.variant.findUnique({
        where: { id: dto.variantId },
      }),
    ]);

    if (!variant) throw new NotFoundException('Variant not found');

    const addedPrice = variant.price * dto.quantity;

    if (existingItem) {
      return this.prisma.cartItem.update({
        where: { id: existingItem.id },
        data: {
          quantity: existingItem.quantity + dto.quantity,
          totalPrice: existingItem.totalPrice + addedPrice,
        },
      });
    }

    return this.prisma.cartItem.create({
      data: {
        cartId: cart.id,
        variantId: dto.variantId,
        quantity: dto.quantity,
        totalPrice: addedPrice,
      },
    });
  }

  async updateQuantity(userId: string, dto: UpdateCartItemQuantityDTO) {
    const cart = await this.getOrCreateCart(userId);

    const cartItem = await this.prisma.cartItem.findFirst({
      where: { id: dto.cartItemId, cartId: cart.id },
      include: { variant: true },
    });

    if (!cartItem) throw new NotFoundException('Cart item not found');

    const newQuantity = cartItem.quantity + dto.quantity;
    if (newQuantity < 1)
      throw new BadRequestException('Quantity must be at least 1');

    const totalPrice = cartItem.variant.price * newQuantity;

    const updatedItem = await this.prisma.cartItem.update({
      where: { id: cartItem.id },
      data: { quantity: newQuantity, totalPrice },
    });

    if (cartItem.isSelected) await this.recalculateCartTotal(cart.id);
    return updatedItem;
  }

  private async recalculateCartTotal(cartId: string) {
    const selectedItems = await this.prisma.cartItem.findMany({
      where: { cartId, isSelected: true },
      include: { variant: true },
    });

    const totalAmount = selectedItems.reduce(
      (sum, item) => sum + item.variant.price * item.quantity,
      0
    );

    return this.prisma.cart.update({
      where: { id: cartId },
      data: { totalAmount },
    });
  }

  async selectCartItem(userId: string, dto: SelectCartItemDTO) {
    await this.prisma.cartItem.update({
      where: { id: dto.cartItemId },
      data: { isSelected: dto.isSelected },
    });

    const cart = await this.getOrCreateCart(userId);
    await this.recalculateCartTotal(cart.id);

    return { success: true };
  }

  async getSelectedItems(userId: string) {
    const cart = await this.getOrCreateCart(userId);
    return this.prisma.cartItem.findMany({
      where: { cartId: cart.id, isSelected: true },
      include: { variant: true },
    });
  }

  async removeCartItem(userId: string, cartItemId: string) {
    const cart = await this.getOrCreateCart(userId);

    const cartItem = await this.prisma.cartItem.findFirst({
      where: { id: cartItemId, cartId: cart.id },
    });

    if (!cartItem) throw new NotFoundException('Item not found');

    return this.prisma.cartItem.delete({ where: { id: cartItemId } });
  }

  async clearCart(userId: string) {
    const cart = await this.getOrCreateCart(userId);
    return this.prisma.cartItem.deleteMany({ where: { cartId: cart.id } });
  }
}
