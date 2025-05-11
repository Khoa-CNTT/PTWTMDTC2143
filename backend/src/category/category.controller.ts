import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
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
  @UseInterceptors(FileInterceptor('image')) // Thêm interceptor để xử lý ảnh
  async update(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File, // Lấy file ảnh từ request
    @Body() categoryUpdateDTO: CategoryUpdateDTO
  ): Promise<CategoryResponseDto> {
    return this.categoryService.updateCategory(id, categoryUpdateDTO, file); // Truyền file vào service
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
