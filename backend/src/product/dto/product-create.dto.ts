import {
  IsString,
  IsNumber,
  IsArray,
  IsOptional,
  IsUUID,
  ValidateNested,
  Min,
  Max,
} from 'class-validator';
import { Type } from 'class-transformer';
import { OptionCreateDTO } from './option-create.dto';

export class ProductCreateDTO {
  @IsString()
  title: string;

  @IsNumber()
  @Min(0)
  @Max(5)
  rating: number;

  @IsString()
  description: string;

  @IsUUID()
  categoryId: string;

  @IsUUID()
  brandId: string;

  @IsOptional()
  @IsArray()
  images?: Express.Multer.File[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OptionCreateDTO)
  options: OptionCreateDTO[];
}
