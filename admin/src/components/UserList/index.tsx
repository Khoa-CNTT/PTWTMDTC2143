import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { MoreVertical } from 'lucide-react';
import {
  MdOutlineNavigateNext,
  MdSkipNext,
  MdOutlineNavigateBefore,
  MdSkipPrevious,
} from 'react-icons/md';
import Switch from '@mui/material/Switch';
import { userService, User } from '../../services/userService';

const UserList = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [showMenu, setShowMenu] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [totalUsers, setTotalUsers] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const itemsPerPage = 10;

  const fetchUsers = useCallback(async (page: number) => {
    try {
      setIsLoading(true);
      const response = await userService.getAllUsers(itemsPerPage);
      if (response && response.users) {
        setUsers(response.users);
        setTotalUsers(response.total);
        setNextCursor(response.nextCursor);
      } else {
        setUsers([]);
        setTotalUsers(0);
        setError('Invalid response format from server');
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      setError('Failed to fetch users');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers(currentPage);
  }, [currentPage, fetchUsers]);

  const handleView = (userId: string) => {
    navigate(`/user-details/${userId}`);
  };

  const handleDelete = async (userId: string) => {
    try {
      await userService.deleteUser(userId);
      setUsers(users.filter((user) => user.id !== userId));
      setShowMenu(null);
    } catch (error) {
      console.error('Error deleting user:', error);
      setError('Failed to delete user');
    }
  };

  const handleStatusChange = async (
    userId: string,
    currentStatus: 'ACTIVE' | 'INACTIVE'
  ) => {
    try {
      const newStatus = currentStatus === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';
      const updatedUser = await userService.updateUserStatus(userId, newStatus);
      setUsers(
        users.map((user) =>
          user.id === userId ? { ...user, status: updatedUser.status } : user
        )
      );
    } catch (error) {
      console.error('Error updating user status:', error);
      setError('Failed to update user status');
    }
  };

  const handlePageChange = async (page: number) => {
    setCurrentPage(page);
    setShowMenu(null);
    try {
      setIsLoading(true);
      const response = await userService.getAllUsers(
        itemsPerPage,
        nextCursor || undefined
      );
      if (response && response.users) {
        setUsers(response.users);
        setTotalUsers(response.total);
        setNextCursor(response.nextCursor);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      setError('Failed to fetch users');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-red-600">{error}</div>
      </div>
    );
  }

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

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-gray-500 border-b">
                <th className="py-2 px-2">CUSTOMER</th>
                <th className="py-2 px-2">CUSTOMER ID</th>
                <th className="py-2 px-2">COUNTRY</th>
                <th className="py-2 px-2">ORDERS</th>
                <th className="py-2 px-2 text-center">TOTAL SPENT</th>
                <th className="py-2 px-2 text-center">STATUS</th>
                <th className="py-2 px-2 text-center">STATUS CONTROL</th>
                <th className="py-2 px-2">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {users && users.length > 0 ? (
                users.map((user, index) => (
                  <tr className="border-b relative" key={user.id}>
                    <td className="py-2 px-2 flex items-center gap-2">
                      <img
                        src={
                          user.avatar ||
                          `https://i.pravatar.cc/40?img=${index + 1}`
                        }
                        className="w-8 h-8 rounded-full"
                        alt="avatar"
                      />
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-xs text-gray-500">
                          {user.email}
                        </div>
                      </div>
                    </td>
                    <td className="py-2 px-2">#{user.id.slice(0, 4)}</td>
                    <td className="py-2 px-2 flex items-center gap-2">
                      <img
                        src={
                          user.country
                            ? `https://flagcdn.com/${user.country.toLowerCase()}.svg`
                            : 'https://flagcdn.com/vn.svg'
                        }
                        className="w-8 h-8 rounded-full"
                        alt="flag"
                      />
                      {user.country || 'Unknown'}
                    </td>
                    <td className="py-2 px-2">{user.orders || 0}</td>
                    <td className="py-2 px-2 text-center">
                      ${user.totalSpent || 0}
                    </td>
                    <td className="py-2 px-2 text-center">
                      <span
                        className={`px-2 py-1 rounded text-xs font-semibold ${
                          user.status === 'ACTIVE'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-gray-200 text-gray-500'
                        }`}
                      >
                        {user.status}
                      </span>
                    </td>
                    <td className="py-2 px-2 text-center">
                      <Switch
                        checked={user.status === 'ACTIVE'}
                        onChange={() =>
                          handleStatusChange(user.id, user.status)
                        }
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
                              onClick={() => handleView(user.id)}
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                            >
                              View
                            </button>
                            <button
                              onClick={() => handleDelete(user.id)}
                              className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full text-left"
                            >
                              Delete
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="text-center py-4 text-gray-500">
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {users && users.length > 0 && (
          <div className="flex justify-end mt-4 space-x-2 items-center">
            <button
              onClick={() => handlePageChange(1)}
              disabled={currentPage === 1}
              className="text-gray-400 disabled:opacity-30"
            >
              <MdSkipPrevious />
            </button>
            <button
              onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
              disabled={currentPage === 1}
              className="text-gray-400 disabled:opacity-30"
            >
              <MdOutlineNavigateBefore />
            </button>

            {Array.from(
              { length: Math.ceil(totalUsers / itemsPerPage) },
              (_, i) => (
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
              )
            )}

            <button
              onClick={() =>
                handlePageChange(
                  Math.min(
                    currentPage + 1,
                    Math.ceil(totalUsers / itemsPerPage)
                  )
                )
              }
              disabled={currentPage === Math.ceil(totalUsers / itemsPerPage)}
              className="text-gray-400 disabled:opacity-30"
            >
              <MdOutlineNavigateNext />
            </button>
            <button
              onClick={() =>
                handlePageChange(Math.ceil(totalUsers / itemsPerPage))
              }
              disabled={currentPage === Math.ceil(totalUsers / itemsPerPage)}
              className="text-gray-400 disabled:opacity-30"
            >
              <MdSkipNext />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserList;
