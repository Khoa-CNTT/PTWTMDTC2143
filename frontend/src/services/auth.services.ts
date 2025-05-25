import axios from 'axios';
import { User } from '../contexts/AuthContext';

const API_URL = 'http://localhost:3000';

// Tạo instance axios với cấu hình mặc định
const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Quan trọng cho CORS với credentials
});

interface UserRegistrationData {
  email: string;
  password: string;
  name: string;
  phone: string;
}

interface UserLoginData {
  email: string;
  password: string;
}

interface AuthResponse {
  access_token: string;
  user: User;
}

export const register = async (
  userData: UserRegistrationData,
  loginContext: (user: User) => void
) => {
  try {
    const response = await axiosInstance.post('/auth/register', userData);
    // Đăng ký xong tự động đăng nhập
    if (response.data && response.data.user) {
      loginContext(response.data.user);
    }
    return response.data;
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};

export const login = async (
  userData: UserLoginData,
  loginContext: (user: User) => void
): Promise<AuthResponse> => {
  try {
    const response = await axiosInstance.post('/auth/login', userData);
    const { access_token, user } = response.data;

    // Store token and user info in localStorage
    localStorage.setItem('token', access_token);
    localStorage.setItem('user', JSON.stringify(user));
    loginContext(user);
    return response.data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const logout = async (logoutContext: () => void) => {
  try {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const response = await axiosInstance.post(`/auth/logout/${user.id}`);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    logoutContext();
    return response.data;
  } catch (error) {
    console.error('Logout error:', error);
    throw error;
  }
};
