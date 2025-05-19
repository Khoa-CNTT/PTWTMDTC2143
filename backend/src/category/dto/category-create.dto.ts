import { IsString, IsOptional, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class CategoryCreateDTO {
  @IsString({ message: 'Tên danh mục phải là chuỗi' })
  name: string;

  @IsOptional()
  @IsString({ message: 'Ảnh phải là chuỗi (URL hoặc tên file)' })
  image?: string;

  @IsOptional()
  @IsString({ message: 'parentId phải là chuỗi (UUID)' })
  parentId?: string;

  @IsOptional()
  @IsArray({ message: 'subCategories phải là một mảng' })
  @ValidateNested({ each: true })
  @Type(() => CategoryCreateDTO)
  subCategories?: CategoryCreateDTO[];
}
