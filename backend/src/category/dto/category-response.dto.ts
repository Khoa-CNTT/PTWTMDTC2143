import { ProductResponseDTO } from '../../product/dto/product-response.dto';

export class CategoryResponseDto {
  id: string;
  name: string;
  image?: string;
  parentId?: string;
  subCategories?: CategoryResponseDto[];
}

export class CategoryParentResponseDto {
  id: string;
  name: string;
  image?: string;
  parentId?: string;
  subCategories?: CategoryResponseDto[];
  allProducts?: ProductResponseDTO[];
}
