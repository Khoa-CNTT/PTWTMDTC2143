import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { DiscountUpdateDTO } from './dto/discount-update.dto';
import { DiscountMapper } from './discount.mapper';
import { DiscountCreateDTO } from './dto/discount-create.dto';
import { DiscountResponseDTO } from './dto/discount-response.dto';

@Injectable()
export class DiscountService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: DiscountCreateDTO) {
    const discount = await this.prisma.discount.create({
      data: {
        discount: dto.discount,
        type: dto.type,
        startDate: new Date(dto.startDate),
        endDate: new Date(dto.endDate),
        status: dto.status,
        applyType: dto.applyType,
        categories: dto.categories
          ? {
              create: dto.categories.map((categoryId) => ({
                category: { connect: { id: categoryId } },
              })),
            }
          : undefined,
        products: dto.products
          ? {
              create: dto.products.map((productId) => ({
                product: { connect: { id: productId } },
              })),
            }
          : undefined,
      },
      include: {
        categories: { include: { category: true } },
        products: { include: { product: true } },
      },
    });

    return DiscountMapper.toDTO(discount);
  }

  async findAll(
    limit: number,
    cursor?: string
  ): Promise<{ data: DiscountResponseDTO[]; nextCursor: string | null }> {
    const discounts = await this.prisma.discount.findMany({
      take: limit + 1,
      ...(cursor && {
        skip: 1,
        cursor: { id: cursor },
      }),
      include: {
        categories: { include: { category: true } },
        products: { include: { product: true } },
      },
      orderBy: { id: 'asc' },
    });

    let nextCursor: string | null = null;
    if (discounts.length > limit) {
      const nextDiscount = discounts.pop();
      nextCursor = nextDiscount?.id || null;
    }

    const formatted = discounts.map((discount) =>
      DiscountMapper.toDTO(discount)
    );

    return { data: formatted, nextCursor };
  }

  async findOne(id: string) {
    const discount = await this.prisma.discount.findUnique({
      where: { id },
      include: {
        categories: { include: { category: true } },
        products: { include: { product: true } },
      },
    });

    if (!discount) throw new NotFoundException('Discount not found');

    return DiscountMapper.toDTO(discount);
  }

  async update(id: string, dto: DiscountUpdateDTO) {
    const discount = await this.prisma.discount.update({
      where: { id },
      data: {
        discount: dto.discount,
        type: dto.type,
        startDate: dto.startDate ? new Date(dto.startDate) : undefined,
        endDate: dto.endDate ? new Date(dto.endDate) : undefined,
        status: dto.status,
        applyType: dto.applyType,

        categories: dto.categories
          ? {
              deleteMany: {},
              create: dto.categories.map((categoryId) => ({
                category: { connect: { id: categoryId } },
              })),
            }
          : undefined,
        products: dto.products
          ? {
              deleteMany: {},
              create: dto.products.map((productId) => ({
                product: { connect: { id: productId } },
              })),
            }
          : undefined,
      },
      include: {
        categories: { include: { category: true } },
        products: { include: { product: true } },
      },
    });

    return DiscountMapper.toDTO(discount);
  }

  async remove(id: string) {
    await this.prisma.discount.delete({
      where: { id },
    });
    return { message: 'Discount deleted successfully' };
  }

  async calculateDiscountedPrice(variant, product, category): Promise<number> {
    const productDiscounts = await this.prisma.productDiscount.findMany({
      where: { productId: product.id },
      include: { discount: true },
    });

    const categoryDiscounts = await this.prisma.categoryDiscount.findMany({
      where: { categoryId: category.id },
      include: { discount: true },
    });

    const discounts = [
      ...productDiscounts.map((pd) => pd.discount),
      ...categoryDiscounts.map((cd) => cd.discount),
    ];

    let discountedPrice = variant.price;
    const now = new Date();

    for (const discount of discounts) {
      if (
        discount.status === 'ACTIVE' &&
        now >= discount.startDate &&
        now <= discount.endDate
      ) {
        if (discount.applyType === 'PRODUCT' || discount.applyType === 'ALL') {
          if (discount.type === 'PERCENTAGE') {
            discountedPrice -= (discountedPrice * discount.discount) / 100;
          } else if (discount.type === 'FIXED_AMOUNT') {
            discountedPrice -= discount.discount;
          }
        }
      }
    }

    return discountedPrice < 0 ? 0 : discountedPrice;
  }
}
