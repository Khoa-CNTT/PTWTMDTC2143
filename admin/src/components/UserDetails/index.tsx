import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Input } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Eye, EyeOff } from 'lucide-react';
import { userService, User } from '../../services/userService';

const UserDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      if (!id) return;
      try {
        setIsLoading(true);
        const userData = await userService.getUserById(id);
        setUser(userData);
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  const handleDelete = async () => {
    if (!id) return;
    try {
      await userService.deleteUser(id);
      navigate('/users');
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  if (isLoading || !user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6">
      {/* Header Section */}
      <div className="bg-white shadow-md p-4 mb-6">
        <div className="flex justify-between items-center">
          <div>
            <div className="text-[30px] text-gray-800 mb-1">User Details</div>
            <div className="text-[15px] text-gray-400">ID: {user.id}</div>
          </div>
          <button
            onClick={handleDelete}
            className="bg-red-100 text-red-500 hover:bg-red-200 font-medium px-3 py-2 rounded flex items-center gap-1 justify-center"
          >
            Delete User
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* User Profile Card */}
        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex flex-col items-center justify-center gap-2 mb-4">
            <div>
              <img
                src={
                  user.avatar ||
                  `https://i.pravatar.cc/150?img=${user.id.slice(0, 2)}`
                }
                className="w-[125px] h-[125px] rounded-xl"
                alt="avatar"
              />
              <div className="font-semibold text-center mt-3">{user.name}</div>
              <div className="text-xs text-gray-500 text-center">
                {user.email}
              </div>
            </div>
          </div>

          <h2 className="font-semibold text-xl mb-4">Account Information</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-600">Status</span>
              <span
                className={`px-2 py-1 rounded text-xs font-semibold ${
                  user.status === 'ACTIVE'
                    ? 'bg-green-100 text-green-600'
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                {user.status}
              </span>
            </div>

            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-600">Phone</span>
              <span className="font-medium">
                {user.phone || 'Not provided'}
              </span>
            </div>

            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-600">Email Verified</span>
              <span
                className={`px-2 py-1 rounded text-xs font-semibold ${
                  user.isVerified
                    ? 'bg-green-100 text-green-600'
                    : 'bg-yellow-100 text-yellow-600'
                }`}
              >
                {user.isVerified ? 'Verified' : 'Not Verified'}
              </span>
            </div>

            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-600">Role</span>
              <span className="px-2 py-1 rounded text-xs font-semibold bg-blue-100 text-blue-600">
                {user.roles?.[0]?.name || 'USER'}
              </span>
            </div>
          </div>
        </div>

        {/* Security Settings Card */}
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Security Settings</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="relative">
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="New Password"
                      fullWidth
                    />
                    <div
                      className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </div>
                  </div>
                  <div className="relative">
                    <Input
                      type={showPassword1 ? 'text' : 'password'}
                      placeholder="Confirm Password"
                      fullWidth
                    />
                    <div
                      className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                      onClick={() => setShowPassword1(!showPassword1)}
                    >
                      {showPassword1 ? <EyeOff size={18} /> : <Eye size={18} />}
                    </div>
                  </div>
                </div>
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
                  Update Password
                </button>
              </div>
            </CardContent>
          </Card>

          {/* Account Activity Card */}
          <Card className="mt-6">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Account Activity</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-600">Created At</span>
                  <span className="font-medium">
                    {new Date(user.createdAt).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-600">Last Updated</span>
                  <span className="font-medium">
                    {new Date(user.updatedAt).toLocaleString()}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
