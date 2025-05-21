import axiosInstance from './axios.config';
import { Product } from './productService';

export interface Variant {
  id: string;
  sku: string;
  price: number;
  compareAtPrice?: number;
  weight?: number;
  weightUnit?: string;
  dismensions?: string;
  description?: string;
  optionValues?: string[];
  product: Product;
  productId: string;

  status: string;
  inventory?: string[];
  cartItem?: string[];
  orderItem?: string[];
  wishlistItem?: string[];
  images?: { id: string; imageUrl: string }[];
}

export interface VariantResponse {
  variants: Variant[];
  total: number;
  page: number;
  totalPages: number;
}

export interface VariantCreateDTO {
  productId: string;
  price: number;
  compareAtPrice?: number;
  status: string;
  attributes: {
    attribute: string;
    value: string;
  }[];
  images?: File[];
}

export interface VariantUpdateDTO {
  price?: number;
  compareAtPrice?: number;
  status?: string;
  attributes?: {
    attribute: string;
    value: string;
  }[];
  images?: File[];
  oldImages?: string[];
  replaceIds?: string[];
}

class VariantService {
  async getVariantsByProduct(
    productId: string,
    page: number = 1,
    pageSize: number = 10
  ): Promise<VariantResponse> {
    const response = await axiosInstance.get(`/product/${productId}/variants`, {
      params: { page, pageSize },
    });
    return response.data;
  }

  async getVariantById(id: string): Promise<Variant> {
    const response = await axiosInstance.get(`/product/variants/${id}`);
    return response.data;
  }

  async createVariant(productId: string, formData: FormData): Promise<Variant> {
    const response = await axiosInstance.post(
      `/product/${productId}/variants`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data;
  }

  async updateVariant(id: string, formData: FormData): Promise<Variant> {
    const response = await axiosInstance.put(
      `/product/${id}/variants`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data;
  }

  async deleteVariant(id: string): Promise<void> {
    await axiosInstance.delete(`/product/variants/${id}`);
  }

  async getAllVariants(
    page: number = 1,
    pageSize: number = 10
  ): Promise<VariantResponse> {
    try {
      const response = await axiosInstance.get('/product/variants', {
        params: { page, pageSize },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching variants:', error);
      throw error;
    }
  }
}

export const variantService = new VariantService();
