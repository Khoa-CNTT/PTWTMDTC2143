import { ImageCreateDTO } from './image-create.dto';
import { OptionCreateDTO } from './option-create.dto';

export class ProductUpdateDTO {
  title?: string;
  price?: number;
  description?: string;
  categoryId?: string;
  brandId?: string;
  images?: ImageCreateDTO[];
  options: OptionCreateDTO[];
}
