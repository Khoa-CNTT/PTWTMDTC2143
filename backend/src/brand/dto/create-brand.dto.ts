import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class CreateBrandDTO {
  @IsString({ message: 'Tên thương hiệu phải là chuỗi' })
  @IsNotEmpty({ message: 'Tên thương hiệu không được để trống' })
  name: string;

  @IsUrl({}, { message: 'Logo phải là một URL hợp lệ' })
  logo: string;
}
