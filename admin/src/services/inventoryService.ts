import axiosInstance from './axios.config';
import { authService } from './auth.service';

export type InventoryStatus = 'IN_STOCK' | 'LOW_STOCK' | 'OUT_OF_STOCK';

export interface InventoryItem {
  variantId: string;
  sku: string;
  img: string;
  warehouseId: string;
  quantity: number;
  reserved: number;
  status?: InventoryStatus;
}

export interface InventoryCreateDTO {
  variantId: string;
  warehouseId: string;
  quantity: number;
  reserved: number;
  status?: InventoryStatus;
}

export interface InventoryUpdateDTO {
  variantId: string;
  warehouseId: string;
  quantity: number;
  reserved: number;
  status?: InventoryStatus;
}

export interface CheckStockDTO {
  variantId: string;
  quantity: number;
}

class InventoryService {
  async getAllInventory(): Promise<InventoryItem[]> {
    if (!authService.isAuthenticated()) {
      throw new Error('User is not authenticated');
    }

    try {
      const response = await axiosInstance.get('/inventory');
      return response.data;
    } catch (error) {
      console.error('Error fetching inventory:', error);
      throw error;
    }
  }

  async getInventoryByVariant(variantId: string): Promise<InventoryItem[]> {
    if (!authService.isAuthenticated()) {
      throw new Error('User is not authenticated');
    }

    try {
      const response = await axiosInstance.get(
        `/inventory/variant/${variantId}`
      );
      return response.data;
    } catch (error) {
      console.error(
        `Error fetching inventory for variant ${variantId}:`,
        error
      );
      throw error;
    }
  }

  async addProductToWarehouse(
    data: InventoryCreateDTO
  ): Promise<InventoryItem> {
    if (!authService.isAuthenticated()) {
      throw new Error('User is not authenticated');
    }

    try {
      const response = await axiosInstance.post('/inventory', data);
      return response.data;
    } catch (error) {
      console.error('Error adding product to warehouse:', error);
      throw error;
    }
  }

  async updateInventoryQuantity(
    data: InventoryUpdateDTO
  ): Promise<InventoryItem> {
    if (!authService.isAuthenticated()) {
      throw new Error('User is not authenticated');
    }

    try {
      const response = await axiosInstance.put('/inventory', data);
      return response.data;
    } catch (error) {
      console.error('Error updating inventory quantity:', error);
      throw error;
    }
  }

  async checkStockAvailability(data: CheckStockDTO): Promise<boolean> {
    if (!authService.isAuthenticated()) {
      throw new Error('User is not authenticated');
    }

    try {
      const response = await axiosInstance.post('/inventory/check-stock', data);
      return response.data.available;
    } catch (error) {
      console.error('Error checking stock availability:', error);
      throw error;
    }
  }
}

export const inventoryService = new InventoryService();
