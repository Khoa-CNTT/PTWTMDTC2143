import React from 'react';
const Register: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Username</label>
            <input
              type="username"
              className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Nhập tên đăng nhập"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Nhập email"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Phone Number
            </label>
            <input
              type="telephone"
              className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Nhập số điện thoại"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Nhập mật khẩu"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-2 rounded-xl hover:bg-orange-600 transition"
          >
            SIGN UP
          </button>
          <div className="text-center mt-4">
            <label className="font-bold me-2">Already have an account?</label>
            <a
              href="/login"
              className="text-orange-500 hover:underline font-bold"
            >
              Sign in now
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
