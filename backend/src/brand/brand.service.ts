import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateBrandDTO } from './dto/create-brand.dto';
import { BrandResponseDTO } from './dto/brand-response.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateBrandDTO } from './dto/update-brand.dto';
import { Brand } from '@prisma/client';
import { ImageService } from 'src/image/image.service';

@Injectable()
export class BrandService {
  constructor(
    private prisma: PrismaService,
    private imageService: ImageService
  ) {}

  async createBrand(
    createBrandDTO: CreateBrandDTO,
    logoFile?: Express.Multer.File
  ): Promise<BrandResponseDTO> {
    await this.checkIfBrandExistsByName(createBrandDTO.name);

    let logoUrl: string | undefined;
    if (logoFile) {
      logoUrl = await this.imageService.uploadImage(logoFile, 'brands');
    }

    const brand = await this.prisma.brand.create({
      data: {
        name: createBrandDTO.name,
        logo: logoUrl,
      },
    });

    return this.toBrandResponseDTO(brand);
  }

  async updateBrand(
    id: string,
    updateBrandDTO: UpdateBrandDTO,
    logoFile?: Express.Multer.File
  ): Promise<BrandResponseDTO> {
    const existingBrand = await this.checkIfBrandExistsById(id);

    let logoUrl = existingBrand.logo;

    if (logoFile) {
      if (existingBrand.logo) {
        await this.imageService.deleteImageByUrl(existingBrand.logo);
      }
      logoUrl = await this.imageService.uploadImage(logoFile, 'brands');
    }

    const updatedBrand = await this.prisma.brand.update({
      where: { id },
      data: {
        ...updateBrandDTO,
        logo: logoUrl,
      },
    });

    return this.toBrandResponseDTO(updatedBrand);
  }

  async deleteBrand(id: string): Promise<void> {
    const existingBrand = await this.checkIfBrandExistsById(id);

    if (existingBrand.logo) {
      await this.imageService.deleteImageByUrl(existingBrand.logo);
    }

    await this.prisma.brand.delete({
      where: { id },
    });
  }
  async getAllBrands(): Promise<BrandResponseDTO[]> {
    const brands = await this.prisma.brand.findMany();
    return brands.map((brand) => this.toBrandResponseDTO(brand));
  }
  async getBrandById(id: string): Promise<BrandResponseDTO> {
    const brand = await this.checkIfBrandExistsById(id);
    return this.toBrandResponseDTO(brand);
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
