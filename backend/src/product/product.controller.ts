import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { ProductCreateDTO } from './dto/product-create.dto';
import { ProductService } from './product.service';
import { VariantResponseDTO } from './dto/variant-response.dto';
import { VariantCreateDTO } from './dto/variant-create.dto';
import { ProductUpdateDTO } from './dto/product-update.dto';
import { VariantUpdateDTO } from './dto/variant-update.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { OptionCreateDTO } from './dto/option-create.dto';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Post('create')
  @UseInterceptors(FilesInterceptor('images', 10))
  async createProduct(
    @Body() productCreateDTO: ProductCreateDTO,
    @UploadedFiles() images: Express.Multer.File[]
  ) {
    if (images && images.length) {
      productCreateDTO.images = images;
    }
    if (typeof productCreateDTO.options === 'string') {
      productCreateDTO.options = JSON.parse(
        productCreateDTO.options
      ) as OptionCreateDTO[];
    }

    return this.productService.createProduct(productCreateDTO);
  }

  @Post(':productId/variants')
  async createVariant(
    @Param('productId') productId: string,
    @Body() variantCreateDTO: VariantCreateDTO
  ): Promise<VariantResponseDTO> {
    return this.productService.createVariant(productId, variantCreateDTO);
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
    return this.productService.updateVariant(variantId, variantUpdateDTO);
  }

  @Get('by-category')
  async getProductsByCategory(
    @Query('categoryId') categoryId: string,
    @Query('limit') limit = 10,
    @Query('cursor') cursor?: string
  ) {
    return this.productService.getProductsByCategory(
      categoryId,
      +limit,
      cursor
    );
  }

  @Get('variants/:variantId')
  async getProductVariant(
    @Param('variantId', ParseUUIDPipe) variantId: string
  ): Promise<VariantResponseDTO> {
    return this.productService.getProductVariant(variantId);
  }

  @Get('search')
  async searchProducts(
    @Query('keyword') keyword: string,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('cursor') cursor?: string
  ) {
    return this.productService.searchProductsByName(keyword, limit, cursor);
  }
}
