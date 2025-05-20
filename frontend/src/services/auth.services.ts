import axios from 'axios';

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
  user: {
    id: string;
    email: string;
    name: string;
  };
}

export const register = async (userData: UserRegistrationData) => {
  try {
    const response = await axiosInstance.post('/auth/register', userData);
    return response.data;
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};

export const login = async (userData: UserLoginData): Promise<AuthResponse> => {
  try {
    const response = await axiosInstance.post('/auth/login', userData);
    const { access_token, user } = response.data;

    // Store token and user info in localStorage
    localStorage.setItem('token', access_token);
    localStorage.setItem('user', JSON.stringify(user));

    return response.data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const logout = async () => {
  try {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const response = await axiosInstance.post(`/auth/logout/${user.id}`);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return response.data;
  } catch (error) {
    console.error('Logout error:', error);
    throw error;
  }
};
