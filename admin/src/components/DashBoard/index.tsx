import React, { useState } from 'react';
import { MdOutlineNavigateNext } from 'react-icons/md';
import { MdSkipNext } from 'react-icons/md';
import { MdOutlineNavigateBefore } from 'react-icons/md';
import { MdSkipPrevious } from 'react-icons/md';
import { FaUser } from 'react-icons/fa';
import { FaShoppingCart } from 'react-icons/fa';
import { IoBagHandleOutline } from 'react-icons/io5';
import { FaStar } from 'react-icons/fa6';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Switch } from '@mui/material';

const Dashboard: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [status, setStatus] = useState<string>('inactive');

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
  const pieData = [
    { name: '2013', value: 60 },
    { name: '2014', value: 13.3 },
    { name: '2015', value: 13.3 },
    { name: '2016', value: 13.3 },
  ];
  type CustomLabelProps = {
    cx?: number;
    cy?: number;
    midAngle?: number;
    outerRadius?: number;
    percent?: number;
  };

  const renderCustomizedLabel = ({
    cx = 0,
    cy = 0,
    midAngle = 0,
    outerRadius = 0,
    percent = 0,
  }: CustomLabelProps) => {
    const radius = outerRadius * 0.7;
    const x = cx + radius * Math.cos((-midAngle * Math.PI) / 180);
    const y = cy + radius * Math.sin((-midAngle * Math.PI) / 180);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor="middle"
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(1)}%`}
      </text>
    );
  };
  const COLORS = ['#1e3a8a', '#dc2626', '#f59e0b', '#22c55e'];

  const stats = [
    { color: 'from-green-500 to-green-400', icon: <FaUser /> },
    { color: 'from-fuchsia-500 to-pink-400', icon: <FaShoppingCart /> },
    { color: 'from-blue-600 to-blue-400', icon: <IoBagHandleOutline /> },
    { color: 'from-yellow-400 to-yellow-500', icon: <FaStar /> },
  ];
  const Badge = ({ text, color }: { text: string; color: string }) => (
    <span className={`px-2 py-1 text-xs rounded-full font-medium ${color}`}>
      {text}
    </span>
  );
  const [currentPage, setCurrentPage] = useState(1);
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
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      <div className="p-4 bg-gray-100 ">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          <div className="col-span-1 lg:col-span-2 xl:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-4">
            {stats.map((card, index) => (
              <div
                key={index}
                className={`flex flex-col justify-between p-4 rounded-xl bg-gradient-to-br ${card.color} text-white min-h-[130px]`}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold text-sm">Total Users</p>
                    <h2 className="text-3xl font-bold">277</h2>
                  </div>
                  <div className="text-4xl opacity-50">{card.icon}</div>
                </div>
                <div className="text-sm opacity-80">Last Month</div>
              </div>
            ))}
          </div>

          <div className="col-span-1 xl:col-span-2 bg-gradient-to-br from-blue-600 to-blue-500 text-white rounded-xl p-4">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-lg font-medium">Total Sales</h2>
                <h1 className="text-3xl font-bold">$3,787,681.00</h1>
                <p className="text-sm opacity-80">$3,578.90 in last month</p>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  outerRadius={60}
                  dataKey="value"
                  label={renderCustomizedLabel}
                  labelLine={false}
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="bg-white rounded shadow p-4">
          <h2 className="text-xl font-semibold mb-4">Best Selling Products</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 w-[500px]">
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
    </>
  );
};

export default Dashboard;
