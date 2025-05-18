import axios from 'axios';

const API_URL = 'http://localhost:3000';

export interface Category {
  id: string;
  name: string;
  image: string;
  parentId?: string;
}

export const categoryService = {
  // Get all categories
  getAllCategories: async (): Promise<Category[]> => {
    try {
      const response = await axios.get(`${API_URL}/category`);
      return response.data;
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  },

  // Get category by ID
  getCategoryById: async (id: string): Promise<Category> => {
    try {
      const response = await axios.get(`${API_URL}/category-list/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching category ${id}:`, error);
      throw error;
    }
  },

  // Delete category
  deleteCategory: async (id: string): Promise<void> => {
    try {
      await axios.delete(`${API_URL}/category-list/${id}`);
    } catch (error) {
      console.error(`Error deleting category ${id}:`, error);
      throw error;
    }
  },

  // Get subcategories
  getSubCategories: async (id: string): Promise<Category[]> => {
    try {
      const response = await axios.get(
        `${API_URL}/category/subcategories/${id}`
      );
      return response.data;
    } catch (error) {
      console.error(`Error fetching subcategories for ${id}:`, error);
      throw error;
    }
  },

  // Get parent category
  getParentCategory: async (id: string): Promise<Category> => {
    try {
      const response = await axios.get(`${API_URL}/category/parent/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching parent category for ${id}:`, error);
      throw error;
    }
  },
};
