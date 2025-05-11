import { OptionCreateDTO } from './option-create.dto';

export class ProductCreateDTO {
  title: string;
  rating: number;
  description: string;
  stock: number;
  categoryId: string;
  brandId: string;
  images?: Express.Multer.File[];
  options: OptionCreateDTO[];
}
