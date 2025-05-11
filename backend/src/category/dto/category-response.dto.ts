export class CategoryResponseDto {
  id: string;
  name: string;
  image?: string;
  parentId?: string;
  subCategories?: CategoryResponseDto[];
}
