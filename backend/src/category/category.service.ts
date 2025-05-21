import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CategoryResponseDto } from './dto/category-response.dto';
import { CategoryCreateDTO } from './dto/category-create.dto';
import { CategoryUpdateDTO } from './dto/category-update.dto';
import { Category } from './interfaces/category.interface';
import { Prisma } from '@prisma/client';
import { ImageService } from 'src/image/image.service';

@Injectable()
export class CategoryService {
  constructor(
    private prisma: PrismaService,
    private imageService: ImageService
  ) {}

  async createCategory(
    categoryCreateDTO: CategoryCreateDTO,
    imageFile?: Express.Multer.File
  ): Promise<CategoryResponseDto> {
    const { parentId, subCategories, ...categoryData } = categoryCreateDTO;
    let imageUrl: string | undefined;

    if (imageFile) {
      imageUrl = await this.imageService.uploadImage(imageFile, 'categories');
    }

    const data: Prisma.CategoryCreateInput = {
      ...categoryData,
      image: imageUrl,
      parent: parentId
        ? { connect: { id: await this.getParentCategoryId(parentId) } }
        : undefined,
    };

    const createdCategory = await this.prisma.category.create({ data });
    if (subCategories && subCategories.length > 0) {
      await this.createSubCategories(subCategories, createdCategory.id);
    }
    return this.toCategoryResponseDto(createdCategory);
  }

  async updateCategory(
    id: string,
    categoryUpdateDTO: CategoryUpdateDTO,
    imageFile?: Express.Multer.File
  ): Promise<CategoryResponseDto> {
    const category = await this.prisma.category.findUnique({ where: { id } });
    if (!category) throw new NotFoundException('Category not found');

    let imageUrl: string | undefined = category.image;

    if (imageFile) {
      if (category.image) {
        await this.imageService.deleteImageByUrl(category.image);
      }
      imageUrl = await this.imageService.uploadImage(imageFile, 'categories');
    }

    const updatedCategory = await this.prisma.category.update({
      where: { id },
      data: { ...categoryUpdateDTO, image: imageUrl },
    });

    return this.toCategoryResponseDto(updatedCategory);
  }

  async findAll(
    limit: string,
    cursor?: string
  ): Promise<{ data: CategoryResponseDto[]; nextCursor: string | null }> {
    const categories = await this.prisma.category.findMany({
      take: parseInt(limit) + 1,
      ...(cursor && {
        skip: 1,
        cursor: { id: cursor },
      }),
      // where: {
      //   parentId: null,
      // },
      include: {
        subCategories: {
          include: {
            subCategories: {
              include: {
                subCategories: true,
              },
            },
          },
        },
      },
      orderBy: { id: 'asc' },
    });

    let nextCursor: string | null = null;
    if (categories.length > parseInt(limit)) {
      const nextCategory = categories.pop();
      nextCursor = nextCategory?.id || null;
    }

    const formatted = categories.map((category) =>
      this.toCategoryResponseDto(category)
    );

    return { data: formatted, nextCursor };
  }

  async findOne(id: string): Promise<CategoryResponseDto> {
    const category = await this.prisma.category.findUnique({
      where: { id },
      include: {
        subCategories: true,
      },
    });
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    return this.toCategoryResponseDto(category);
  }

  async findSubCategories(id: string): Promise<CategoryResponseDto[]> {
    const category = await this.prisma.category.findUnique({
      where: { id },
      include: {
        subCategories: true,
      },
    });
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    return category.subCategories.map((subCategory) =>
      this.toCategoryResponseDto(subCategory)
    );
  }

  async findParentCategory(id: string): Promise<CategoryResponseDto> {
    const category = await this.prisma.category.findUnique({
      where: { id },
      include: {
        parent: true,
      },
    });
    if (!category || !category.parent) {
      throw new NotFoundException('Parent category not found');
    }
    return this.toCategoryResponseDto(category.parent);
  }

  async findCategoryByName(name: string): Promise<CategoryResponseDto[]> {
    const categories = await this.prisma.category.findMany({
      where: {
        name: {
          contains: name,
        },
      },
      include: {
        subCategories: true,
      },
    });
    return categories.map((category) => this.toCategoryResponseDto(category));
  }

  async remove(id: string): Promise<void> {
    await this.prisma.category.delete({
      where: { id },
    });
  }

  private async getParentCategoryId(parentId: string): Promise<string> {
    const parentCategory = await this.prisma.category.findUnique({
      where: { id: parentId },
    });
    if (!parentCategory) {
      throw new NotFoundException('Parent category not found');
    }
    return parentCategory.id;
  }

  private async createSubCategories(
    subCategories: CategoryCreateDTO[],
    parentId: string
  ): Promise<void> {
    for (const subCategory of subCategories) {
      const createdSubCategory = await this.createCategory({
        ...subCategory,
        parentId,
      });

      if (subCategory.subCategories && subCategory.subCategories.length > 0) {
        await this.createSubCategories(
          subCategory.subCategories,
          createdSubCategory.id
        );
      }
    }
  }

  private toCategoryResponseDto(category: Category): CategoryResponseDto {
    return {
      id: category.id,
      name: category.name,
      image: category.image,
      parentId: category.parentId,
      subCategories: category.subCategories
        ? category.subCategories.map((subCategory) =>
            this.toCategoryResponseDto(subCategory)
          )
        : [],
    };
  }
}
