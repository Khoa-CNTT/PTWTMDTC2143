import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CategoryResponseDto } from './dto/category-response.dto';
import { CategoryService } from './category.service';
import { CategoryCreateDTO } from './dto/category-create.dto';
import { CategoryUpdateDTO } from './dto/category-update.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}
  @Post()
  async create(
    @Body() categoryCreateDTO: CategoryCreateDTO
  ): Promise<CategoryResponseDto> {
    return this.categoryService.createCategory(categoryCreateDTO);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() categoryUpdateDTO: CategoryUpdateDTO
  ): Promise<CategoryResponseDto> {
    return this.categoryService.updateCategory(id, categoryUpdateDTO);
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
