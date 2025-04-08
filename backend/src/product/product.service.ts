import { Injectable } from '@nestjs/common';
import { ProductResponseDTO } from './dto/product-response.dto';
import { Product } from './interfaces/product.interface';
import { PrismaService } from 'src/prisma/prisma.service';
import { Variant } from './interfaces/variant.interface';
import { ProductCreateDTO } from './dto/product-create.dto';
import { VariantCreateDTO } from './dto/variant-create.dto';
import { VariantResponseDTO } from './dto/variant-response.dto';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

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
      await this.prisma.image.createMany({
        data: productCreateDTO.images.map((img) => ({
          imageUrl: img.imageUrl,
          isThumbnail: img.isThumbnail ?? false,
          productId: product.id,
        })),
      });
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

  async createProductVariant(
    productId: string,
    variantCreateDTO: VariantCreateDTO
  ): Promise<VariantResponseDTO> {
    const variant = await this.prisma.variant.create({
      data: {
        sku: await this.generateSku(
          productId,
          variantCreateDTO.optionValues.map((val) => val.optionValueId)
        ),
        price: variantCreateDTO.price,
        compareAtPrice: variantCreateDTO.compareAtPrice,
        weight: variantCreateDTO.weight,
        weightUnit: variantCreateDTO.weightUnit,
        description: variantCreateDTO.description,
        status: variantCreateDTO.status,
        productId,
      },
      include: {
        optionValues: true,
      },
    });

    const variantOptionValues = variantCreateDTO.optionValues.map((val) => ({
      variantId: variant.id,
      optionValueId: val.optionValueId,
    }));

    await this.prisma.variantOptionValue.createMany({
      data: variantOptionValues,
    });

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

  private async mapProductVariantToResponse(
    variant: Variant
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

    return {
      id: variant.id,
      sku: variant.sku,
      price: variant.price,
      compareAtPrice: variant.compareAtPrice,
      weight: variant.weight,
      weightUnit: variant.weightUnit,
      description: variant.description,
      status: variant.status,
      optionValues: variantOptionValues.map((vov) => ({
        id: vov.optionValue.id,
        value: vov.optionValue.value,
        optionId: vov.optionValue.optionId,
        optionName: vov.optionValue.option.name,
      })),
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
