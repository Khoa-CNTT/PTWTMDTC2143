import React, { useState } from 'react';
import { FiDollarSign } from 'react-icons/fi';
import { HiOutlineShoppingCart } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import { MoreVertical } from 'lucide-react';
import { Button } from '@mui/material';
import { Input } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Eye, EyeOff, Pencil, UserCheck, Trash2 } from 'lucide-react';
import {
  MdOutlineNavigateNext,
  MdSkipNext,
  MdOutlineNavigateBefore,
  MdSkipPrevious,
} from 'react-icons/md';
import { IoLogoWindows } from 'react-icons/io';
import { FiSmartphone } from 'react-icons/fi';
import { BsAndroid2 } from 'react-icons/bs';
import { RiAppleLine } from 'react-icons/ri';
import { FaChevronRight, FaChevronDown } from 'react-icons/fa';

const UserDetails = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);

  const info = [
    {
      id: '#9957',
      date: 'Nov 29, 2022',
      status: 'Delivered',
      spent: '$59.28',
      statusColor: 'bg-green-100 text-green-600',
    },
    ...Array.from({ length: 28 }, (_, i) => ({
      id: `#6${700 + i}`,
      date: `Apr ${10 + i}, 2023`,
      status: i % 3 === 0 ? 'Delivered' : 'Dispatched',
      spent: `$ ${(i + 1) * 100}`,
      statusColor:
        i % 3 === 0
          ? 'bg-green-100 text-green-600'
          : 'bg-yellow-100 text-yellow-600',
    })),
  ];

  const navigate = useNavigate();
  const [users, setUsers] = useState(info);
  const [showMenu, setShowMenu] = useState<number | null>(null);

  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(users.length / itemsPerPage);

  const paginatedUsers = users.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const handleView = (userid: string) => {
    navigate(`/user-details`);
  };
  const handleDelete = (id: string) => {
    const updatedUsers = users.filter((user) => user.id !== id);
    setUsers(updatedUsers);
    if (updatedUsers.length % itemsPerPage === 0 && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
    setShowMenu(null);
  };
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setShowMenu(null);
  };
  const Badge = ({ text, color }: { text: string; color: string }) => (
    <span className={`px-2 py-1 text-xs rounded-full font-medium ${color}`}>
      {text}
    </span>
  );
  const addresses = [
    {
      label: 'Home',
      address: '23 Shatinon Mekalan',
      isDefault: true,
      details: 'This is the home address with additional details.',
    },
    {
      label: 'Office',
      address: '45 Roker Terrace',
      isDefault: false,
      details: 'This is the office address with additional details.',
    },
    {
      label: 'Family',
      address: '512 Water Plant',
      isDefault: false,
      details: 'This is the family address with additional details.',
    },
  ];
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleDetails = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };
  const payments = [
    {
      brand: 'Mastercard',
      info: 'Expires Apr 2028',
      icon: '/icons/mastercard.svg',
      isPrimary: false,
    },
    {
      brand: 'American Express',
      info: '45 Roker Terrace',
      icon: '/icons/amex.svg',
      isPrimary: true,
    },
    {
      brand: 'Visa',
      info: '512 Water Plant',
      icon: '/icons/visa.svg',
      isPrimary: false,
    },
  ];
  type NotificationSetting = {
    type: string;
    email: boolean;
    browser: boolean;
    app: boolean;
  };
  const initialSettings = [
    {
      type: 'New for you',
      email: true,
      browser: true,
      app: true,
    },
    {
      type: 'Account activity',
      email: true,
      browser: true,
      app: true,
    },
    {
      type: 'A new browser used to sign in',
      email: true,
      browser: true,
      app: false,
    },
    {
      type: 'A new device is linked',
      email: true,
      browser: false,
      app: false,
    },
  ];
  const [settings, setSettings] = useState(initialSettings);

  const toggle = (
    index: number,
    field: keyof Omit<NotificationSetting, 'type'>
  ) => {
    const updated = [...settings];
    updated[index][field] = !updated[index][field];
    setSettings(updated);
  };

  return (
    <>
      <div className="p-6">
        <div className="bg-white shadow-md p-4">
          <div className="flex justify-between items-center">
            <div>
              <div className="text-[30px] text-gray-800 mb-1">
                Customer ID #634759
              </div>
              <div className="text-[15px] text-gray-400 ">
                Aug 17, 2020, 5:48 (ET)
              </div>
            </div>
            <button className="bg-red-100 text-red-500 hover:bg-red-200 font-medium px-3 py-2 rounded flex items-center gap-1 justify-center">
              Delete User
            </button>
          </div>
        </div>
      </div>
      <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6 font-sans">
        <div className="bg-white h-min rounded-xl shadow p-6">
          <div className=" flex flex-col items-center justify-center gap-2 mb-4 ">
            <div>
              <img
                src="https://media.vov.vn/sites/default/files/styles/large/public/2022-12/9._ma_roc_1-0_bo_dao_nha_ronaldo_khoc.jpg"
                className="w-[125px] h-[125px] rounded-xl"
              />
              <div className="font-semibold text-center mt-3">
                Lorine Hischke
              </div>
              <div className="text-xs text-gray-500 text-center">
                Customer ID #634759
              </div>
            </div>
          </div>
          <div className="flex justify-between text-sm mb-4">
            <div className="flex justify-between gap-2 ms-10">
              <div className="w-12 h-12 rounded-xl border border-gray-300 bg-blue-200 flex items-center justify-center">
                <HiOutlineShoppingCart className="w-7 h-7 text-blue-500" />
              </div>
              <div className="flex flex-col">
                <strong>184</strong> Orders
              </div>
            </div>
            <div className="flex justify-between gap-2 me-10">
              <div className="w-12 h-12 rounded-xl border border-gray-300 bg-blue-200 flex items-center justify-center">
                <FiDollarSign className="w-7 h-7 text-blue-500" />
              </div>
              <div className="flex flex-col">
                <strong>$12,378</strong> Spent
              </div>
            </div>
          </div>
          <h2 className="font-semibold text-xl">Details</h2>
          <hr className="mt-4 mb-4" />
          <div className="text-sm space-y-1">
            <div className="flex gap-2">
              <div className="font-semibold">Username:</div>
              <div className="text-gray-500 font-semibold">lorine.hischke</div>
            </div>
            <div className="flex gap-2">
              <div className="font-semibold">Email:</div>
              <div className="text-gray-500 font-semibold">
                vafgot@vultukir.org
              </div>
            </div>
            <div className="flex gap-2">
              <div className="font-semibold">Status:</div>
              <span className="text-green-600 bg-green-100 px-2 py-0.5 rounded text-xs font-semibold">
                Active
              </span>
            </div>
            <div className="flex gap-2">
              <div className="font-semibold">Country:</div>
              <div className="text-gray-500 font-semibold">USA</div>
            </div>
            <div className="flex gap-2">
              <div className="font-semibold">Contact:</div>
              <div className="text-gray-500 font-semibold">(123) 456-7890</div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="flex gap-4 border-b pb-2">
            <button
              onClick={() => setActiveTab('overview')}
              className={`font-semibold px-3 py-2 rounded ${activeTab === 'overview' ? 'bg-blue-500 text-white' : '  text-gray-500'}`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('security')}
              className={`font-semibold px-3 py-2 rounded ${activeTab === 'security' ? 'bg-blue-500 text-white' : ' text-gray-500'}`}
            >
              Security
            </button>
            <button
              onClick={() => setActiveTab('address')}
              className={`font-semibold px-3 py-2 rounded ${activeTab === 'address' ? 'bg-blue-500 text-white' : 'text-gray-500'}`}
            >
              Address & Billing
            </button>
            <button
              onClick={() => setActiveTab('notifications')}
              className={`font-semibold px-3 py-2 rounded ${activeTab === 'notifications' ? 'bg-blue-500 text-white' : ' text-gray-500'}`}
            >
              Notifications
            </button>
          </div>
          {activeTab === 'overview' && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white rounded-xl shadow p-4 ">
                  <div className="text-sm font-medium text-gray-700">
                    Account Balance
                  </div>
                  <div className="text-indigo-600 font-bold text-lg">$2345</div>
                  <div className="text-xs text-gray-500">
                    Account balance for next purchase
                  </div>
                </div>
                <div className="bg-white rounded-xl shadow p-4 ">
                  <div className="text-sm font-medium text-gray-700">
                    Loyalty Program
                  </div>
                  <div className="text-xs bg-green-100 text-green-700 inline-block rounded px-2 py-0.5 my-1">
                    Platinum member
                  </div>
                  <div className="text-xs text-gray-500">
                    3000 points to next tier
                  </div>
                </div>
                <div className="bg-white rounded-xl shadow p-4 ">
                  <div className="text-sm font-medium text-gray-700">
                    Wishlist
                  </div>
                  <div className="text-pink-600 font-bold text-lg">15</div>
                  <div className="text-xs text-gray-500">Items in wishlist</div>
                </div>
                <div className="bg-white rounded-xl shadow p-4 ">
                  <div className="text-sm font-medium text-gray-700">
                    Coupons
                  </div>
                  <div className="text-blue-600 font-bold text-lg">21</div>
                  <div className="text-xs text-gray-500">
                    Use coupon on next purchase
                  </div>
                </div>
              </div>

              <div className="p-4 bg-white rounded-xl shadow ">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xl font-semibold ">Orders placed</h3>
                  <input
                    type="text"
                    placeholder="Search..."
                    className="border border-gray-300 rounded px-3 py-2 w-64"
                  />
                </div>
                <div className="overflow-x-auto mt-4">
                  <table className="text-left w-full text-sm">
                    <thead>
                      <tr className="text-gray-500 border-b">
                        <th className="py-2 px-2">ORDER</th>
                        <th className="py-2 px-2">DATE</th>
                        <th className="py-2 px-2">STATUS</th>
                        <th className="py-2 px-2">SPENT</th>
                        <th className="py-2 px-2">ACTION</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedUsers.map((info, index) => (
                        <tr key={info.id} className="border-b">
                          <td className="px-4 py-2">{info.id}</td>
                          <td className="px-4 py-2">{info.date}</td>
                          <td className="px-4 py-2">
                            <Badge
                              text={info.status}
                              color={info.statusColor}
                            />
                          </td>
                          <td className="px-4 py-2">{info.spent}</td>

                          <td className="py-2 px-2">
                            <div className="relative inline-block text-left">
                              <button
                                className="hover:bg-gray-200 p-2 rounded-full"
                                onClick={() =>
                                  setShowMenu(showMenu === index ? null : index)
                                }
                              >
                                <MoreVertical className="w-4 h-4 text-gray-500" />
                              </button>

                              {showMenu === index && (
                                <div className="absolute right-0 mt-2 w-32 bg-white border rounded shadow z-20">
                                  <button
                                    onClick={() => handleView(info.id)}
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                  >
                                    View
                                  </button>
                                  <button
                                    onClick={() => handleDelete(info.id)}
                                    className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full text-left"
                                  >
                                    Delete
                                  </button>
                                </div>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="flex justify-end mt-4 space-x-2 items-center">
                    <button
                      onClick={() => setCurrentPage(1)}
                      disabled={currentPage === 1}
                      className="text-gray-400 disabled:opacity-30"
                    >
                      <MdSkipPrevious />
                    </button>
                    <button
                      onClick={() =>
                        setCurrentPage((prev) => Math.max(prev - 1, 1))
                      }
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
              </div>
            </>
          )}
          {activeTab === 'security' && (
            <div>
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">
                    Change Password
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="relative">
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="New Password"
                      />
                      <div
                        className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                        onClick={() => setShowPassword((prev) => !prev)}
                      >
                        {showPassword ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </div>
                    </div>
                    <div className="relative">
                      <Input
                        type={showPassword1 ? 'text' : 'password'}
                        placeholder="Confirm Password"
                      />
                      <div
                        className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                        onClick={() => setShowPassword1((prev) => !prev)}
                      >
                        {showPassword1 ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="mt-5">
                    <button className="bg-blue-500 px-3 py-2 rounded text-white hover:bg-blue-700">
                      Change Password
                    </button>
                  </div>
                </CardContent>
              </Card>

              <Card className="mt-5">
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">
                    Two-steps verification
                  </h2>
                  <p className="text-sm text-gray-500 mb-2">
                    Keep your account secure with authentication step.
                  </p>
                  <div className="relative">
                    <Input placeholder="+1(968) 945-8832" />
                  </div>
                </CardContent>
              </Card>

              <Card className="mt-5">
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Recent Devices</h2>
                  <div className="overflow-x-auto">
                    <table className="min-w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-2 text-gray-500">
                            BROWSER
                          </th>
                          <th className="text-left p-2 text-gray-500">
                            DEVICE
                          </th>
                          <th className="text-left p-2 text-gray-500">
                            LOCATION
                          </th>
                          <th className="text-left p-2 text-gray-500">
                            RECENT ACTIVITIES
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          {
                            icon: (
                              <IoLogoWindows className="text-blue-500 text-xl" />
                            ),
                            browser: 'Chrome on Windows',
                            device: 'HP Spectre 360',
                            location: 'Switzerland',
                            activity: '10, July 2021 20:07',
                          },
                          {
                            icon: (
                              <FiSmartphone className="text-primary text-xl" />
                            ),
                            browser: 'Chrome on iPhone',
                            device: 'iPhone 12x',
                            location: 'Australia',
                            activity: '13, July 2021 10:10',
                          },
                          {
                            icon: (
                              <BsAndroid2 className="text-green-500 text-xl" />
                            ),
                            browser: 'Chrome on Android',
                            device: 'Oneplus 9 Pro',
                            location: 'Dubai',
                            activity: '14, July 2021 15:15',
                          },
                          {
                            icon: <RiAppleLine className="text- text-xl" />,
                            browser: 'Chrome on MacOS',
                            device: 'Apple iMac',
                            location: 'India',
                            activity: '16, July 2021 16:17',
                          },
                        ].map((row, idx) => (
                          <tr key={idx} className="border-b hover:bg-gray-100">
                            <td className="p-2 flex items-center gap-2">
                              {row.icon}
                              {row.browser}
                            </td>
                            <td className="p-2">{row.device}</td>
                            <td className="p-2">{row.location}</td>
                            <td className="p-2">{row.activity}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
          {activeTab === 'address' && (
            <div>
              <Card className="mb-5">
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Address Book</h2>
                  </div>
                  <div className="space-y-4">
                    {addresses.map((addr, idx) => (
                      <div key={idx} className="border-b pb-3">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => toggleDetails(idx)}
                              className="text-gray-500 hover:text-gray-700"
                            >
                              {expandedIndex === idx ? (
                                <FaChevronDown />
                              ) : (
                                <FaChevronRight />
                              )}
                            </button>
                            <div>
                              <div className="flex items-center gap-2 font-medium">
                                <span>{addr.label}</span>
                                {addr.isDefault && (
                                  <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                                    Default Address
                                  </span>
                                )}
                              </div>
                              <div className="text-sm text-gray-500">
                                {addr.address}
                              </div>
                            </div>
                          </div>
                        </div>
                        {expandedIndex === idx && (
                          <div className="mt-2 text-sm text-gray-600 pl-8">
                            {addr.details}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Payment Methods</h2>
                  </div>
                  <div className="space-y-4">
                    {payments.map((pm, idx) => (
                      <div key={idx} className="border-b pb-3">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => toggleDetails(idx)}
                              className="text-gray-500 hover:text-gray-700"
                            >
                              {expandedIndex === idx ? (
                                <FaChevronDown />
                              ) : (
                                <FaChevronRight />
                              )}
                            </button>
                            <div>
                              <div className="flex items-center gap-2 font-medium">
                                <span>{pm.brand}</span>
                                {pm.isPrimary && (
                                  <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                                    Primary
                                  </span>
                                )}
                              </div>
                              <div className="text-sm text-gray-500">
                                {pm.info}
                              </div>
                            </div>
                          </div>
                        </div>
                        {expandedIndex === idx && (
                          <div className="mt-2 text-sm text-gray-600 pl-8">
                            <p>Card Number: **** **** **** 1234</p>
                            <p>
                              Billing Address: 123 Main Street, City, Country
                            </p>
                            <p>Expiration Date: {pm.info}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
          {activeTab === 'notifications' && (
            <div>
              <Card>
                <CardContent className="p-4">
                  <h2 className="text-xl font-semibold mb-1">Notifications</h2>
                  <p className="text-sm text-gray-500 mb-4">
                    You will receive notification for the below selected items.
                  </p>

                  <div className="overflow-x-auto">
                    <table className="min-w-full text-sm">
                      <thead className="text-left border-b">
                        <tr>
                          <th className="py-2">TYPE</th>
                          <th className="py-2 text-center">EMAIL</th>
                          <th className="py-2 text-center">BROWSER</th>
                          <th className="py-2 text-center">APP</th>
                        </tr>
                      </thead>
                      <tbody>
                        {settings.map((row, i) => (
                          <tr key={i} className="border-b">
                            <td className="py-2">{row.type}</td>
                            <td className="py-2 text-center">
                              <input
                                type="checkbox"
                                checked={row.email}
                                onChange={() => toggle(i, 'email')}
                                className="accent-blue-500 w-4 h-4"
                              />
                            </td>
                            <td className="py-2 text-center">
                              <input
                                type="checkbox"
                                checked={row.browser}
                                onChange={() => toggle(i, 'browser')}
                                className="accent-blue-500 w-4 h-4"
                              />
                            </td>
                            <td className="py-2 text-center">
                              <input
                                type="checkbox"
                                checked={row.app}
                                onChange={() => toggle(i, 'app')}
                                className="accent-blue-500 w-4 h-4"
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="flex items-center gap-2 mt-6">
                    <button className="bg-blue-500 hover:bg-blue-600 text-white rounded px-4 py-2">
                      Save changes
                    </button>
                    <button className="text-gray-500 border rounded px-4 py-2 hover:bg-gray-100">
                      Discard
                    </button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default UserDetails;
