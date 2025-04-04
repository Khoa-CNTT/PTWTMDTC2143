export interface Category {
  id: string;
  name: string;
  logo?: string;
  image?: string;
  parentId?: string;
  subCategories?: Category[];
}
