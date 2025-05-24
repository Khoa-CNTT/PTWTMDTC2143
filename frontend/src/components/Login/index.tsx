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
      if (response.access_token) {
        if (rememberMe) {
          localStorage.setItem('rememberedEmail', formData.email);
        }
        navigate('/');
      }
    } catch (err) {
      console.error('Login error:', err);
      if (err instanceof AxiosError) {
        if (err.response?.data?.message) {
          setError(err.response.data.message);
        } else if (err.code === 'ERR_NETWORK') {
          setError('Network error. Please check your connection.');
        } else {
          setError('Invalid email or password. Please try again.');
        }
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-[600px] bg-white p-12 rounded-lg shadow-lg flex flex-col">
        <h2 className="text-3xl font-semibold mb-4 text-center">Login</h2>
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
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label className="font-semibold mt-2">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your password"
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
              label="Remember Me"
            />
            <a
              href="/forgotpassword"
              className="text-orange-500 hover:underline font-semibold"
            >
              Forgot Password
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
              {isLoading ? 'Signing in...' : 'SIGN IN'}
            </Button>
          </div>
          <div className="text-center mt-4">
            <label className="me-2">Don&apos;t have an Account?</label>
            <a
              href="/register"
              className="text-orange-500 hover:underline font-semibold"
            >
              Sign up now
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
