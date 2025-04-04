export class CategoryResponseDto {
  id: string;
  name: string;
  logo?: string;
  image?: string;
  parentId?: string;
  subCategories?: CategoryResponseDto[];
}
