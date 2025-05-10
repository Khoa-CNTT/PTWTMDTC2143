import api from './api';

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
    const res = await api.post('/user', userData);
    return res.data;
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};

export const login = async (userData: UserLoginData): Promise<AuthResponse> => {
  try {
    const res = await api.post<AuthResponse>('/auth/login', userData);
    const { access_token } = res.data;

    // Store token in localStorage
    localStorage.setItem('token', access_token);

    return res.data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const logout = () => {
  localStorage.removeItem('token');
};
