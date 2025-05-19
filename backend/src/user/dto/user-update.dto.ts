import { IsOptional, IsString, Matches } from 'class-validator';

export class UserUpdateDTO {
  @IsOptional()
  @IsString({ message: 'Tên phải là chuỗi ký tự' })
  name?: string;

  @IsOptional()
  @Matches(/^[0-9]{10,15}$/, {
    message: 'Số điện thoại phải có từ 10 đến 15 chữ số',
  })
  phone?: string;
}
