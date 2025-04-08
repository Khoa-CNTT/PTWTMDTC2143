import { Body, Controller, Param, Post } from '@nestjs/common';
import { ProductCreateDTO } from './dto/product-create.dto';
import { ProductResponseDTO } from './dto/product-response.dto';
import { ProductService } from './product.service';
import { VariantResponseDTO } from './dto/variant-response.dto';
import { VariantCreateDTO } from './dto/variant-create.dto';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Post()
  async create(
    @Body() productCreateDTO: ProductCreateDTO
  ): Promise<ProductResponseDTO> {
    return this.productService.createProduct(productCreateDTO);
  }

  @Post(':productId/variants')
  async createVariant(
    @Param('productId') productId: string,
    @Body() variantCreateDTO: VariantCreateDTO
  ): Promise<VariantResponseDTO> {
    return this.productService.createProductVariant(
      productId,
      variantCreateDTO
    );
  }
}
