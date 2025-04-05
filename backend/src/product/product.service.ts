import { Injectable } from '@nestjs/common';
import { CreateProductDTO } from './dto/create-product.dto';
import { ProductResponseDTO } from './dto/product-response.dto';
import { Product } from './interfaces/product.interface';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProductVariantResponseDTO } from './dto/product-variant-response.dto';
import { ProductVariant } from './interfaces/product-variant.interface';
import { CreateProductVariantDto } from './dto/create-product-variant.dto';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async createProduct(
    createProductDTO: CreateProductDTO
  ): Promise<ProductResponseDTO> {
    const product = await this.prisma.product.create({
      data: {
        title: createProductDTO.title,
        description: createProductDTO.description,
        rating: 0.0,
        categoryId: createProductDTO.categoryId,
        brandId: createProductDTO.brandId,
      },
      include: {
        images: true,
        brand: true,
        category: true,
        options: true,
      },
    });

    if (createProductDTO.images?.length) {
      await this.prisma.image.createMany({
        data: createProductDTO.images.map((img) => ({
          imageUrl: img.imageUrl,
          isThumbnail: img.isThumbnail ?? false,
          productId: product.id,
        })),
      });
    }

    for (const option of createProductDTO.options) {
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
    variantDto: CreateProductVariantDto
  ): Promise<ProductVariantResponseDTO> {
    const variant = await this.prisma.productVariant.create({
      data: {
        sku: await this.generateSku(
          productId,
          variantDto.optionValues.map((val) => val.optionValueId)
        ),
        price: variantDto.price,
        compareAtPrice: variantDto.compareAtPrice,
        weight: variantDto.weight,
        weightUnit: variantDto.weightUnit,
        description: variantDto.description,
        status: variantDto.status,
        productId,
      },
      include: {
        optionValues: true,
      },
    });

    const variantOptionValues = variantDto.optionValues.map((val) => ({
      variantId: variant.id,
      optionValueId: val.optionValueId,
    }));

    await this.prisma.productVariantOptionValue.createMany({
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
    variant: ProductVariant
  ): Promise<ProductVariantResponseDTO> {
    const variantOptionValues =
      await this.prisma.productVariantOptionValue.findMany({
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
