import { IsOptional, IsString, IsUrl } from 'class-validator';

export class UpdateBrandDTO {
  @IsOptional()
  @IsString({ message: 'Tên thương hiệu phải là chuỗi' })
  name?: string;

  @IsOptional()
  @IsUrl({}, { message: 'Logo phải là một URL hợp lệ' })
  logo?: string;
}
