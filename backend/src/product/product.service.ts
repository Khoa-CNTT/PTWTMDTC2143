import { Injectable } from '@nestjs/common';
import { ProductResponseDTO } from './dto/product-response.dto';
import { Product } from './interfaces/product.interface';
import { PrismaService } from 'src/prisma/prisma.service';
import { Variant } from './interfaces/variant.interface';
import { ProductCreateDTO } from './dto/product-create.dto';
import { VariantCreateDTO } from './dto/variant-create.dto';
import { VariantResponseDTO } from './dto/variant-response.dto';
import { VariantUpdateDTO } from './dto/variant-update.dto';
import { ImageService } from 'src/image/image.service';
import { ProductUpdateDTO } from './dto/product-update.dto';
import { Image } from '@prisma/client';

@Injectable()
export class ProductService {
  constructor(
    private prisma: PrismaService,
    private imageService: ImageService
  ) {}

  async createProduct(
    productCreateDTO: ProductCreateDTO
  ): Promise<ProductResponseDTO> {
    const product = await this.prisma.product.create({
      data: {
        title: productCreateDTO.title,
        description: productCreateDTO.description,
        rating: 0.0,
        categoryId: productCreateDTO.categoryId,
        brandId: productCreateDTO.brandId,
      },
      include: {
        images: true,
        brand: true,
        category: true,
        options: true,
      },
    });

    if (productCreateDTO.images?.length) {
      const imagePromises = productCreateDTO.images.map(async (file, index) => {
        const imageUrl = await this.imageService.uploadImage(file, 'products');

        return this.prisma.image.create({
          data: {
            imageUrl,
            isThumbnail: index === 0, // xử lý thumbnail tại đây
            productId: product.id,
          },
        });
      });

      await Promise.all(imagePromises);
    }
    for (const option of productCreateDTO.options) {
      const createdOption = await this.prisma.option.create({
        data: {
          name: option.name,
          productId: product.id,
        },
      });

      for (const value of option.values) {
        await this.prisma.optionValue.create({
          data: {
            value: value,
            optionId: createdOption.id,
          },
        });
      }
    }

    return this.mapProductToResponse(product);
  }

  async updateProduct(
    productId: string,
    dto: ProductUpdateDTO
  ): Promise<ProductResponseDTO> {
    const { oldImages, newImages, replaceIds } = dto;

    const existingImages = await this.prisma.image.findMany({
      where: { productId },
    });
    const parsedReplaceIds: string[] = replaceIds || [];

    for (const img of oldImages) {
      await this.prisma.image.update({
        where: { id: img.id },
        data: {
          isThumbnail: img.isThumbnail === true,
        },
      });
    }

    if (newImages.length && parsedReplaceIds.length === newImages.length) {
      for (let i = 0; i < newImages.length; i++) {
        const file = newImages[i];
        const targetId = parsedReplaceIds[i];

        const oldImage = existingImages.find((img) => img.id === targetId);
        if (!oldImage) continue;

        const imageUrl = await this.imageService.uploadImage(file, 'products');

        await this.imageService.deleteImageByUrl(oldImage.imageUrl);
        await this.prisma.image.delete({ where: { id: oldImage.id } });

        await this.prisma.image.create({
          data: {
            imageUrl,
            isThumbnail: oldImage.isThumbnail === true,
            productId,
          },
        });
      }
    }

    const finalImages = await this.prisma.image.findMany({
      where: { productId },
    });
    const hasThumbnail = finalImages.some((img) => img.isThumbnail);

    if (!hasThumbnail && finalImages.length) {
      await this.prisma.image.update({
        where: { id: finalImages[0].id },
        data: { isThumbnail: true },
      });
    }

    const updated = await this.prisma.product.findUnique({
      where: { id: productId },
      include: {
        images: true,
        brand: true,
        category: true,
        options: { include: { values: true } },
      },
    });

    return this.mapProductToResponse(updated);
  }

  private async upsertProductOption(
    productId: string,
    optionDTO: { name: string; values: string[] },
    existingOptions: {
      id: string;
      name: string;
      values: { id: string; value: string }[];
    }[]
  ): Promise<void> {
    const existingOption = existingOptions.find(
      (opt) => opt.name.toLowerCase() === optionDTO.name.toLowerCase()
    );

    if (!existingOption) {
      await this.prisma.option.create({
        data: {
          name: optionDTO.name,
          productId,
          values: {
            create: optionDTO.values.map((val) => ({ value: val })),
          },
        },
      });
      return;
    }

    const existingValueSet = new Set(
      existingOption.values.map((val) => val.value.toLowerCase())
    );

    for (const value of optionDTO.values) {
      if (!existingValueSet.has(value.toLowerCase())) {
        await this.prisma.optionValue.create({
          data: {
            value,
            optionId: existingOption.id,
          },
        });
      }
    }
  }

