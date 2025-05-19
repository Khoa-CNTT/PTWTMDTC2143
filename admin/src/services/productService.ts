import axios from 'axios';

const API_URL = 'http://localhost:3000';

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
  description: string;
  rating: number;
  category: {
    id: string;
    name: string;
    image: string;
  };
  brand: {
    id: string;
    name: string;
    logo: string;
  };
  images: {
    id: string;
    imageUrl: string;
    isThumbnail: boolean;
  }[];
  variants: {
    id: string;
    price: number;
    status: string;
    images: {
      id: string;
      imageUrl: string;
      isThumbnail: boolean;
    }[];
  }[];
}

export interface ProductListResponse {
  products: Product[];
  total: number;
  hasMore: boolean;
  nextCursor: string | null;
}

export const productService = {
  createProduct: async (productData: ProductCreateDTO) => {
    const formData = new FormData();

    // Append basic product data
    formData.append('title', productData.title);
    formData.append('description', productData.description);
    formData.append('categoryId', productData.categoryId);
    formData.append('brandId', productData.brandId);

    // Append options as JSON string
    formData.append('options', JSON.stringify(productData.options));

    // Append images if they exist
    if (productData.images && productData.images.length > 0) {
      productData.images.forEach((image) => {
        formData.append('images', image);
      });
    }

    const response = await axios.post(`${API_URL}/product/create`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  getAllProducts: async (): Promise<ProductListResponse> => {
    const response = await axios.get(`${API_URL}/product`);
    return response.data;
  },

  updateProduct: async (id: string, productData: Partial<Product>) => {
    const response = await axios.put(`${API_URL}/product/${id}`, productData);
    return response.data;
  },

  deleteProduct: async (id: string) => {
    const response = await axios.delete(`${API_URL}/product/${id}`);
    return response.data;
  },
};
