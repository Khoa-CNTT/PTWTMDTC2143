import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { BrandService } from './brand.service';
import { BrandResponseDTO } from './dto/brand-response.dto';
import { CreateBranDTO } from './dto/create-brand.dto';
import { UpdateBranDTO } from './dto/update-brand.dto';

@Controller('brand')
export class BrandController {
  constructor(private brandService: BrandService) {}
  @Post()
  async createBrand(
    @Body() createBrandDTO: CreateBranDTO
  ): Promise<BrandResponseDTO> {
    return this.brandService.createBrand(createBrandDTO);
  }

  @Put(':id')
  async updateBrand(
    @Param('id') id: string,
    @Body() updateBrandDTO: UpdateBranDTO
  ): Promise<BrandResponseDTO> {
    return this.brandService.updateBrand(id, updateBrandDTO);
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
