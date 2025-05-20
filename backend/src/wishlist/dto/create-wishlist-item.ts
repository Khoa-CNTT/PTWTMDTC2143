import { IsUUID } from 'class-validator';

export class CreateWishlistItemDTO {
  @IsUUID()
  variantId: string;
}
