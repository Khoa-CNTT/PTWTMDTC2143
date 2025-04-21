import React from 'react';
import { FaLaptop } from 'react-icons/fa';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Cate: React.FC = () => {
  return (
    <div className="flex  bg-gray-100">
      <div className="flex-1 p-6  ">
        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="bg-gray-200 p-6 rounded-lg flex flex-col items-center justify-center text-center">
            <FaLaptop className="text-3xl text-gray-700 mb-2" />
            <p className="font-semibold">Laptop</p>
            <p className="text-sm text-gray-600">24 Products</p>
          </div>
          <div className="bg-gray-200 p-6 rounded-lg flex flex-col items-center justify-center text-center">
            <FaLaptop className="text-3xl text-gray-700 mb-2" />
            <p className="font-semibold">Ultrabookp</p>
            <p className="text-sm text-gray-600">24 Products</p>
          </div>
          <div className="bg-gray-200 p-6 rounded-lg flex flex-col items-center justify-center text-center">
            <FaLaptop className="text-3xl text-gray-700 mb-2" />
            <p className="font-semibold">Desktop/PC</p>
            <p className="text-sm text-gray-600">24 Products</p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="bg-gray-200 p-6 rounded-lg flex flex-col items-center justify-center text-center">
            <FaLaptop className="text-3xl text-gray-700 mb-2" />
            <p className="font-semibold">All in One PC</p>
            <p className="text-sm text-gray-600">24 Products</p>
          </div>
          <div className="bg-gray-200 p-6 rounded-lg flex flex-col items-center justify-center text-center">
            <FaLaptop className="text-3xl text-gray-700 mb-2" />
            <p className="font-semibold">Routers</p>
            <p className="text-sm text-gray-600">24 Products</p>
          </div>
          <div className="bg-gray-200 p-6 rounded-lg flex flex-col items-center justify-center text-center">
            <FaLaptop className="text-3xl text-gray-700 mb-2" />
            <p className="font-semibold">Speakers</p>
            <p className="text-sm text-gray-600">24 Products</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cate;
