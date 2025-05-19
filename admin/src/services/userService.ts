import axios from 'axios';

const API_URL = 'http://localhost:3000';

// Get token from localStorage
const getAuthToken = () => {
  return localStorage.getItem('token');
};

// Create axios instance with default config
const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to add token to all requests
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

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
  // Additional fields for display
  avatar?: string;
  country?: string;
  orders?: number;
  totalSpent?: number;
}

export interface UserListResponse {
  users: User[];
  total: number;
  hasMore: boolean;
  nextCursor: string | null;
}

export const userService = {
  getAllUsers: async (
    limit: number = 10,
    cursor?: string
  ): Promise<UserListResponse> => {
    const response = await axiosInstance.get('/user', {
      params: { limit, cursor },
    });
    return response.data;
  },

  getUserById: async (id: string): Promise<User> => {
    const response = await axiosInstance.get(`/user/${id}`);
    return response.data;
  },

  updateUserStatus: async (
    id: string,
    status: 'ACTIVE' | 'INACTIVE'
  ): Promise<User> => {
    const response = await axiosInstance.patch(`/user/${id}/status`, {
      status,
    });
    return response.data;
  },

  deleteUser: async (id: string): Promise<void> => {
    await axiosInstance.delete(`/user/${id}`);
  },
};
