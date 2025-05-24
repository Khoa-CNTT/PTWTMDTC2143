import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddToCartDTO } from './dto/add-to-cart.dto';
import { UpdateCartItemQuantityDTO } from './dto/cart-item-update-quantity.dto';
import { SelectCartItemDTO } from './dto/select-cart-item.dto';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import { DiscountService } from 'src/discount/discount.service';

@Injectable()
export class CartService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private prisma: PrismaService,
    private discountService: DiscountService
  ) {}

  private async getOrCreateCart(userId: string) {
    const existing = await this.prisma.cart.findUnique({ where: { userId } });
    if (existing) return existing;

    return this.prisma.cart.create({ data: { userId } });
  }

  private async getFlashSalePrice(
    variantId: string
  ): Promise<{ flashPrice: number; quantity: number } | null> {
    return this.cacheManager.get<{ flashPrice: number; quantity: number }>(
      `flashSale:${variantId}`
    );
  }

  async getCart(userId: string) {
    const cart = await this.getOrCreateCart(userId);

    const cartData = await this.prisma.cart.findUnique({
      where: { id: cart.id },
      include: {
        items: {
          include: {
            variant: {
              include: {
                product: true,
                images: true,
                optionValues: true,
              },
            },
          },
        },
      },
    });

    if (!cartData) throw new NotFoundException('Cart not found');

    const cartItems = await Promise.all(
      cartData.items.map(async (item) => {
        const variant = item.variant;
        if (!variant) throw new NotFoundException('Variant not found');

        const flashSaleData = await this.getFlashSalePrice(variant.id);
        let finalPrice = variant.price;
        if (flashSaleData && flashSaleData.quantity > 0) {
          finalPrice = flashSaleData.flashPrice;
        }

        const product = variant.product;
        if (!product) throw new NotFoundException('Product not found');

        const category = await this.prisma.category.findUnique({
          where: { id: product.categoryId },
        });
        if (!category) throw new NotFoundException('Category not found');

        const discounts =
          await this.discountService.getActiveDiscountsForProduct(
            product.id,
            category.id
          );
        const discountedPrice =
          this.discountService.calculateDiscountedPriceSale(
            finalPrice,
            discounts
          );

        const savedAmount = (finalPrice - discountedPrice) * item.quantity;

        return {
          variantId: item.variantId,
          quantity: item.quantity,
          originalPrice: finalPrice,
          discountedPrice,
          totalPrice: discountedPrice * item.quantity,
          savedAmount,
          variant: {
            id: variant.id,
            sku: variant.sku,
            price: variant.price,
            compareAtPrice: variant.compareAtPrice,
            description: variant.description,
            product: {
              title: product.title,
            },
            images: variant.images.map((img) => ({
              url: img.imageUrl,
            })),
          },
        };
      })
    );

    const totalCartPrice = cartItems.reduce(
      (acc, item) => acc + item.totalPrice,
      0
    );
    const totalSavedAmount = cartItems.reduce(
      (acc, item) => acc + item.savedAmount,
      0
    );

    return {
      items: cartItems,
      totalCartPrice,
      totalSavedAmount,
    };
  }

  async addToCart(userId: string, dto: AddToCartDTO) {
    const cart = await this.getOrCreateCart(userId);
    const [existingItem, variant] = await Promise.all([
      this.prisma.cartItem.findFirst({
        where: { cartId: cart.id, variantId: dto.variantId },
      }),
      this.prisma.variant.findUnique({
        where: { id: dto.variantId },
        include: { product: { include: { category: true } } },
      }),
    ]);
    if (!variant) throw new NotFoundException('Variant not found');

    // Lấy flash sale cache từ Redis (object chứa flashPrice + quantity)
    const flashSaleData = await this.getFlashSalePrice(dto.variantId);

    let appliedPrice = variant.price;

    if (flashSaleData && flashSaleData.quantity >= dto.quantity) {
      appliedPrice = flashSaleData.flashPrice;
    } else {
      const product = variant.product;
      const category = product.category;

      if (!product || !category)
        throw new NotFoundException('Product or Category not found');

      const discounts = await this.discountService.getActiveDiscountsForProduct(
        product.id,
        category.id
      );
      appliedPrice = this.discountService.calculateDiscountedPriceSale(
        appliedPrice,
        discounts
      );
    }

    const addedPrice = appliedPrice * dto.quantity;

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
      include: { variant: { include: { product: true } } },
    });

    if (!cartItem) throw new NotFoundException('Cart item not found');

    const newQuantity = cartItem.quantity + dto.quantity;
    if (newQuantity < 1)
      throw new BadRequestException('Quantity must be at least 1');

    const flashSaleData = await this.getFlashSalePrice(cartItem.variantId);
    let unitPrice = cartItem.variant.price;

    if (flashSaleData && flashSaleData.quantity >= newQuantity) {
      unitPrice = flashSaleData.flashPrice;
    } else {
      const product = cartItem.variant.product;
      if (!product) throw new NotFoundException('Product not found');

      const category = await this.prisma.category.findUnique({
        where: { id: product.categoryId },
      });
      if (!category) throw new NotFoundException('Category not found');

      const discounts = await this.discountService.getActiveDiscountsForProduct(
        product.id,
        category.id
      );
      unitPrice = this.discountService.calculateDiscountedPriceSale(
        unitPrice,
        discounts
      );
    }

    const totalPrice = unitPrice * newQuantity;

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

  async clearSelectedItems(userId: string, tx) {
    await tx.cartItem.deleteMany({
      where: {
        cart: { userId },
        isSelected: true,
      },
    });
  }

  async resetCartTotal(userId: string, tx) {
    await tx.cart.update({
      where: { userId },
      data: { totalAmount: 0 },
    });
  }
}
