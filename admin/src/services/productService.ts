import axiosInstance from './axios.config';

export interface ProductCreateDTO {
  title: string;
  description: string;
  categoryId: string;
  brandId: string;
  images?: File[];
  options: {
    name: string;
    values: string[];
  }[];
}

export interface Product {
  id: string;
  title: string;
  description?: string;
  category?: {
    id: string;
    name: string;
    image?: string;
  };
  brand?: {
    id: string;
    name: string;
    logo?: string;
  };
  variants?: {
    id: string;
    price: number;
    status: string;
    images?: { id: string; imageUrl: string }[];
  }[];
  images?: { id: string; imageUrl: string }[];
  rating?: number;
}

export interface ProductListResponse {
  products: Product[];
  total: number;
  hasMore: boolean;
  nextCursor: string | null;
}

export interface ProductResponse {
  products: Product[];
  total: number;
  page: number;
  totalPages: number;
}

export interface VariantResponse {
  id: string;
  price: number;
  status: string;
  images?: { id: string; imageUrl: string }[];
  options: {
    name: string;
    value: string;
  }[];
}

class ProductService {
  async getAllProducts(
    page: number = 1,
    pageSize: number = 10
  ): Promise<ProductResponse> {
    const response = await axiosInstance.get('/product', {
      params: { page, pageSize },
    });
    return response.data;
  }

  async getProductById(id: string): Promise<Product> {
    const response = await axiosInstance.get(`/product/${id}`);
    return response.data;
  }

  async createProduct(formData: FormData): Promise<Product> {
    const response = await axiosInstance.post('/product/create', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }

  async updateProduct(id: string, formData: FormData): Promise<Product> {
    const response = await axiosInstance.put(`/product/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }

  async createVariant(
    productId: string,
    formData: FormData
  ): Promise<VariantResponse> {
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

  async updateVariant(
    variantId: string,
    formData: FormData
  ): Promise<VariantResponse> {
    const response = await axiosInstance.put(
      `/product/${variantId}/variants`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data;
  }

  async searchProducts(
    keyword: string,
    limit: number = 10,
    cursor?: string
  ): Promise<ProductResponse> {
    const response = await axiosInstance.get('/product/search', {
      params: { keyword, limit, cursor },
    });
    return response.data;
  }

  async getProductsByCategory(
    categoryId: string,
    limit: number = 10,
    cursor?: string
  ): Promise<ProductResponse> {
    const response = await axiosInstance.get('/product/by-category', {
      params: { categoryId, limit, cursor },
    });
    return response.data;
  }
}

export const productService = new ProductService();
