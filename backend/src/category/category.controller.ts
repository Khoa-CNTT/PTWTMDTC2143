import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CategoryResponseDto } from './dto/category-response.dto';
import { CategoryService } from './category.service';
import { CategoryCreateDTO } from './dto/category-create.dto';
import { CategoryUpdateDTO } from './dto/category-update.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() categoryCreateDTO: CategoryCreateDTO
  ): Promise<CategoryResponseDto> {
    console.log('File:', file);
    return this.categoryService.createCategory(categoryCreateDTO, file);
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('image'))
  async update(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() categoryUpdateDTO: CategoryUpdateDTO
  ): Promise<CategoryResponseDto> {
    return this.categoryService.updateCategory(id, categoryUpdateDTO, file);
  }

  @Get()
  async findAll(
    @Query('limit') limit: string = '10',
    @Query('cursor') cursor?: string
  ): Promise<{ data: CategoryResponseDto[]; nextCursor: string | null }> {
    return this.categoryService.findAll(limit, cursor);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<{ message: string }> {
    await this.categoryService.remove(id);
    return { message: 'Category deleted successfully' };
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<CategoryResponseDto> {
    return this.categoryService.findOne(id);
  }

  @Get('subcategories/:id')
  async findSubCategories(
    @Param('id') id: string
  ): Promise<CategoryResponseDto[]> {
    return this.categoryService.findSubCategories(id);
  }

  @Get('parent/:id')
  async findParentCategory(
    @Param('id') id: string
  ): Promise<CategoryResponseDto> {
    return this.categoryService.findParentCategory(id);
  }
}
