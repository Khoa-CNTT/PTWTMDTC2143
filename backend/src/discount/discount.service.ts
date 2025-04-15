import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { DiscountUpdateDTO } from './dto/discount-update.dto';
import { DiscountMapper } from './discount.mapper';
import { DiscountCreateDTO } from './dto/discount-create.dto';

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

  async findAll() {
    const discounts = await this.prisma.discount.findMany({
      include: {
        categories: { include: { category: true } },
        products: { include: { product: true } },
      },
    });

    return discounts.map((discount) => DiscountMapper.toDTO(discount));
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
        // Xóa rồi tạo lại quan hệ nếu có
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
}