  async createVariant(
    productId: string,
    variantCreateDTO: VariantCreateDTO
  ): Promise<VariantResponseDTO> {
    const optionValueIds = variantCreateDTO.optionValues.map(
      (val) => val.optionValueId
    );
    const uniqueOptionValueIds = [...new Set(optionValueIds)];

    if (optionValueIds.length !== uniqueOptionValueIds.length) {
      throw new Error('Option values cannot be duplicated.');
    }

    const variant = await this.prisma.variant.create({
      data: {
        sku: await this.generateSku(productId, optionValueIds),
        price: variantCreateDTO.price,
        compareAtPrice: variantCreateDTO.compareAtPrice,
        weight: variantCreateDTO.weight,
        weightUnit: variantCreateDTO.weightUnit,
        dimensions: variantCreateDTO.dimensions,
        description: variantCreateDTO.description,
        status: variantCreateDTO.status,
        productId,
      },
    });

    const variantOptionValues = optionValueIds.map((optionValueId) => ({
      variantId: variant.id,
      optionValueId,
    }));

    await this.prisma.variantOptionValue.createMany({
      data: variantOptionValues,
    });

    if (variantCreateDTO.images?.length) {
      for (const file of variantCreateDTO.images) {
        const imageUrl = await this.imageService.uploadImage(file, 'variants');

        await this.prisma.image.create({
          data: {
            imageUrl,
            isThumbnail: false,
            variantId: variant.id,
          },
        });
      }
    }

    const fullVariant = await this.prisma.variant.findUnique({
      where: { id: variant.id },
      include: {
        optionValues: true,
        images: true,
      },
    });

    return this.mapProductVariantToResponse(fullVariant);
  }

  async updateVariant(
    variantId: string,
    dto: VariantUpdateDTO
  ): Promise<VariantResponseDTO> {
    const {
      price,
      compareAtPrice,
      weight,
      weightUnit,
      dimensions,
      description,
      status,
      optionValues,
      newImages = [],
      replaceIds = [],
    } = dto;

    await this.prisma.variant.update({
      where: { id: variantId },
      data: {
        price,
        compareAtPrice,
        weight,
        weightUnit,
        dimensions,
        description,
        status,
      },
    });

    if (optionValues?.length) {
      await this.prisma.variantOptionValue.deleteMany({ where: { variantId } });
      await this.prisma.variantOptionValue.createMany({
        data: optionValues.map((val) => ({
          variantId,
          optionValueId: val.optionValueId,
        })),
      });

      const variant = await this.prisma.variant.findUnique({
        where: { id: variantId },
        select: { productId: true },
      });

      if (variant?.productId) {
        const sku = await this.generateSku(
          variant.productId,
          optionValues.map((v) => v.optionValueId)
        );
        await this.prisma.variant.update({
          where: { id: variantId },
          data: { sku },
        });
      }
    }

    const existingImages = await this.prisma.image.findMany({
      where: { variantId },
    });

    const isReplaceValid =
      newImages.length && replaceIds.length === newImages.length;
    if (isReplaceValid) {
      for (let i = 0; i < newImages.length; i++) {
        const targetId = replaceIds[i];
        const file = newImages[i];

        const oldImage = existingImages.find((img) => img.id === targetId);
        if (!oldImage) continue;

        const imageUrl = await this.imageService.uploadImage(file, 'variants');
        await this.imageService.deleteImageByUrl(oldImage.imageUrl);
        await this.prisma.image.delete({ where: { id: oldImage.id } });

        await this.prisma.image.create({
          data: {
            imageUrl,
            variantId,
          },
        });
      }
    }

    const updatedVariant = await this.prisma.variant.findUnique({
      where: { id: variantId },
      include: {
        optionValues: {
          include: {
            optionValue: { include: { option: true } },
          },
        },
        images: true,
      },
    });

    return this.mapProductVariantToResponse(updatedVariant);
  }

  async getProductsByCategory(
    categoryId: string,
    limit: number,
    cursor?: string
  ): Promise<{ data: ProductResponseDTO[]; nextCursor: string | null }> {
    const products = await this.prisma.product.findMany({
      where: { categoryId },
      take: limit + 1,
      ...(cursor && {
        skip: 1,
        cursor: { id: cursor },
      }),
      orderBy: { id: 'asc' },
      include: {
        images: true,
        brand: true,
        category: true,
        options: {
          include: { values: true },
        },
      },
    });

    let nextCursor: string | null = null;
    if (products.length > limit) {
      const nextItem = products.pop();
      nextCursor = nextItem?.id || null;
    }

    const formatted = await Promise.all(
      products.map((product) => this.mapProductToResponse(product))
    );

    return { data: formatted, nextCursor };
  }

  async searchProductsByName(
    keyword: string,
    limit: number,
    cursor?: string
  ): Promise<{ data: ProductResponseDTO[]; nextCursor: string | null }> {
    const products = await this.prisma.product.findMany({
      where: {
        title: {
          contains: keyword,
        },
      },
      take: limit + 1,
      ...(cursor && {
        skip: 1,
        cursor: { id: cursor },
      }),
      orderBy: { id: 'asc' },
      include: {
        images: true,
        brand: true,
        category: true,
        options: {
          include: { values: true },
        },
      },
    });

    let nextCursor: string | null = null;
    if (products.length > limit) {
      const nextItem = products.pop();
      nextCursor = nextItem?.id || null;
    }

    const formatted = await Promise.all(
      products.map((product) => this.mapProductToResponse(product))
    );

    return { data: formatted, nextCursor };
  }

