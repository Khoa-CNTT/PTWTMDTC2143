import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Logo from '../../assets/images/MESSIU-logo2.png';
import { FcGoogle } from 'react-icons/fc';
import { authService } from '../../services/auth.service';
import { AxiosError } from 'axios';

const SignIn: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await authService.login(formData.email, formData.password);
      toast.success('Đăng nhập thành công!');
      navigate('/');
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      const errorMessage = error.response?.data?.message || 'Lỗi khi đăng nhập';

      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-purple-600">
      <div className="bg-white rounded-lg shadow-lg p-8 w-96">
        <div className="flex justify-center mb-4">
          <img src={Logo} alt="Logo" className="object-contain" />
        </div>
        <h2 className="text-2xl font-bold text-center mb-6">Sign In</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Email"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Password"
              required
            />
          </div>
          <div className="flex justify-between mb-4">
            <a href="#" className="text-sm text-blue-600 hover:underline">
              Forgot Password?
            </a>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-500 transition font-bold disabled:bg-blue-300"
          >
            {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
          </button>
          <div className="flex items-center justify-center my-4">
            <span className="text-sm">Hoặc đăng nhập với</span>
          </div>
          <button
            type="button"
            className="w-full bg-white border border-gray-300 text-gray-700 p-2 rounded-md hover:bg-gray-100 transition"
          >
            <div className="flex items-center justify-center">
              <FcGoogle className="me-2" />
              <div className="font-bold">Google</div>
            </div>
          </button>
          <div className="text-center mt-4">
            <p className="text-sm">
              Chưa có tài khoản?{' '}
              <a href="#" className="text-blue-600 hover:underline">
                Đăng ký
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
