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
import {
  ProductUpdateDTO,
  RawProductUpdateBody,
} from './dto/product-update.dto';
import { VariantUpdateDTO } from './dto/variant-update.dto';
import {
  FileFieldsInterceptor,
  FilesInterceptor,
} from '@nestjs/platform-express';
import { OptionCreateDTO } from './dto/option-create.dto';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get()
  async getAllProducts(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(8), ParseIntPipe) limit: number
  ) {
    return this.productService.getAllProducts(page, limit);
  }

  @Post('create')
  @UseInterceptors(FilesInterceptor('images', 10))
  async createProduct(
    @Body() productCreateDTO: ProductCreateDTO,
    @UploadedFiles() images: Express.Multer.File[]
  ) {
    console.log('Raw DTO:', productCreateDTO);
    console.log('Raw options:', productCreateDTO.options);

    // Handle images
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

  @Put(':productId')
  @UseInterceptors(FileFieldsInterceptor([{ name: 'newImages', maxCount: 10 }]))
  async updateProduct(
    @Param('productId', ParseUUIDPipe) productId: string,
    @UploadedFiles()
    files: { newImages?: Express.Multer.File[] },
    @Body() body: RawProductUpdateBody
  ) {
    const dto: ProductUpdateDTO = {
      ...body,
      oldImages: body.oldImages ? JSON.parse(body.oldImages) : [],
      replaceIds: body.replaceIds ? JSON.parse(body.replaceIds) : [],
      newImages: files?.newImages || [],
    };

    return this.productService.updateProduct(productId, dto);
  }

  @UseInterceptors(FileFieldsInterceptor([{ name: 'images', maxCount: 10 }]))
  @Post(':productId/variants')
  async createVariant(
    @Param('productId', ParseUUIDPipe) productId: string,
    @Body() dto: VariantCreateDTO,
    @UploadedFiles() files: { images?: Express.Multer.File[] }
  ) {
    dto.images = files.images || [];
    return this.productService.createVariant(productId, dto);
  }

  @Put(':variantId/variants')
  @UseInterceptors(FileFieldsInterceptor([{ name: 'newImages', maxCount: 10 }]))
  async updateVariant(
    @Param('variantId', ParseUUIDPipe) variantId: string,
    @Body() body: Omit<VariantUpdateDTO, 'newImages'>,
    @UploadedFiles()
    files: { newImages?: Express.Multer.File[] }
  ): Promise<VariantResponseDTO> {
    const parsedReplaceIds = Array.isArray(body.replaceIds)
      ? body.replaceIds
      : typeof body.replaceIds === 'string'
        ? JSON.parse(body.replaceIds)
        : [];

    const parsedOptionValues =
      typeof body.optionValues === 'string'
        ? JSON.parse(body.optionValues)
        : body.optionValues;

    const dto: VariantUpdateDTO = {
      ...body,
      newImages: files?.newImages || [],
      replaceIds: parsedReplaceIds,
      optionValues: parsedOptionValues,
    };

    return this.productService.updateVariant(variantId, dto);
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
  @Get('best-deal')
  async getBestDealProducts(
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number
  ) {
    return this.productService.getBestDealProducts(limit);
  }

  @Get('variants/:variantId')
  async getProductVariant(
    @Param('variantId', ParseUUIDPipe) variantId: string
  ): Promise<VariantResponseDTO> {
    return this.productService.getProductVariant(variantId);
  }

  @Get('search-by-name')
  async searchProducts(
    @Query('keyword') keyword: string,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('cursor') cursor?: string
  ) {
    return this.productService.searchProductsByName(keyword, limit, cursor);
  }
  @Get(':id')
  async getProductById(@Param('id', ParseUUIDPipe) id: string) {
    return this.productService.getProductById(id);
  }

  @Get('variants')
  async getAllVariants(
    @Query('limit', new DefaultValuePipe(50), ParseIntPipe) limit: number = 50,
    @Query('cursor') cursor?: string
  ) {
    return this.productService.getAllVariants(limit, cursor);
  }
}
