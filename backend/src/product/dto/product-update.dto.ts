import { OptionCreateDTO } from './option-create.dto';

type ProductImageUpdateInput = {
  id?: string;
  imageUrl?: string;
  isThumbnail?: boolean;
  file?: Express.Multer.File;
};

export class ProductUpdateDTO {
  title?: string;
  price?: number;
  description?: string;
  categoryId?: string;
  brandId?: string;
  images?: ProductImageUpdateInput[];
  options?: OptionCreateDTO[];
  oldImages?: ProductImageUpdateInput[];
  newImages?: Express.Multer.File[];
  replaceIds?: string[];
}

export interface RawProductUpdateBody {
  title?: string;
  price?: number;
  description?: string;
  categoryId?: string;
  brandId?: string;
  options?: OptionCreateDTO[];
  images?: ProductImageUpdateInput[];
  oldImages?: string; // JSON string
  replaceIds?: string; // JSON string
}
