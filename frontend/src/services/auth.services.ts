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
    // Lấy user ID từ localStorage
    const userStr = localStorage.getItem('user');
    if (!userStr) {
      // Nếu không có user, chỉ cần xóa dữ liệu local
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('rememberedEmail');
      logoutContext();
      return true;
    }

    const user = JSON.parse(userStr);
    if (!user.id) {
      // Nếu user không hợp lệ, chỉ cần xóa dữ liệu local
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('rememberedEmail');
      logoutContext();
      return true;
    }

    try {
      // Gọi API logout
      await axiosInstance.post(`/auth/logout/${user.id}`);
    } catch (apiError) {
      console.error('Logout API error:', apiError);
      // Bỏ qua lỗi API, vẫn tiếp tục xóa dữ liệu local
    }

    // Xóa dữ liệu local
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('rememberedEmail');
    logoutContext();

    return true;
  } catch (error) {
    console.error('Logout error:', error);
    // Vẫn xóa dữ liệu local ngay cả khi có lỗi
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('rememberedEmail');
    logoutContext();
    return true; // Trả về true vì đã xóa dữ liệu local thành công
  }
};
