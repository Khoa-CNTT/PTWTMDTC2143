import { IsString, IsBoolean } from 'class-validator';

export class SelectCartItemDTO {
  @IsString()
  cartItemId: string;

  @IsBoolean()
  isSelected: boolean;
}
