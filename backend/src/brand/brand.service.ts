import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateBranDTO } from './dto/create-brand.dto';
import { BrandResponseDTO } from './dto/brand-response.dto';
import { Brand } from './interfaces/brand.interface';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateBranDTO } from './dto/update-brand.dto';

@Injectable()
export class BrandService {
  constructor(private prisma: PrismaService) {}
  async createBrand(createBrandDTO: CreateBranDTO): Promise<BrandResponseDTO> {
    await this.checkIfBrandExistsByName(createBrandDTO.name);
    const brand = await this.prisma.brand.create({
      data: {
        name: createBrandDTO.name,
        logo: createBrandDTO.logo,
      },
    });
    return this.toBrandResponseDTO(brand);
  }

  async getAllBrands(): Promise<BrandResponseDTO[]> {
    const brands = await this.prisma.brand.findMany();
    return brands.map((brand) => this.toBrandResponseDTO(brand));
  }
  async getBrandById(id: string): Promise<BrandResponseDTO> {
    const brand = await this.checkIfBrandExistsById(id);
    return this.toBrandResponseDTO(brand);
  }

  async updateBrand(
    id: string,
    updateBrandDTO: UpdateBranDTO
  ): Promise<BrandResponseDTO> {
    await this.checkIfBrandExistsById(id);
    const updatedBrand = await this.prisma.brand.update({
      where: { id },
      data: updateBrandDTO,
    });
    return this.toBrandResponseDTO(updatedBrand);
  }

  async deleteBrand(id: string): Promise<void> {
    await this.checkIfBrandExistsById(id);
    await this.prisma.brand.delete({
      where: { id },
    });
  }

  async getBrandByName(name: string): Promise<BrandResponseDTO> {
    const brand = await this.prisma.brand.findFirst({
      where: { name },
    });
    if (!brand) {
      throw new NotFoundException('Brand not found');
    }
    return this.toBrandResponseDTO(brand);
  }

  private async checkIfBrandExistsById(id: string) {
    const brand = await this.prisma.brand.findUnique({
      where: { id },
    });

    if (!brand) {
      throw new NotFoundException('Brand not found');
    }

    return brand;
  }

  private async checkIfBrandExistsByName(name: string) {
    const existingBrand = await this.prisma.brand.findFirst({
      where: { name },
    });

    if (existingBrand) {
      throw new ConflictException('Brand with this name already exists');
    }
  }

  private toBrandResponseDTO(brand: Brand): BrandResponseDTO {
    return {
      id: brand.id,
      name: brand.name,
      logo: brand.logo,
    };
  }
}
