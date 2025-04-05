import { CreateImageDTO } from './create-image.dto';
import { CreateOptionDTO } from './create-option.dto';

export class CreateProductDTO {
  title: string;
  rating: number;
  description: string;
  stock: number;
  categoryId: string;
  brandId: string;
  images?: CreateImageDTO[];
  options: CreateOptionDTO[];
}
