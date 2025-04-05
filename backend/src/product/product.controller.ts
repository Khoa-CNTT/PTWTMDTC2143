import { Body, Controller, Param, Post } from '@nestjs/common';
import { CreateProductDTO } from './dto/create-product.dto';
import { ProductResponseDTO } from './dto/product-response.dto';
import { ProductService } from './product.service';
import { CreateProductVariantDto } from './dto/create-product-variant.dto';
import { ProductVariantResponseDTO } from './dto/product-variant-response.dto';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Post()
  async create(
    @Body() createProductDTO: CreateProductDTO
  ): Promise<ProductResponseDTO> {
    return this.productService.createProduct(createProductDTO);
  }

  @Post(':productId/variants')
  async createVariant(
    @Param('productId') productId: string,
    @Body() createProductVariantDTO: CreateProductVariantDto
  ): Promise<ProductVariantResponseDTO> {
    return this.productService.createProductVariant(
      productId,
      createProductVariantDTO
    );
  }
}
