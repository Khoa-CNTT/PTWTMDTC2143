import axiosInstance from './axios.config';
import { authService } from './auth.service';

export interface Brand {
  id: string;
  name: string;
}

class BrandService {
  async getAllBrands(): Promise<Brand[]> {
    if (!authService.isAuthenticated()) {
      throw new Error('User is not authenticated');
    }

    try {
      const response = await axiosInstance.get('/brands');
      return response.data;
    } catch (error) {
      console.error('Error fetching brands:', error);
      throw error;
    }
  }
}
export const brandService = new BrandService();
