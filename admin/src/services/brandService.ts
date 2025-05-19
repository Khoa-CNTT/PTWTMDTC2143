import axios from 'axios';

const API_URL = 'http://localhost:3000';

export interface Brand {
  id: string;
  name: string;
}

export const brandService = {
  getAllBrands: async (): Promise<Brand[]> => {
    const response = await axios.get(`${API_URL}/brand`);
    return response.data;
  },
};
