import React, { useState } from 'react';
import { Checkbox, Button, FormControlLabel } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { login as loginService } from '../../services/auth.services';
import { AxiosError } from 'axios';
import { useAuth } from '../../contexts/AuthContext';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login: authLogin } = useAuth();
  const [rememberMe, setRememberMe] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      const response = await loginService(formData, authLogin);
      console.log('Login response:', response);

      if (response.access_token && response.user) {
        // Lưu thông tin đăng nhập
        authLogin(response.user, response.access_token, response.refresh_token);

        if (rememberMe) {
          localStorage.setItem('rememberedEmail', formData.email);
        }

        console.log('Login successful, redirecting...');
        navigate('/');
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (err) {
      console.error('Login error:', err);
      if (err instanceof AxiosError) {
        if (err.response?.data?.message) {
          setError(err.response.data.message);
        } else if (err.code === 'ERR_NETWORK') {
          setError('Lỗi kết nối. Vui lòng kiểm tra lại kết nối mạng.');
        } else {
          setError('Email hoặc mật khẩu không đúng. Vui lòng thử lại.');
        }
      } else {
        setError('Đã xảy ra lỗi không mong muốn. Vui lòng thử lại.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-[600px] bg-white p-12 rounded-lg shadow-lg flex flex-col">
        <h2 className="text-3xl font-semibold mb-4 text-center">Đăng nhập</h2>
        {error && (
          <div className="mb-4 p-2 text-red-500 text-center bg-red-100 rounded">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="font-semibold">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Nhập email của bạn"
              required
            />
          </div>

          <div>
            <label className="font-semibold mt-2">Mật khẩu</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Nhập mật khẩu của bạn"
              required
            />
          </div>

          <div className="flex justify-between items-center mb-5">
            <FormControlLabel
              control={
                <Checkbox
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                />
              }
              label="Ghi nhớ đăng nhập"
            />
            <a
              href="/forgotpassword"
              className="text-orange-500 hover:underline font-semibold"
            >
              Quên mật khẩu?
            </a>
          </div>

          <div className="mt-auto">
            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={isLoading}
              sx={{
                backgroundColor: 'orange',
                fontSize: '16px',
                padding: '12px',
                '&:disabled': {
                  backgroundColor: 'rgba(255, 165, 0, 0.5)',
                },
              }}
            >
              {isLoading ? 'Đang đăng nhập...' : 'ĐĂNG NHẬP'}
            </Button>
          </div>
          <div className="text-center mt-4">
            <label className="me-2">Chưa có tài khoản?</label>
            <a
              href="/register"
              className="text-orange-500 hover:underline font-semibold"
            >
              Đăng ký ngay
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
