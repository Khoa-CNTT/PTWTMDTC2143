import axiosInstance from './axios.config';

const API_URL = 'http://localhost:3000';

export interface LoginResponse {
  access_token: string;
  refresh_token: string;
  user: {
    id: string;
    email: string;
    role: string;
  };
}

export interface User {
  id: string;
  email: string;
  role: string;
}

class AuthService {
  private tokenKey = 'access_token';
  private refreshTokenKey = 'refresh_token';
  private userKey = 'user';

  async login(email: string, password: string): Promise<LoginResponse> {
    const response = await axiosInstance.post(`${API_URL}/auth/login`, {
      email,
      password,
    });

    if (response.data) {
      this.setTokens(response.data);
      this.setUser(response.data.user);
    }

    return response.data;
  }

  async refreshToken(): Promise<LoginResponse> {
    const refreshToken = this.getRefreshToken();
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    const response = await axiosInstance.post(`${API_URL}/auth/refresh`, {
      refresh_token: refreshToken,
    });

    if (response.data) {
      this.setTokens(response.data);
    }

    return response.data;
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.refreshTokenKey);
    localStorage.removeItem(this.userKey);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getRefreshToken(): string | null {
    return localStorage.getItem(this.refreshTokenKey);
  }

  getUser(): User | null {
    const user = localStorage.getItem(this.userKey);
    return user ? JSON.parse(user) : null;
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  setTokens(data: LoginResponse): void {
    localStorage.setItem(this.tokenKey, data.access_token);
    localStorage.setItem(this.refreshTokenKey, data.refresh_token);
  }

  private setUser(user: User): void {
    localStorage.setItem(this.userKey, JSON.stringify(user));
  }
}

export const authService = new AuthService();
