import {
  IsOptional,
  IsString,
  IsNumber,
  IsBoolean,
  IsArray,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { OptionCreateDTO } from './option-create.dto';

export class ProductImageUpdateInput {
  @IsOptional()
  @IsUUID()
  id?: string;

  @IsOptional()
  @IsString()
  imageUrl?: string;

  @IsOptional()
  @IsBoolean()
  isThumbnail?: boolean;

  @IsOptional()
  file?: Express.Multer.File;
}

export class ProductUpdateDTO {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsNumber()
  price?: number;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsUUID()
  categoryId?: string;

  @IsOptional()
  @IsUUID()
  brandId?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductImageUpdateInput)
  images?: ProductImageUpdateInput[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OptionCreateDTO)
  options?: OptionCreateDTO[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductImageUpdateInput)
  oldImages?: ProductImageUpdateInput[];

  @IsOptional()
  @IsArray()
  newImages?: Express.Multer.File[];

  @IsOptional()
  @IsArray()
  @IsUUID('4', { each: true })
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
  oldImages?: string;
  replaceIds?: string;
}
