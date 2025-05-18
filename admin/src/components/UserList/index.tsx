import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MoreVertical } from 'lucide-react';
import {
  MdOutlineNavigateNext,
  MdSkipNext,
  MdOutlineNavigateBefore,
  MdSkipPrevious,
} from 'react-icons/md';
import Switch from '@mui/material/Switch';
const allUsers = [
  {
    name: 'Cristine Easom',
    email: 'ceasomw@theguardian.com',
    userid: '#6979',
    country: 'Viet Nam',
    order: '558',
    totalspent: '$ 1,000',
    avatar: 'https://i.pravatar.cc/40?img=1',
    flag: 'https://flagcdn.com/vn.svg',
    status: 'Active',
  },
  ...Array.from({ length: 28 }, (_, i) => ({
    name: `Customer ${i + 1}`,
    email: `email${i + 1}@example.com`,
    userid: `#6${700 + i}`,
    country: i % 2 === 0 ? 'USA' : 'Canada',
    order: `${300 + i}`,
    totalspent: `$ ${(i + 1) * 100}`,
    avatar: `https://i.pravatar.cc/40?img=${i + 2}`,
    flag: 'https://flagcdn.com/vn.svg',
    status: i % 2 === 0 ? 'Active' : 'Inactive',
  })),
];

const UserList = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState(allUsers);
  const [showMenu, setShowMenu] = useState<number | null>(null);

  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(users.length / itemsPerPage);

  const paginatedUsers = users.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleView = () => {
    navigate(`/user-details`);
  };

  const handleDelete = (userid: string) => {
    const updatedUsers = users.filter((user) => user.userid !== userid);
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

  return (
    <div className="p-4">
      <div className="bg-white rounded-lg shadow p-4 mb-5">
        <h2 className="text-2xl font-semibold">User List</h2>
      </div>

      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex items-center justify-between mb-4">
          <input
            type="text"
            placeholder="Search User"
            className="border rounded px-3 py-2 w-64"
          />
          <div className="flex items-center gap-2">
            <select className="border rounded px-2 py-1">
              <option>10</option>
              <option>25</option>
              <option>50</option>
            </select>
            <button className="border rounded px-3 py-1 text-sm bg-gray-100">
              Export
            </button>
          </div>
        </div>

        <table className="w-full text-left text-sm relative">
          <thead>
            <tr className="text-gray-500 border-b">
              <th className="py-2 px-2">CUSTOMER</th>
              <th className="py-2 px-2">CUSTOMER ID</th>
              <th className="py-2 px-2">COUNTRY</th>
              <th className="py-2 px-2">ORDERS</th>
              <th className="py-2 px-2 text-center">TOTAL SPENT</th>
              <th className="py-2 px-2 text-center">STATUS</th>
              <th className="py-2 px-2 text-center">STATUS CONTROL</th>
              <th className="py-2 px-2 ">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {paginatedUsers.map((user, index) => (
              <tr className="border-b relative" key={index}>
                <td className="py-2 px-2 flex items-center gap-2">
                  <img
                    src={user.avatar}
                    className="w-8 h-8 rounded-full"
                    alt="avatar"
                  />
                  <div>
                    <div className="font-medium">{user.name}</div>
                    <div className="text-xs text-gray-500">{user.email}</div>
                  </div>
                </td>
                <td className="py-2 px-2">{user.userid}</td>
                <td className="py-2 px-2 flex items-center gap-2">
                  <img
                    src={user.flag}
                    className="w-8 h-8 rounded-full"
                    alt="avatar"
                  />
                  {user.country}
                </td>
                <td className="py-2 px-2">{user.order}</td>
                <td className="py-2 px-2 text-center">{user.totalspent}</td>
                <td className="py-2 px-2 text-center">
                  <span
                    className={`px-2 py-1 rounded text-xs font-semibold ${
                      user.status === 'Active'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-200 text-gray-500'
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="py-2 px-2 text-center">
                  <Switch
                    checked={user.status === 'Active'}
                    onChange={() => {
                      setUsers((users) =>
                        users.map((u) =>
                          u.userid === user.userid
                            ? {
                                ...u,
                                status:
                                  u.status === 'Active' ? 'Inactive' : 'Active',
                              }
                            : u
                        )
                      );
                    }}
                    color="primary"
                  />
                </td>
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
                          onClick={handleView}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                        >
                          View
                        </button>
                        <button
                          onClick={() => handleDelete(user.userid)}
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
    </div>
  );
};

export default UserList;
