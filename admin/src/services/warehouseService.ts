import axiosInstance from './axios.config';
import { authService } from './auth.service';

export type WarehouseStatus = 'ACTIVE' | 'INACTIVE';

export interface Warehouse {
  id: string;
  name: string;
  location: string;
  status: WarehouseStatus;
}

export interface WarehouseCreateDTO {
  name: string;
  location: string;
  status: WarehouseStatus;
}

export interface WarehouseUpdateDTO {
  name?: string;
  location?: string;
  status?: WarehouseStatus;
}

class WarehouseService {
  async getAllWarehouses(): Promise<Warehouse[]> {
    if (!authService.isAuthenticated()) {
      throw new Error('User is not authenticated');
    }

    try {
      const response = await axiosInstance.get('/warehouses');
      return response.data;
    } catch (error) {
      console.error('Error fetching warehouses:', error);
      throw error;
    }
  }

  async getWarehouseById(id: string): Promise<Warehouse> {
    if (!authService.isAuthenticated()) {
      throw new Error('User is not authenticated');
    }

    try {
      const response = await axiosInstance.get(`/warehouses/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching warehouse ${id}:`, error);
      throw error;
    }
  }

  async createWarehouse(data: WarehouseCreateDTO): Promise<Warehouse> {
    if (!authService.isAuthenticated()) {
      throw new Error('User is not authenticated');
    }

    try {
      const response = await axiosInstance.post('/warehouses', data);
      return response.data;
    } catch (error) {
      console.error('Error creating warehouse:', error);
      throw error;
    }
  }

  async updateWarehouse(
    id: string,
    data: WarehouseUpdateDTO
  ): Promise<Warehouse> {
    if (!authService.isAuthenticated()) {
      throw new Error('User is not authenticated');
    }

    try {
      const response = await axiosInstance.put(`/warehouses/${id}`, data);
      return response.data;
    } catch (error) {
      console.error(`Error updating warehouse ${id}:`, error);
      throw error;
    }
  }

  async updateWarehouseStatus(
    id: string,
    status: WarehouseStatus
  ): Promise<Warehouse> {
    if (!authService.isAuthenticated()) {
      throw new Error('User is not authenticated');
    }

    try {
      const response = await axiosInstance.put(`/warehouses/${id}/status`, {
        status,
      });
      return response.data;
    } catch (error) {
      console.error(`Error updating warehouse status ${id}:`, error);
      throw error;
    }
  }

  async deleteWarehouse(id: string): Promise<void> {
    if (!authService.isAuthenticated()) {
      throw new Error('User is not authenticated');
    }

    try {
      await axiosInstance.delete(`/warehouses/${id}`);
    } catch (error) {
      console.error(`Error deleting warehouse ${id}:`, error);
      throw error;
    }
  }
}

export const warehouseService = new WarehouseService();
