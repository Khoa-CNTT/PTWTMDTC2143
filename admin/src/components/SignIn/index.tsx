import React from 'react';
import Logo from '../../assets/images/MESSIU-logo2.png';
import { FcGoogle } from 'react-icons/fc';
const SignIn: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-purple-600">
      <div className="bg-white rounded-lg shadow-lg p-8 w-96">
        <div className="flex justify-center mb-4">
          <img src={Logo} alt="Logo" className="object-contain" />
        </div>
        <h2 className="text-2xl font-bold text-center mb-6">Sign In</h2>
        <form>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 ">
              Email
            </label>
            <input
              type="email"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Email"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Password"
            />
          </div>
          <div className="flex justify-between mb-4">
            <a href="#" className="text-sm text-blue-600 hover:underline">
              Forgot Password?
            </a>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-500 transition font-bold"
          >
            Sign In
          </button>
          <div className="flex items-center justify-center my-4">
            <span className="text-sm">Or continue with</span>
          </div>
          <button className="w-full bg-white border border-gray-300 text-gray-700 p-2 rounded-md hover:bg-gray-100 transition">
            <div className="flex items-center justify-center">
              <FcGoogle className="me-2" />{' '}
              <div className="font-bold">Sign Up with Google</div>
            </div>
          </button>
          <div className="text-center mt-4">
            <p className="text-sm">
              Not Registered?{' '}
              <a href="#" className="text-blue-600 hover:underline">
                Sign Up
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