  async getProductVariant(variantId: string): Promise<VariantResponseDTO> {
    const variant = await this.prisma.variant.findUnique({
      where: { id: variantId },
      include: {
        optionValues: {
          include: {
            optionValue: {
              include: {
                option: true,
              },
            },
          },
        },
      },
    });

    if (!variant) {
      throw new Error(`Variant with id ${variantId} not found`);
    }

    return this.mapProductVariantToResponse(variant);
  }

  private async mapProductToResponse(
    product: Product
  ): Promise<ProductResponseDTO> {
    const option = await this.prisma.option.findMany({
      where: { productId: product.id },
      include: {
        values: true,
      },
    });

    const images = await this.prisma.image.findMany({
      where: { productId: product.id },
    });

    const category = await this.prisma.category.findUnique({
      where: { id: product.categoryId },
    });

    const brand = await this.prisma.brand.findUnique({
      where: { id: product.brandId },
    });

    return {
      id: product.id,
      title: product.title,
      price: product.price,
      description: product.description,
      rating: product.rating,
      category: {
        id: category?.id || '',
        name: category?.name || '',
        image: category?.image || '',
      },
      brand: {
        id: brand?.id || '',
        name: brand?.name || '',
        logo: brand?.logo || '',
      },
      images: images.map((img) => ({
        id: img.id,
        imageUrl: img.imageUrl,
        isThumbnail: img.isThumbnail,
      })),
      options: option.map((opt) => ({
        id: opt.id,
        name: opt.name,
        values: opt.values.map((value) => ({
          id: value.id,
          value: value.value,
        })),
      })),
    };
  }

  async getAllProducts(limit: number, cursor?: string) {
    const products = await this.prisma.product.findMany({
      take: limit,
      skip: cursor ? 1 : 0,
      cursor: cursor ? { id: cursor } : undefined,
      orderBy: { createdAt: 'desc' },
      include: {
        category: true,
        brand: true,
        images: true,
        variants: {
          include: {
            images: true,
            optionValues: {
              include: {
                optionValue: {
                  include: {
                    option: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    const total = await this.prisma.product.count();

    return {
      products,
      total,
      hasMore: products.length === limit,
      nextCursor: products.length > 0 ? products[products.length - 1].id : null,
    };
  }

  private async mapProductVariantToResponse(
    variant: Variant & { images?: Image[] }
  ): Promise<VariantResponseDTO> {
    const variantOptionValues = await this.prisma.variantOptionValue.findMany({
      where: { variantId: variant.id },
      include: {
        optionValue: {
          include: {
            option: true,
          },
        },
      },
    });

    const product = await this.prisma.product.findUnique({
      where: { id: variant.productId },
      include: {
        category: true,
      },
    });

    const productDiscounts = await this.prisma.productDiscount.findMany({
      where: { productId: product.id },
      include: { discount: true },
    });

    const categoryDiscounts = await this.prisma.categoryDiscount.findMany({
      where: { categoryId: product.categoryId },
      include: { discount: true },
    });

    const discounts = [
      ...productDiscounts.map((pd) => pd.discount),
      ...categoryDiscounts.map((cd) => cd.discount),
    ];

    let discountedPrice = variant.price;
    const finalPrice = variant.price;
    for (const discount of discounts) {
      if (
        discount.status === 'ACTIVE' &&
        new Date() >= discount.startDate &&
        new Date() <= discount.endDate
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

    return {
      id: variant.id,
      sku: variant.sku,
      price: finalPrice,
      discountedPrice: discountedPrice,
      compareAtPrice: variant.compareAtPrice,
      weight: variant.weight,
      weightUnit: variant.weightUnit,
      dimensions: variant.dimensions,
      description: variant.description,
      status: variant.status,
      optionValues: variantOptionValues.map((vov) => ({
        id: vov.optionValue.id,
        value: vov.optionValue.value,
        optionId: vov.optionValue.optionId,
        optionName: vov.optionValue.option.name,
      })),
      images:
        variant.images?.map((img) => ({
          id: img.id,
          imageUrl: img.imageUrl,
          isThumbnail: img.isThumbnail,
        })) || [],
    };
  }

  private async generateSku(
    productId: string,
    optionValues: string[]
  ): Promise<string> {
    const options = await this.prisma.option.findMany({
      where: { productId },
      include: {
        values: true,
      },
    });

    const skuParts = await Promise.all(
      optionValues.map(async (optionValueId) => {
        const optionValue = await this.prisma.optionValue.findUnique({
          where: { id: optionValueId },
        });

        const option = options.find((o) =>
          o.values.some((v) => v.id === optionValueId)
        );
        return `${option.name}-${optionValue?.value}`;
      })
    );
    return skuParts.join(' | ');
  }
}
