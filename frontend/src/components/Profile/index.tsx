import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LogoutDialog from '../LogoutDialog';
import { logout } from '../../services/auth.services';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../../contexts/AuthContext';

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const { logout: authLogout } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [activeForm, setActiveForm] = useState<string>('profile');
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [formData, setFormData] = useState({
    username: 'lo siento',
    name: '',
    email: '',
    phone: '********92',
    gender: '',
    birthDay: '',
    birthMonth: '',
    birthYear: '',
  });

  const handleLogout = async () => {
    const toastId = toast.loading('Đang đăng xuất...', {
      position: 'top-center',
      autoClose: false,
      closeButton: false,
    });

    try {
      setIsLoggingOut(true);

      // Thêm delay 1 giây để người dùng thấy trạng thái loading
      await new Promise((resolve) => setTimeout(resolve, 1000));

      await logout(authLogout);

      // Đóng dialog và thông báo thành công
      setIsLogoutDialogOpen(false);

      // Thêm delay 0.5 giây trước khi hiển thị thông báo thành công
      await new Promise((resolve) => setTimeout(resolve, 500));

      toast.update(toastId, {
        render: 'Đăng xuất thành công',
        type: 'success',
        isLoading: false,
        autoClose: 2000,
        closeButton: true,
      });

      // Thêm delay 1 giây trước khi chuyển trang
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Chuyển hướng về trang login
      navigate('/login', { replace: true });
    } catch (error) {
      console.error('Logout error:', error);
      toast.update(toastId, {
        render: 'Đăng xuất thất bại. Vui lòng thử lại.',
        type: 'error',
        isLoading: false,
        autoClose: 3000,
        closeButton: true,
      });
    } finally {
      setIsLoggingOut(false);
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

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        limit={1}
      />

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
                Hồ Sơ
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveForm('address')}
                className={`${
                  activeForm === 'address' ? 'font-semibold text-red-500' : ''
                }`}
              >
                Địa Chỉ
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveForm('password')}
                className={`${
                  activeForm === 'password' ? 'font-semibold text-red-500' : ''
                }`}
              >
                Đổi Mật Khẩu
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
                {isLoggingOut ? 'Đang đăng xuất...' : 'Đăng Xuất'}
              </button>
            </li>
          </ul>
        </div>

        <div className="flex-1 pl-6">
          {activeForm === 'profile' && (
            <div>
              <h2 className="text-xl font-semibold mb-2">Hồ Sơ Của Tôi</h2>
              <p className="text-sm text-gray-500 mb-6">
                Quản lý thông tin hồ sơ để bảo mật tài khoản
              </p>
              <form className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Tên đăng nhập
                    </label>
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded-md bg-gray-100"
                      readOnly
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Tên
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded-md"
                      placeholder="Tên"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded-md"
                      placeholder="Email"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Số điện thoại
                    </label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded-md"
                        readOnly
                      />
                      <button className="text-blue-500 text-sm">
                        Thay Đổi
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Giới tính
                    </label>
                    <div className="flex space-x-4">
                      <label className="flex items-center space-x-1">
                        <input
                          type="radio"
                          name="gender"
                          value="male"
                          checked={formData.gender === 'male'}
                          onChange={handleInputChange}
                        />
                        <span>Nam</span>
                      </label>
                      <label className="flex items-center space-x-1">
                        <input
                          type="radio"
                          name="gender"
                          value="female"
                          checked={formData.gender === 'female'}
                          onChange={handleInputChange}
                        />
                        <span>Nữ</span>
                      </label>
                      <label className="flex items-center space-x-1">
                        <input
                          type="radio"
                          name="gender"
                          value="other"
                          checked={formData.gender === 'other'}
                          onChange={handleInputChange}
                        />
                        <span>Khác</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Ngày sinh
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      <select className="p-2 border rounded-md">
                        <option>Ngày</option>
                      </select>
                      <select className="p-2 border rounded-md">
                        <option>Tháng</option>
                      </select>
                      <select className="p-2 border rounded-md">
                        <option>Năm</option>
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
                    Chọn Ảnh
                  </button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/jpeg, image/png"
                    onChange={handleFileChange}
                  />
                  <p className="text-xs text-gray-500 mt-2 text-center">
                    Dung lượng file tối đa 1 MB
                    <br />
                    Định dạng: .JPEG, .PNG
                  </p>
                </div>

                <div className="md:col-span-3 flex justify-end mt-4">
                  <button
                    type="submit"
                    className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600"
                  >
                    Lưu
                  </button>
                </div>
              </form>
            </div>
          )}
          {activeForm === 'bank' && (
            <div>
              <h2 className="text-xl font-semibold mb-2">
                Thông Tin Ngân Hàng
              </h2>
              <p className="text-sm text-gray-500 mb-6">
                Quản lý thông tin ngân hàng của bạn
              </p>
              <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tên Ngân Hàng
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded-md"
                    placeholder="Tên Ngân Hàng"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Số Tài Khoản
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded-md"
                    placeholder="Số Tài Khoản"
                  />
                </div>
                <div className="md:col-span-3 flex justify-end mt-4 me-4">
                  <button
                    type="submit"
                    className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600"
                  >
                    Thêm Ngân Hàng
                  </button>
                </div>
              </form>
              <hr className="mt-5 mb-3" />
              <h2 className="text-l font-semibold mb-2">
                Ngân Hàng Đã Liên Kết
              </h2>
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
                        VCB - NH TMCP NGOAI THUONG VIE...
                      </span>
                      <span className="text-xs text-gray-400">Đã kiểm tra</span>
                      <span className="text-xs bg-teal-500 text-white px-2 py-0.5 rounded">
                        Mặc Định
                      </span>
                    </div>
                    <div className="mt-1 text-sm text-gray-700">
                      <span className="font-medium">Họ Và Tên:</span> Duong Van
                      Toan
                    </div>
                    <div className="text-sm text-gray-500">
                      Chi nhánh: CN Da Nang (Vietcombank)
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-end space-y-1">
                  <div className="text-lg font-medium text-gray-800">*3422</div>
                  <button className="text-sm text-blue-600 hover:underline">
                    Xóa
                  </button>
                  <button
                    className="text-sm text-gray-400 bg-gray-100 border border-gray-300 px-3 py-1 rounded cursor-not-allowed"
                    disabled
                  >
                    Thiết Lập Mặc Định
                  </button>
                </div>
              </div>
            </div>
          )}
          {activeForm === 'address' && (
            <>
              <h2 className="text-xl font-semibold mb-2">Địa Chỉ Của Tôi</h2>
              <p className="text-sm text-gray-500 mb-6">
                Quản lý địa chỉ của bạn
              </p>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Họ và Tên người nhận
                  </label>
                  <input
                    type="text"
                    placeholder="VD: Nguyễn Văn A"
                    className="w-full p-2 border rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Số điện thoại
                  </label>
                  <input
                    type="text"
                    placeholder="VD: 0912345678"
                    className="w-full p-2 border rounded-md"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Tỉnh/Thành phố
                    </label>
                    <input
                      type="text"
                      placeholder="VD: Đà Nẵng"
                      className="w-full p-2 border rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Quận/Huyện
                    </label>
                    <input
                      type="text"
                      placeholder="VD: Hải Châu"
                      className="w-full p-2 border rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phường/Xã
                    </label>
                    <input
                      type="text"
                      placeholder="VD: Phước Ninh"
                      className="w-full p-2 border rounded-md"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Địa chỉ cụ thể
                  </label>
                  <input
                    type="text"
                    placeholder="VD: 123 Đường Lê Duẩn"
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
                    Đặt làm địa chỉ mặc định
                  </label>
                </div>

                <div className="flex justify-end space-x-3 pt-2">
                  <button
                    type="button"
                    className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100"
                  >
                    Hủy
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600"
                  >
                    Lưu
                  </button>
                </div>
              </form>
              <hr className="mt-5 mb-3" />
              <h2 className="text-l font-semibold mb-2">Địa Chỉ Đã Nhập</h2>
              <div className="flex justify-between items-start bg-white border rounded-lg p-4  shadow-sm">
                <div className="space-y-1">
                  <div className="font-semibold text-gray-900">
                    duong van toan{' '}
                    <span className="text-gray-500 text-sm ml-2">
                      (+84) 867 727 861
                    </span>
                  </div>
                  <div className="text-gray-700 text-sm">86 Khánh An 1</div>
                  <div className="text-gray-700 text-sm">
                    Phường Hòa Khánh Bắc, Quận Liên Chiểu, Đà Nẵng
                  </div>

                  <div className="inline-block mt-1">
                    <span className="text-red-500 border border-red-500 px-2 py-0.5 text-xs rounded">
                      Mặc định
                    </span>
                  </div>
                </div>

                <div className="flex flex-col items-end space-y-2">
                  <button className="text-blue-600 text-sm hover:underline">
                    Cập nhật
                  </button>
                  <button className="border px-3 py-1 text-sm rounded hover:bg-gray-100">
                    Thiết lập mặc định
                  </button>
                </div>
              </div>
            </>
          )}
          {activeForm === 'password' && (
            <>
              <h2 className="text-xl font-semibold mb-2">Đổi Mật Khẩu</h2>
              <p className="text-sm text-gray-500 mb-6">
                Để bảo mật tài khoản, vui lòng không chia sẻ mật khẩu cho người
                khác
              </p>
              <div className="max-w-md mx-auto space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nhập mật khẩu cũ
                  </label>
                  <input type="text" className="w-full p-2 border rounded-md" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nhập mật khẩu mới
                  </label>
                  <input type="text" className="w-full p-2 border rounded-md" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nhập lại mật khẩu mới
                  </label>
                  <input type="text" className="w-full p-2 border rounded-md" />
                </div>
                <div className="text-end">
                  <button className="w-32 px-4 py-2 rounded text-white bg-red-500 hover:bg-red-600">
                    Xác Nhận
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
    </>
  );
};

export default Profile;
