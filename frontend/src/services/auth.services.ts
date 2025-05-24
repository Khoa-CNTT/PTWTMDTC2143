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
    // Lấy user ID từ localStorage trước khi xóa
    const userStr = localStorage.getItem('user');
    let userId: string | null = null;

    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        userId = user?.id;
      } catch (e) {
        console.error('Error parsing user data:', e);
      }
    }

    if (!userId) {
      // Nếu không có userId, vẫn tiếp tục logout ở phía client
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      logoutContext();
      return;
    }

    // Gọi API logout với userId
    const response = await axiosInstance.post(`/auth/logout/${userId}`);

    // Xóa localStorage sau khi gọi API thành công
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    // Cập nhật context
    logoutContext();

    return response.data;
  } catch (error) {
    console.error('Logout error:', error);
    // Vẫn xóa localStorage và cập nhật context ngay cả khi API thất bại
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    logoutContext();
    throw error;
  }
};
