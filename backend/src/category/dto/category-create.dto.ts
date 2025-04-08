export class CategoryCreateDTO {
  name: string;
  logo?: string;
  image?: string;
  parentId?: string;
  subCategories?: CategoryCreateDTO[];
}
