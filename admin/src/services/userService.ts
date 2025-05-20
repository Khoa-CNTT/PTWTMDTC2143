import axiosInstance from './axios.config';
import { authService } from './auth.service';

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  status: 'ACTIVE' | 'INACTIVE';
  createdAt: string;
  updatedAt: string;
  isVerified: boolean;
  roles: Array<{ name: string }>;
  avatar?: string;
  country?: string;
  orders?: number;
  totalSpent?: number;
}

export interface UserListResponse {
  users: User[];
  total: number;
  nextCursor: string | null;
}

class UserService {
  async getAllUsers(
    limit: number = 10,
    cursor?: string
  ): Promise<UserListResponse> {
    if (!authService.isAuthenticated()) {
      throw new Error('User is not authenticated');
    }
    try {
      const response = await axiosInstance.get('/user', {
        params: { limit, cursor },
      });
      // Đảm bảo trả về đúng định dạng FE mong muốn
      if (Array.isArray(response.data)) {
        return {
          users: response.data,
          total: response.data.length,
          nextCursor: null,
        };
      }
      return {
        users: response.data.users || [],
        total: response.data.total || 0,
        nextCursor: response.data.nextCursor || null,
      };
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  }

  async getUserById(id: string): Promise<User> {
    if (!authService.isAuthenticated()) {
      throw new Error('User is not authenticated');
    }
    try {
      const response = await axiosInstance.get(`/user/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching user:', error);
      throw error;
    }
  }

  async updateUserStatus(
    id: string,
    status: 'ACTIVE' | 'INACTIVE'
  ): Promise<User> {
    if (!authService.isAuthenticated()) {
      throw new Error('User is not authenticated');
    }
    try {
      const response = await axiosInstance.put(`/user/${id}`, { status });
      return response.data;
    } catch (error) {
      console.error('Error updating user status:', error);
      throw error;
    }
  }

  async deleteUser(id: string): Promise<void> {
    if (!authService.isAuthenticated()) {
      throw new Error('User is not authenticated');
    }
    try {
      await axiosInstance.delete(`/user/${id}`);
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  }
}

export const userService = new UserService();
