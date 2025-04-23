import React, { useState } from 'react';
import { Switch } from '@mui/material';
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
  const [isActive, setIsActive] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [status, setStatus] = useState<string>('inactive');
  const [currentPage, setCurrentPage] = useState(1);

  // test du lieu
  const allProducts = Array.from({ length: 30 }, (_, i) => ({
    id: i + 1,
    name: `Product ${String.fromCharCode(65 + (i % 26))}`,
    category: `Category ${(i % 3) + 1}`,
    brand: `Brand ${(i % 5) + 1}`,
    price: `$${(100 + i * 5).toFixed(2)}`,
    stock: i % 2 === 0,
    rating: '⭐⭐⭐⭐',
    status: i % 3 === 0 ? 'Active' : 'Inactive',
  }));

  const itemsPerPage = 10;
  const totalPages = Math.ceil(allProducts.length / itemsPerPage);
  const paginatedProducts = allProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSwitchChange = () => {
    setIsActive(!isActive);
    console.log('Switch is now:', !isActive ? 'Active' : 'Inactive');
  };

  const handleEditClick = (productId: string, currentStatus: string) => {
    setSelectedProduct(productId);
    setStatus(currentStatus);
    setShowForm(true);
  };

  const handleFormSubmit = () => {
    console.log(
      `Product ${selectedProduct} is now ${isActive ? 'Active' : 'Inactive'}`
    );
    setShowForm(false);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const Badge = ({ text, color }: { text: string; color: string }) => (
    <span className={`px-2 py-1 text-xs rounded-full font-medium ${color}`}>
      {text}
    </span>
  );

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
          <table className="text-left w-full text-sm">
            <thead>
              <tr className="text-gray-500 border-b">
                <th className="py-2 px-2">UID</th>
                <th className="py-2 px-2">PRODUCT</th>
                <th className="py-2 px-2">CATEGORY</th>
                <th className="py-2 px-2">BRAND</th>
                <th className="py-2 px-2">PRICE</th>
                <th className="py-2 px-2">STOCK</th>
                <th className="py-2 px-2">RATING</th>
                <th className="py-2 px-2">STATUS</th>
                <th className="py-2 px-2">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {paginatedProducts.map((product) => (
                <tr key={product.id} className="border-b">
                  <td className="px-4 py-2">{product.id}</td>
                  <td className="px-4 py-2">{product.name}</td>
                  <td className="px-4 py-2">{product.category}</td>
                  <td className="px-4 py-2">{product.brand}</td>
                  <td className="px-4 py-2">{product.price}</td>
                  <td className="px-4 py-2">
                    <Switch
                      checked={product.stock}
                      onChange={handleSwitchChange}
                      color="primary"
                    />
                  </td>
                  <td className="px-4 py-2">{product.rating}</td>
                  <td className="px-4 py-2">
                    <Badge
                      text={product.status}
                      color={
                        product.status === 'Active'
                          ? 'bg-green-100 text-green-600'
                          : 'bg-gray-200 text-gray-500'
                      }
                    />
                  </td>
                  <td className="px-4 py-2 text-blue-600 font-semibold cursor-pointer">
                    <button
                      onClick={() =>
                        handleEditClick(product.id.toString(), product.status)
                      }
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-end mt-4 space-x-2 items-center">
          <button
            onClick={() => setCurrentPage(1)}
            disabled={currentPage === 1}
            className="text-gray-400 disabled:opacity-30"
          >
            <MdSkipPrevious />
          </button>
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="text-gray-400 disabled:opacity-30"
          >
            <MdOutlineNavigateBefore />
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => handlePageChange(i + 1)}
              className={`rounded-full w-8 h-8 flex items-center justify-center ${
                currentPage === i + 1
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 bg-gray-100'
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="text-gray-400 disabled:opacity-30"
          >
            <MdOutlineNavigateNext />
          </button>
          <button
            onClick={() => setCurrentPage(totalPages)}
            disabled={currentPage === totalPages}
            className="text-gray-400 disabled:opacity-30"
          >
            <MdSkipNext />
          </button>
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[400px]">
            <h3 className="text-xl font-semibold mb-4">Set Product Status</h3>
            <p className="mb-4">Product ID: {selectedProduct}</p>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Status</label>
              <input
                type="text"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2"
                placeholder="Enter status (e.g., active, inactive)"
              />
            </div>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowForm(false)}
                className="bg-gray-300 px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleFormSubmit}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;
