import {
  IsString,
  IsArray,
  IsOptional,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { Type, Transform } from 'class-transformer';
import { OptionCreateDTO } from './option-create.dto';

export class ProductCreateDTO {
  @IsString()
  title: string;

  // @IsNumber()
  // @Min(0)
  // @Max(5)
  // rating: number;

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
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      try {
        const parsed: unknown = JSON.parse(value);
        if (Array.isArray(parsed)) return parsed as OptionCreateDTO[];
        return [];
      } catch {
        return [];
      }
    }
    return Array.isArray(value) ? (value as OptionCreateDTO[]) : [];
  })
  options: OptionCreateDTO[];
}
