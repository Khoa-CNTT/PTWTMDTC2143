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

    const cartData = await this.prisma.cart.findUnique({
      where: { id: cart.id },
      include: {
        items: {
          include: {
            variant: true,
          },
        },
      },
    });

    // Tính toán giá gốc và giá giảm cho từng item trong giỏ hàng
    const cartItems = await Promise.all(
      cartData.items.map(async (item) => {
        const variant = item.variant;

        // Lấy thông tin product và category để tính discount
        const product = await this.prisma.product.findUnique({
          where: { id: variant.productId },
          include: { category: true },
        });

        if (!product) throw new NotFoundException('Product not found');
        const category = product.category;

        // Lấy các discount áp dụng cho product và category
        const productDiscounts = await this.prisma.productDiscount.findMany({
          where: { productId: product.id },
          include: { discount: true },
        });

        const categoryDiscounts = await this.prisma.categoryDiscount.findMany({
          where: { categoryId: category.id },
          include: { discount: true },
        });

        // Kết hợp discount từ product và category
        const discounts = [
          ...productDiscounts.map((pd) => pd.discount),
          ...categoryDiscounts.map((cd) => cd.discount),
        ];

        // Tính toán giá giảm
        let discountedPrice = variant.price;
        const finalPrice = variant.price; // Giá gốc

        for (const discount of discounts) {
          if (
            discount.status === 'ACTIVE' &&
            new Date() >= discount.startDate &&
            new Date() <= discount.endDate
          ) {
            if (
              discount.applyType === 'PRODUCT' ||
              discount.applyType === 'ALL'
            ) {
              // Áp dụng discount cho variant (tùy vào DiscountType)
              if (discount.type === 'PERCENTAGE') {
                discountedPrice -= (discountedPrice * discount.discount) / 100;
              } else if (discount.type === 'FIXED_AMOUNT') {
                discountedPrice -= discount.discount;
              }
            }
          }
        }

        // Tính số tiền tiết kiệm cho từng item
        const savedAmount = (finalPrice - discountedPrice) * item.quantity;

        return {
          variantId: item.variantId,
          quantity: item.quantity,
          originalPrice: finalPrice, // Giá gốc
          discountedPrice, // Giá giảm
          totalPrice: discountedPrice * item.quantity, // Tổng giá cho quantity
          savedAmount, // Số tiền tiết kiệm cho item
        };
      })
    );

    // Tính tổng số tiền giỏ hàng sau discount
    const totalCartPrice = cartItems.reduce(
      (acc, item) => acc + item.totalPrice,
      0
    );

    // Tính tổng số tiền tiết kiệm
    const totalSavedAmount = cartItems.reduce(
      (acc, item) => acc + item.savedAmount,
      0
    );

    return {
      items: cartItems,
      totalCartPrice, // Tổng giá giỏ hàng
      totalSavedAmount, // Tổng số tiền tiết kiệm
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
        include: {
          product: {
            include: {
              category: true,
            },
          },
        },
      }),
    ]);

    if (!variant) throw new NotFoundException('Variant not found');

    // Lấy thông tin product và category để tính discount
    const product = variant.product;
    const category = product.category;

    // Lấy các discount áp dụng cho product và category
    const productDiscounts = await this.prisma.productDiscount.findMany({
      where: { productId: product.id },
      include: { discount: true },
    });

    const categoryDiscounts = await this.prisma.categoryDiscount.findMany({
      where: { categoryId: category.id },
      include: { discount: true },
    });

    // Kết hợp discount từ product và category
    const discounts = [
      ...productDiscounts.map((pd) => pd.discount),
      ...categoryDiscounts.map((cd) => cd.discount),
    ];

    // Tính toán giá giảm
    let discountedPrice = variant.price;

    for (const discount of discounts) {
      if (
        discount.status === 'ACTIVE' &&
        new Date() >= discount.startDate &&
        new Date() <= discount.endDate
      ) {
        if (discount.applyType === 'PRODUCT' || discount.applyType === 'ALL') {
          // Áp dụng discount cho variant (tùy vào DiscountType)
          if (discount.type === 'PERCENTAGE') {
            discountedPrice -= (discountedPrice * discount.discount) / 100;
          } else if (discount.type === 'FIXED_AMOUNT') {
            discountedPrice -= discount.discount;
          }
        }
      }
    }

    const addedPrice = discountedPrice * dto.quantity; // Tính tổng giá giảm

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
        totalPrice: addedPrice, // Chỉ lưu giá giảm
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
