import { Brand } from './brandsService';
import api from './api';

export interface ProductImage {
  id: string;
  imageUrl: string;
  isThumbnail: boolean;
}

export interface Category {
  id: string;
  name: string;
  image?: string;
  parentId?: string;
}

export interface OptionValue {
  id: string;
  value: string;
  optionId: string;
}

export interface Option {
  id: string;
  name: string;
  values: OptionValue[];
}

export interface Variant {
  id: string;
  sku: string;
  price: number;
  compareAtPrice?: number;
  weight?: number;
  weightUnit?: 'GRAMS' | 'KILOS' | 'POUNDS' | 'OUNCES';
  dimensions?: string;
  description?: string;
  status: 'AVAILABLE' | 'OUT_OF_STOCK' | 'DISCONTINUED';
  images: ProductImage[];
  optionValues: {
    id: string;
    value: string;
    optionId: string;
    optionName: string;
  }[];
}

export interface Products {
  id: string;
  title: string;
  description?: string;
  rating?: number;
  category?: Category;
  brand?: Brand;
  images: ProductImage[];
  options: Option[];
  variants: Variant[];
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
  try {
    console.log('Fetching products with params:', { page, limit });
    const params: { page: number; limit: number } = { page, limit };
    const res = await api.get('/product', {
      params,
      timeout: 30000, // 30 seconds timeout
    });
    console.log('API Response:', res.data);
    return res.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const getProductsByCategory = async (
  categoryId: string,
  limit = 10,
  cursor?: string
): Promise<ProductsResponse> => {
  try {
    const params: { categoryId: string; limit: number; cursor?: string } = {
      categoryId,
      limit,
    };
    if (cursor) params.cursor = cursor;
    const res = await api.get(`/product/by-category`, {
      params,
      timeout: 30000,
    });
    return res.data;
  } catch (error) {
    console.error('Error fetching products by category:', error);
    throw error;
  }
};

export const searchProducts = async (
  keyword: string,
  limit = 10,
  cursor?: string
): Promise<ProductsResponse> => {
  try {
    const params: { keyword: string; limit: number; cursor?: string } = {
      keyword,
      limit,
    };
    if (cursor) params.cursor = cursor;
    const res = await api.get(`/product/search-by-name`, {
      params,
      timeout: 30000,
    });
    return res.data;
  } catch (error) {
    console.error('Error searching products:', error);
    throw error;
  }
};

export const getProductById = async (productId: string): Promise<Products> => {
  try {
    const res = await api.get(`/product/${productId}`, {
      timeout: 30000,
    });
    return res.data;
  } catch (error) {
    console.error('Error fetching product by ID:', error);
    throw error;
  }
};

export const getVariantById = async (variantId: string): Promise<Variant> => {
  try {
    const res = await api.get(`/product/variants/${variantId}`, {
      timeout: 30000,
    });
    return res.data;
  } catch (error) {
    console.error('Error fetching variant by ID:', error);
    throw error;
  }
};

export async function getBestDealProducts(
  limit = 10
): Promise<ProductsResponse> {
  try {
    const res = await api.get(`/product/best-deal`, {
      params: { limit },
      timeout: 30000,
    });
    return res.data;
  } catch (error) {
    console.error('Error fetching best deal products:', error);
    throw error;
  }
}
