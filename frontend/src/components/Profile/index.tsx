import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LogoutDialog from '../LogoutDialog';
import { logout } from '../../services/auth.services';
import { toast } from 'react-toastify';
import { useAuth } from '../../contexts/AuthContext';

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const { logout: authLogout } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [activeForm, setActiveForm] = useState<string>('profile');
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await logout();
      authLogout();
      toast.success('Đăng xuất thành công');
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Đăng xuất thất bại. Vui lòng thử lại.');
    } finally {
      setIsLoggingOut(false);
      setIsLogoutDialogOpen(false);
    }
  };

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  const [isDefault, setIsDefault] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
    }
  };

  return (
    <div className="mt-5 flex flex-col md:flex-row p-6 bg-white rounded-2xl shadow-md max-w-6xl mx-auto">
      <div className="w-full md:w-1/4 border-r border-gray-200 pr-6">
        <div className="text-lg font-medium mb-6">@User Name</div>
        <ul className="space-y-3 text-gray-700">
          <li>
            <button
              onClick={() => setActiveForm('profile')}
              className={`${
                activeForm === 'profile' ? 'font-semibold text-red-500' : ''
              }`}
            >
              Profile
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveForm('bank')}
              className={`${
                activeForm === 'bank' ? 'font-semibold text-red-500' : ''
              }`}
            >
              Bank
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveForm('address')}
              className={`${
                activeForm === 'address' ? 'font-semibold text-red-500' : ''
              }`}
            >
              Address
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveForm('password')}
              className={`${
                activeForm === 'password' ? 'font-semibold text-red-500' : ''
              }`}
            >
              Change Password
            </button>
          </li>
          <li>
            <button
              onClick={() => setIsLogoutDialogOpen(true)}
              className={`${
                activeForm === 'logout' ? 'font-semibold text-red-500' : ''
              }`}
              disabled={isLoggingOut}
            >
              {isLoggingOut ? 'Logging out...' : 'Logout'}
            </button>
          </li>
        </ul>
      </div>

      <div className="flex-1 pl-6">
        {activeForm === 'profile' && (
          <div>
            <h2 className="text-xl font-semibold mb-2">My Profile</h2>
            <p className="text-sm text-gray-500 mb-6">
              Manage your profile information to secure your account
            </p>
            <form className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Username
                  </label>
                  <input
                    type="text"
                    value="lo siento"
                    className="w-full p-2 border rounded-md bg-gray-100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded-md"
                    placeholder="Name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <button className="text-blue-500">Add</button>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone number
                  </label>
                  <div className="flex items-center space-x-2">
                    <span>********92</span>
                    <button className="text-blue-500 text-sm">Change</button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Gender
                  </label>
                  <div className="flex space-x-4">
                    <label className="flex items-center space-x-1">
                      <input type="radio" name="gender" /> <span>Male</span>
                    </label>
                    <label className="flex items-center space-x-1">
                      <input type="radio" name="gender" /> <span>Female</span>
                    </label>
                    <label className="flex items-center space-x-1">
                      <input type="radio" name="gender" /> <span>Other</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date of Birth
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <select className="p-2 border rounded-md">
                      <option>Day</option>
                    </select>
                    <select className="p-2 border rounded-md">
                      <option>Month</option>
                    </select>
                    <select className="p-2 border rounded-md">
                      <option>Year</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 mb-4 overflow-hidden">
                  {selectedImage ? (
                    <img
                      src={selectedImage}
                      alt="Selected"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-4xl">👤</span>
                  )}
                </div>
                <button
                  onClick={handleButtonClick}
                  type="button"
                  className="bg-gray-100 px-4 py-2 rounded-md border border-gray-300 text-sm"
                >
                  Choose Image
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept="image/jpeg, image/png"
                  onChange={handleFileChange}
                />
                <p className="text-xs text-gray-500 mt-2 text-center">
                  Max file size 1 MB
                  <br />
                  Formats: .JPEG, .PNG
                </p>
              </div>

              <div className="md:col-span-3 flex justify-end mt-4">
                <button
                  type="submit"
                  className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        )}

        {activeForm === 'bank' && (
          <div>
            <h2 className="text-xl font-semibold mb-2">Bank Information</h2>
            <p className="text-sm text-gray-500 mb-6">
              Manage your bank information
            </p>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bank Name
                </label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-md"
                  placeholder="Bank Name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Account Number
                </label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-md"
                  placeholder="Account Number"
                />
              </div>
              <div className="md:col-span-3 flex justify-end mt-4 me-4">
                <button
                  type="submit"
                  className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600"
                >
                  Add Bank
                </button>
              </div>
            </form>
            <hr className="mt-5 mb-3" />
            <h2 className="text-l font-semibold mb-2">Linked Bank</h2>
            <div className="flex items-start justify-between border rounded-lg p-4 shadow-sm max-w-4xl bg-white me-4 mt-4">
              <div className="flex items-start space-x-4 ">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/VCB_Logo.svg/2048px-VCB_Logo.svg.png"
                  alt="VCB"
                  className="w-12 h-12 object-contain rounded"
                />

                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-gray-800">
                      VCB - JSC BANK FOR FOREIGN TRADE OF VIE...
                    </span>
                    <span className="text-xs text-gray-400">Verified</span>
                    <span className="text-xs bg-teal-500 text-white px-2 py-0.5 rounded">
                      Default
                    </span>
                  </div>
                  <div className="mt-1 text-sm text-gray-700">
                    <span className="font-medium">Full Name:</span> Duong Van
                    Toan
                  </div>
                  <div className="text-sm text-gray-500">
                    Branch: CN Da Nang (Vietcombank)
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-end space-y-1">
                <div className="text-lg font-medium text-gray-800">*3422</div>
                <button className="text-sm text-blue-600 hover:underline">
                  Delete
                </button>
                <button
                  className="text-sm text-gray-400 bg-gray-100 border border-gray-300 px-3 py-1 rounded cursor-not-allowed"
                  disabled
                >
                  Set as Default
                </button>
              </div>
            </div>
          </div>
        )}

        {activeForm === 'address' && (
          <>
            <h2 className="text-xl font-semibold mb-2">My Address</h2>
            <p className="text-sm text-gray-500 mb-6">Manage your address</p>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Recipient&apos;s Full Name
                </label>
                <input
                  type="text"
                  placeholder="e.g., Nguyen Van A"
                  className="w-full p-2 border rounded-md"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="text"
                  placeholder="e.g., 0912345678"
                  className="w-full p-2 border rounded-md"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Province/City
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Da Nang"
                    className="w-full p-2 border rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    District
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Hai Chau"
                    className="w-full p-2 border rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ward/Commune
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Phuoc Ninh"
                    className="w-full p-2 border rounded-md"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Specific Address
                </label>
                <input
                  type="text"
                  placeholder="e.g., 123 Le Duan Street"
                  className="w-full p-2 border rounded-md"
                />
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="defaultAddress"
                  checked={isDefault}
                  onChange={() => setIsDefault(!isDefault)}
                  className="accent-red-500"
                />
                <label
                  htmlFor="defaultAddress"
                  className="text-sm text-gray-700"
                >
                  Set as default address
                </label>
              </div>

              <div className="flex justify-end space-x-3 pt-2">
                <button
                  type="button"
                  className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600"
                >
                  Save
                </button>
              </div>
            </form>
            <hr className="mt-5 mb-3" />
            <h2 className="text-l font-semibold mb-2">Saved Address</h2>
            <div className="flex justify-between items-start bg-white border rounded-lg p-4  shadow-sm">
              <div className="space-y-1">
                <div className="font-semibold text-gray-900">
                  duong van toan{' '}
                  <span className="text-gray-500 text-sm ml-2">
                    (+84) 867 727 861
                  </span>
                </div>
                <div className="text-gray-700 text-sm">86 Khanh An 1</div>
                <div className="text-gray-700 text-sm">
                  Hoa Khanh Bac Ward, Lien Chieu District, Da Nang
                </div>

                <div className="inline-block mt-1">
                  <span className="text-red-500 border border-red-500 px-2 py-0.5 text-xs rounded">
                    Default
                  </span>
                </div>
              </div>

              <div className="flex flex-col items-end space-y-2">
                <button className="text-blue-600 text-sm hover:underline">
                  Update
                </button>
                <button className="border px-3 py-1 text-sm rounded hover:bg-gray-100">
                  Set as Default
                </button>
              </div>
            </div>
          </>
        )}

        {activeForm === 'password' && (
          <>
            <h2 className="text-xl font-semibold mb-2">Change Password</h2>
            <p className="text-sm text-gray-500 mb-6">
              For your account&apos;s security, please do not share your
              password with others.
            </p>
            <div className="max-w-md mx-auto space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Enter current password
                </label>
                <input type="text" className="w-full p-2 border rounded-md" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Enter new password
                </label>
                <input type="text" className="w-full p-2 border rounded-md" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm new password
                </label>
                <input type="text" className="w-full p-2 border rounded-md" />
              </div>
              <div className="text-end">
                <button className="w-32 px-4 py-2 rounded text-white bg-red-500 hover:bg-red-600">
                  Confirm
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      <LogoutDialog
        open={isLogoutDialogOpen}
        onClose={() => setIsLogoutDialogOpen(false)}
        onConfirm={handleLogout}
        isLoading={isLoggingOut}
      />
    </div>
  );
};

export default Profile;
