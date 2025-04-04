import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CategoryResponseDto } from './dto/category-response.dto';
import { CategoryService } from './category.service';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}
  @Post()
  async create(
    @Body() createCategoryDto: CreateCategoryDto
  ): Promise<CategoryResponseDto> {
    return this.categoryService.createCategory(createCategoryDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto
  ): Promise<CategoryResponseDto> {
    return this.categoryService.updateCategory(id, updateCategoryDto);
  }

  @Get()
  async findAll(): Promise<CategoryResponseDto[]> {
    return this.categoryService.findAll();
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
