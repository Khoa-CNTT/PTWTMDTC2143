import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MdOutlineNavigateNext,
  MdSkipNext,
  MdOutlineNavigateBefore,
  MdSkipPrevious,
} from 'react-icons/md';
import { FaUser, FaShoppingCart } from 'react-icons/fa';
import { IoBagHandleOutline } from 'react-icons/io5';

const ProductList = () => {
  const navigate = useNavigate();

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <div className="bg-white rounded shadow p-4 mb-4">
        <h1 className="text-2xl font-semibold">Product List</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {[
          { color: 'from-green-500 to-green-400', icon: <FaUser /> },
          { color: 'from-fuchsia-500 to-pink-400', icon: <FaShoppingCart /> },
          { color: 'from-blue-600 to-blue-400', icon: <IoBagHandleOutline /> },
        ].map((card, index) => (
          <div
            key={index}
            className={`flex justify-between items-center p-6 rounded-lg bg-gradient-to-r ${card.color} text-white`}
          >
            <div>
              <p className="font-semibold text-sm">Total Users</p>
              <h2 className="text-3xl font-bold">277</h2>
            </div>
            <div className="text-4xl opacity-50">{card.icon}</div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded shadow p-4">
        <h2 className="text-xl font-semibold mb-4">Best Selling Products</h2>

        <div className="flex items-center justify-between mb-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-[500px]">
            <div>
              <label className="block text-sm font-medium mb-1">SHOW BY</label>
              <select className="w-full border border-gray-300 rounded px-3 py-2">
                <option>None</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                CATEGORY BY
              </label>
              <select className="w-full border border-gray-300 rounded px-3 py-2">
                <option>None</option>
              </select>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <input
              type="text"
              placeholder="Search..."
              className="border border-gray-300 rounded px-3 py-2 w-64"
            />
            <button
              onClick={() => navigate('/product-upload')}
              className="bg-blue-600 text-white font-semibold px-4 py-2 rounded"
            >
              Add
            </button>
          </div>
        </div>

        <div className="overflow-auto">
          <table className="min-w-full text-sm border border-gray-300">
            <thead>
              <tr className="bg-blue-600 text-white">
                {[
                  'UID',
                  'PRODUCT',
                  'CATEGORY',
                  'BRAND',
                  'PRICE',
                  'RAM',
                  'COLOR',
                  'RATING',
                  'ACTION',
                ].map((head, i) => (
                  <th
                    key={i}
                    className="px-4 py-2 text-left whitespace-nowrap border border-gray-300"
                  >
                    {head}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="border border-gray-300">
                <td className="px-4 py-2 border border-gray-300">1</td>
                <td className="px-4 py-2 border border-gray-300">Product A</td>
                <td className="px-4 py-2 border border-gray-300">Category A</td>
                <td className="px-4 py-2 border border-gray-300">Brand X</td>
                <td className="px-4 py-2 border border-gray-300">$199</td>
                <td className="px-4 py-2 border border-gray-300">RAM</td>
                <td className="px-4 py-2 border border-gray-300">COLOR</td>
                <td className="px-4 py-2 border border-gray-300">⭐⭐⭐⭐</td>
                <td className="px-4 py-2 text-blue-600 font-semibold cursor-pointer border border-gray-300">
                  {' '}
                  Edit
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="flex justify-end mt-4 space-x-2 items-center">
          <button className="text-gray-400">
            <MdSkipPrevious />
          </button>
          <button className="text-gray-400">
            <MdOutlineNavigateBefore />
          </button>
          <button className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center">
            1
          </button>
          <button className="text-gray-400">
            <MdOutlineNavigateNext />
          </button>
          <button className="text-gray-400">
            <MdSkipNext />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
