import axiosInstance from './axios.config';
import { authService } from './auth.service';

export interface Category {
  id: string;
  name: string;
  description: string;
  image?: string;
  parentId?: string | null;
}

class CategoryService {
  async getAllCategories(): Promise<Category[]> {
    if (!authService.isAuthenticated()) {
      throw new Error('User is not authenticated');
    }

    try {
      const response = await axiosInstance.get('/category');
      return response.data;
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  }

  async getCategoryById(id: string): Promise<Category> {
    if (!authService.isAuthenticated()) {
      throw new Error('User is not authenticated');
    }

    try {
      const response = await axiosInstance.get(`/category/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching category ${id}:`, error);
      throw error;
    }
  }

  async createCategory(category: Omit<Category, 'id'>): Promise<Category> {
    if (!authService.isAuthenticated()) {
      throw new Error('User is not authenticated');
    }

    try {
      const response = await axiosInstance.post('/category', category);
      return response.data;
    } catch (error) {
      console.error('Error creating category:', error);
      throw error;
    }
  }

  async updateCategory(
    id: string,
    category: Partial<Category>
  ): Promise<Category> {
    if (!authService.isAuthenticated()) {
      throw new Error('User is not authenticated');
    }

    try {
      const response = await axiosInstance.put(`/category/${id}`, category);
      return response.data;
    } catch (error) {
      console.error(`Error updating category ${id}:`, error);
      throw error;
    }
  }

  async deleteCategory(id: string): Promise<void> {
    if (!authService.isAuthenticated()) {
      throw new Error('User is not authenticated');
    }

    try {
      await axiosInstance.delete(`/category/${id}`);
    } catch (error) {
      console.error(`Error deleting category ${id}:`, error);
      throw error;
    }
  }

  async getSubCategories(parentId: string): Promise<Category[]> {
    if (!authService.isAuthenticated()) {
      throw new Error('User is not authenticated');
    }

    try {
      const response = await axiosInstance.get(
        `/category/subcategories/${parentId}`
      );
      return response.data;
    } catch (error) {
      console.error(`Error fetching subcategories for ${parentId}:`, error);
      throw error;
    }
  }
}

export const categoryService = new CategoryService();
