export class CreateCategoryDto {
  name: string;
  logo?: string;
  image?: string;
  parentId?: string;
  subCategories?: CreateCategoryDto[];
}
