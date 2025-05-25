import { Brand } from './brandsService';
import api from './api';

export interface Variant {
  id: string;
  sku: string;
  price: number;
  discountedPrice?: number;
  compareAtPrice?: number;
  weight?: number;
  weightUnit?: string;
  dimensions?: string;
  description?: string;
  status?: string;
  images?: ProductImage[];
  optionValues?: {
    id: string;
    value: string;
    optionId: string;
    optionName: string;
    optionValueId?: string;
  }[];
}

export interface ProductImage {
  id: string;
  imageUrl: string;
  isThumbnail?: boolean;
}

export interface Category {
  id: string;
  name: string;
  image?: string;
  parentId?: string;
}

export interface Products {
  id: string;
  title: string;
  price: number;
  description?: string;
  rating?: number;
  category?: Category;
  brand?: Brand;
  images?: ProductImage[];
  options?: {
    id: string;
    name: string;
    values: {
      id: string;
      value: string;
    }[];
  }[];
  variants?: Variant[];
}

export interface ProductsResponse {
  products: Products[];
  total: number;
  totalPages: number;
  currentPage: number;
}

export const getAllProducts = async (
  page = 1,
  limit = 8
): Promise<ProductsResponse> => {
  const params: { page: number; limit: number } = { page, limit };
  const res = await api.get('/product', { params });
  return res.data;
};

export const getProductsByCategory = async (
  categoryId: string,
  limit = 10,
  cursor?: string
) => {
  const params: { categoryId: string; limit: number; cursor?: string } = {
    categoryId,
    limit,
  };
  if (cursor) params.cursor = cursor;
  const res = await api.get(`/product/by-category`, { params });
  return res.data;
};

export const searchProducts = async (
  keyword: string,
  limit = 10,
  cursor?: string
) => {
  const params: { keyword: string; limit: number; cursor?: string } = {
    keyword,
    limit,
  };
  if (cursor) params.cursor = cursor;
  const res = await api.get(`/product/search-by-name`, { params });
  return res.data;
};

export const getProductVariant = async (variantId: string) => {
  const res = await api.get(`/product/variants/${variantId}`);
  return res.data;
};

export const getAllVariants = async (limit = 50, cursor?: string) => {
  const params: { limit: number; cursor?: string } = { limit };
  if (cursor) params.cursor = cursor;
  const res = await api.get(`/product/variants`, { params });
  return res.data;
};

export const getProductById = async (productId: string): Promise<Products> => {
  const res = await api.get(`/product/${productId}`);
  return res.data;
};

export const getBestDealProducts = async (limit = 10) => {
  const res = await api.get('/product/best-deal', { params: { limit } });
  return res.data;
};
