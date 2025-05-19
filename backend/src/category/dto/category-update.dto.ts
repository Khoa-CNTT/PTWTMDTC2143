import { IsOptional, IsString, IsUUID } from 'class-validator';

export class CategoryUpdateDTO {
  @IsOptional()
  @IsString({ message: 'Tên danh mục phải là chuỗi' })
  name?: string;

  @IsOptional()
  @IsString({ message: 'Ảnh phải là chuỗi' })
  image?: string;

  @IsOptional()
  @IsUUID('4', { message: 'parentId phải là UUID version 4' })
  parentId?: string;
}
