import { Brand, Category, Image, Option } from '@prisma/client';

export interface Product {
  id: string;
  title: string;
  price?: number;
  description?: string;
  rating?: number;
  category?: Category;
  categoryId?: string;
  brand?: Brand;
  brandId?: string;
  images: Image[];
  options: Option[];
}
