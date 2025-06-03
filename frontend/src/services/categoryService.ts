import api from './api';
export interface Category {
  id: string;
  name: string;
  image?: string;
  parentId?: string | null;
  productCount?: number;
}

class CategoryService {
  async getRootCategoriesWithProductCount(): Promise<Category[]> {
    const response = await api.get('/category/parent', {
      params: { parentId: 'null' },
    });

    return response.data.data;
  }

  async getSubCategories(parentId: string): Promise<Category[]> {
    const response = await api.get(`/category/subcategories/${parentId}`);
    // Nếu API trả về mảng trực tiếp thì dùng response.data
    // Nếu trả về { data: [...] } thì dùng response.data.data
    // Để an toàn, kiểm tra cả hai trường hợp:
    if (Array.isArray(response.data)) {
      return response.data;
    }
    if (Array.isArray(response.data.data)) {
      return response.data.data;
    }
    return [];
  }
}

export const categoryService = new CategoryService();
