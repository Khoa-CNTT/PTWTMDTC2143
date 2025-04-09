import { IsString, IsInt, Min } from 'class-validator';

export class UpdateCartItemQuantityDTO {
  @IsString()
  cartItemId: string;

  @IsInt()
  @Min(1)
  quantity: number;
}
