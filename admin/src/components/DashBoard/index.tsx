import React from 'react';
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
  PieLabelRenderProps,
} from 'recharts';

const Dashboard: React.FC = () => {
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

  return (
    <>
      <div className="p-4 bg-gray-100 ">
        <div className="bg-white rounded shadow p-4 mb-4">
          <h1 className="text-2xl font-semibold">Product List</h1>
        </div>

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
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-blue-600 text-white">
                  {[
                    'UID',
                    'PRODUCT',
                    'CATEGORY',
                    'BRAND',
                    'PRICE',
                    'RATING',
                    'ACTION',
                  ].map((head, i) => (
                    <th
                      key={i}
                      className="px-4 py-2 text-left whitespace-nowrap"
                    >
                      {head}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="px-4 py-2">1</td>
                  <td className="px-4 py-2">Product A</td>
                  <td className="px-4 py-2">Category A</td>
                  <td className="px-4 py-2">Brand X</td>
                  <td className="px-4 py-2">$199</td>
                  <td className="px-4 py-2">⭐⭐⭐⭐</td>
                  <td className="px-4 py-2 text-blue-600 font-semibold cursor-pointer">
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
    </>
  );
};

export default Dashboard;
