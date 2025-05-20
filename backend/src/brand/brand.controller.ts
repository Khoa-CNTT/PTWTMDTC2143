import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { BrandService } from './brand.service';
import { BrandResponseDTO } from './dto/brand-response.dto';
import { CreateBrandDTO } from './dto/create-brand.dto';
import { UpdateBrandDTO } from './dto/update-brand.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('brands')
export class BrandController {
  constructor(private brandService: BrandService) {}
  @Post()
  @UseInterceptors(FileInterceptor('logo'))
  async createBrand(
    @Body() createBrandDTO: CreateBrandDTO,
    @UploadedFile() logoFile?: Express.Multer.File
  ): Promise<BrandResponseDTO> {
    return this.brandService.createBrand(createBrandDTO, logoFile);
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('logo'))
  async updateBrand(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateBrandDTO: UpdateBrandDTO,
    @UploadedFile() logoFile?: Express.Multer.File
  ): Promise<BrandResponseDTO> {
    return this.brandService.updateBrand(id, updateBrandDTO, logoFile);
  }

  @Get()
  async getAllBrands(): Promise<BrandResponseDTO[]> {
    return this.brandService.getAllBrands();
  }

  @Get(':id')
  async getBrandById(@Param('id') id: string): Promise<BrandResponseDTO> {
    return this.brandService.getBrandById(id);
  }

  @Get('name/:name')
  async getBrandByName(@Param('name') name: string): Promise<BrandResponseDTO> {
    return this.brandService.getBrandByName(name);
  }

  @Delete(':id')
  async deleteBrand(@Param('id') id: string): Promise<{ message: string }> {
    await this.brandService.deleteBrand(id);
    return { message: 'Brand deleted successfully' };
  }
}
