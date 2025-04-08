import { ImageCreateDTO } from './image-create.dto';
import { OptionCreateDTO } from './option-create.dto';

export class ProductCreateDTO {
  title: string;
  rating: number;
  description: string;
  stock: number;
  categoryId: string;
  brandId: string;
  images?: ImageCreateDTO[];
  options: OptionCreateDTO[];
}
