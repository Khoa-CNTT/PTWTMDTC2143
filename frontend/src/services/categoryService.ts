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
}

export const categoryService = new CategoryService();
