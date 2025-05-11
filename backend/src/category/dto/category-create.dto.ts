export class CategoryCreateDTO {
  name: string;
  image?: string;
  parentId?: string;
  subCategories?: CategoryCreateDTO[];
}
