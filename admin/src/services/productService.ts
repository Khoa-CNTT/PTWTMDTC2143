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

export interface ProductImage {
  id: string;
  imageUrl: string;
  isThumbnail?: boolean;
}
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
  variants: Variant[];
  images?: { id: string; imageUrl: string }[];
  rating?: number;
}

export interface ProductListResponse {
  products: Product[];
  total: number;
  page: number;
  totalPages: number;
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

export interface VariantCreateDTO {
  productId: string;
  price: number;
  compareAtPrice?: number;
  weight?: number;
  weightUnit?: string;
  dimensions?: string;
  description?: string;
  status: string;
  attributes: { attribute: string; value: string }[];
  images: string[];
}

// class ProductService {
//   async getAllProducts(
//     page: number = 1,
//     pageSize: number = 10
//   ): Promise<ProductResponse> {
//     const response = await axiosInstance.get('/product', {
//       params: { page, pageSize },
//     });
//     return response.data;
//   }

//   async getProductById(id: string): Promise<Product> {
//     const response = await axiosInstance.get(`/product/${id}`);
//     return response.data;
//   }

//   async createProduct(formData: FormData): Promise<Product> {
//     const response = await axiosInstance.post('/product/create', formData, {
//       headers: {
//         'Content-Type': 'multipart/form-data',
//       },
//     });
//     return response.data;
//   }

//   async updateProduct(id: string, formData: FormData): Promise<Product> {
//     const response = await axiosInstance.put(`/product/${id}`, formData, {
//       headers: {
//         'Content-Type': 'multipart/form-data',
//       },
//     });
//     return response.data;
//   }

//   async createVariant(
//     productId: string,
//     formData: FormData
//   ): Promise<VariantResponse> {
//     const response = await axiosInstance.post(
//       `/product/${productId}/variants`,
//       formData,
//       {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       }
//     );
//     return response.data;
//   }

//   async updateVariant(
//     variantId: string,
//     formData: FormData
//   ): Promise<VariantResponse> {
//     const response = await axiosInstance.put(
//       `/product/${variantId}/variants`,
//       formData,
//       {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       }
//     );
//     return response.data;
//   }

//   async searchProducts(
//     keyword: string,
//     limit: number = 10,
//     cursor?: string
//   ): Promise<ProductResponse> {
//     const response = await axiosInstance.get('/product/search', {
//       params: { keyword, limit, cursor },
//     });
//     return response.data;
//   }

//   async getProductsByCategory(
//     categoryId: string,
//     limit: number = 10,
//     cursor?: string
//   ): Promise<ProductResponse> {
//     const response = await axiosInstance.get('/product/by-category', {
//       params: { categoryId, limit, cursor },
//     });
//     return response.data;
//   }
// }
export const productService = {
  getAllProducts: async (
    page = 1,
    limit = 10
  ): Promise<ProductListResponse> => {
    const response = await axiosInstance.get(`/product`, {
      params: {
        page,
        limit,
        include: 'variants',
      },
    });
    return response.data;
  },

  getProductById: async (id: string): Promise<Product> => {
    const response = await axiosInstance.get(`/product/${id}`, {
      params: {
        include: 'variants',
      },
    });
    return response.data;
  },

  createProduct: async (formData: FormData): Promise<Product> => {
    const response = await axiosInstance.post('/product/create', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  updateProduct: async (id: string, formData: FormData): Promise<Product> => {
    const response = await axiosInstance.put(`/product/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  deleteProduct: async (id: string): Promise<void> => {
    await axiosInstance.delete(`/product/${id}`);
  },

  searchProducts: async (
    keyword: string,
    page: number = 1,
    pageSize: number = 10
  ): Promise<ProductListResponse> => {
    const response = await axiosInstance.get('/product/search', {
      params: {
        keyword,
        page,
        pageSize,
        include: 'variants',
      },
    });
    return response.data;
  },

  getProductsByCategory: async (
    categoryId: string,
    page: number = 1,
    pageSize: number = 10
  ): Promise<ProductListResponse> => {
    const response = await axiosInstance.get('/product/by-category', {
      params: {
        categoryId,
        page,
        pageSize,
        include: 'variants',
      },
    });
    return response.data;
  },

  createVariant: async (formData: FormData): Promise<VariantResponse> => {
    const response = await axiosInstance.post(
      `/product/${formData.get('productId')}/variants`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data;
  },
};

// export const productService = new ProductService();
