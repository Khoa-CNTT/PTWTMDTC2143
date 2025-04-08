import {
  Body,
  Controller,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ProductCreateDTO } from './dto/product-create.dto';
import { ProductResponseDTO } from './dto/product-response.dto';
import { ProductService } from './product.service';
import { VariantResponseDTO } from './dto/variant-response.dto';
import { VariantCreateDTO } from './dto/variant-create.dto';
import { ProductUpdateDTO } from './dto/product-update.dto';
import { VariantUpdateDTO } from './dto/variant-update.dto';

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

  @Put(':productId')
  async updateProduct(
    @Param('productId', ParseUUIDPipe) productId: string,
    @Body() productUpdateDTO: ProductUpdateDTO
  ) {
    return this.productService.updateProduct(productId, productUpdateDTO);
  }

  @Put('variants/:variantId')
  async updateVariant(
    @Param('variantId', ParseUUIDPipe) variantId: string,
    @Body() variantUpdateDTO: VariantUpdateDTO
  ) {
    return this.productService.updateVarriant(variantId, variantUpdateDTO);
  }
}
