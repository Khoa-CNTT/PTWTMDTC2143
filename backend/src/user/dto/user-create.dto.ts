import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
  Matches,
} from 'class-validator';

export class UserCreateDTO {
  @IsEmail({}, { message: 'Email không hợp lệ' })
  email: string;

  @IsString()
  @MinLength(6, { message: 'Mật khẩu phải có ít nhất 6 ký tự' })
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]+$/, {
    message: 'Mật khẩu phải chứa ít nhất 1 chữ cái và 1 số',
  })
  password: string;

  @IsString()
  @IsNotEmpty({ message: 'Tên không được để trống' })
  name: string;

  @IsOptional()
  @Matches(/^[0-9]{10,15}$/, {
    message: 'Số điện thoại phải có từ 10 đến 15 chữ số',
  })
  phone?: string;
}
