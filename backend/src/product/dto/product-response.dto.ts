import { CategoryResponseDto } from 'src/category/dto/category-response.dto';
import { OptionResponseDTO } from './option-response.dto';
import { BrandResponseDTO } from 'src/brand/dto/brand-response.dto';
import { ImageResponseDTO } from './image-response.dto';

export class ProductResponseDTO {
  id: string;
  title: string;
  price: number;
  description: string;
  rating: number;
  category: CategoryResponseDto;
  brand: BrandResponseDTO;
  images: ImageResponseDTO[];
  options: OptionResponseDTO[];
}
