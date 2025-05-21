import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../assets/images/MESSIU-logo2.png';
import SearchBox from '../SearchBox';
import { Button } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import { ChevronRight } from 'lucide-react';
import { CiViewList } from 'react-icons/ci';
import { IoPhonePortraitOutline } from 'react-icons/io5';
import { IoIosLaptop } from 'react-icons/io';
import { TbDeviceAirpods } from 'react-icons/tb';
import { MdWatch } from 'react-icons/md';
import { BsUsbPlug } from 'react-icons/bs';
import { GiPc } from 'react-icons/gi';
import { FaTv } from 'react-icons/fa';
import { useAuth } from '../../contexts/AuthContext';
import { FaHeart } from 'react-icons/fa';

const categories = [
  {
    label: 'Điện thoại, Tablet',
    key: 'phone',
    icon: <IoPhonePortraitOutline />,
  },
  { label: 'Laptop', key: 'laptop', icon: <IoIosLaptop /> },
  { label: 'Âm thanh, Mic thu âm', key: 'audio', icon: <TbDeviceAirpods /> },
  { label: 'Đồng hồ, Camera', key: 'camera', icon: <MdWatch /> },
  { label: 'Phụ kiện', key: 'accessories', icon: <BsUsbPlug /> },
  { label: 'PC, Màn hình, Máy in', key: 'pc', icon: <GiPc /> },
  { label: 'Tivi', key: 'tv', icon: <FaTv /> },
];
const Header: React.FC = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();

  const handleCartClick = () => {
    navigate('/shopping-cart');
  };

  const handleUserClick = () => {
    if (isAuthenticated) {
      navigate('/profile');
    } else {
      navigate('/login');
    }
  };
  const handleWishlistClick = () => {
    navigate('/wishlist');
  };
  const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      right: -3,
      top: 3,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '0 4px',
    },
  }));
  const { logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [isHoveringUser, setIsHoveringUser] = useState(false);
  return (
    <header
      className={`z-[1000] w-full transition ${isOpen ? 'shadow-lg bg-blue-50' : 'bg-white'} sticky top-0`}
    >
      <div
        className={`top-strip lg:block py-2 border-t-[1px] border-gray-250 border-b-[1px] ${isOpen ? 'bg-blue-50' : ''}`}
      >
        <div className="container">
          <div className="flex items-center justify-between">
            <div className="col1 w-[50%]">
              <p className="text-[12px] font-[500] mt-0 mb-0">
                Get up to 50% off new season styles, limited time only.
              </p>
            </div>
            <div className="col2 flex items-center justify-between w-full lg:w-[50%] lg:justify-end">
              <ul className="flex items-center gap-3 w-full justify-between lg:w-[200px]">
                <li className="list-none">
                  <Link
                    className="text-[11px] lg:text-[13px] link font-[500] transition"
                    to="/faq"
                    data-discover="true"
                  >
                    Help Center{' '}
                  </Link>
                </li>
                <li className="list-none">
                  <Link
                    className="text-[11px] lg:text-[13px] link font-[500] transition"
                    to="/track-order"
                    data-discover="true"
                  >
                    Order Tracking
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`header py-2 lg:py-4 border-b-[1px] border-gray-250 ${isOpen ? 'bg-blue-50' : ''}`}
      >
        <div className="container flex items-center justify-between">
          <div className="col1 w-[40%] lg:w-[25%]">
            <Link to={'/'}>
              <img src={Logo} />
            </Link>
          </div>
          <div className="relative">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`mt-3 px-5 py-2 rounded-md whitespace-nowrap flex items-center gap-2 font-semibold transition-colors duration-300
    ${
      isOpen
        ? 'bg-blue-600 text-white hover:bg-blue-700'
        : 'bg-blue-300 text-blue-800 hover:bg-blue-400'
    }`}
            >
              <CiViewList />
              Category
            </button>

            {isOpen && (
              <>
                <div
                  className="fixed top-[135px] left-0 w-full h-full bg-black bg-opacity-50 z-[999]"
                  onClick={() => setIsOpen(false)}
                ></div>
                <div
                  className="fixed top-[135px] left-40 rounded-lg bg-white border shadow-2xl flex z-[1001] "
                  onMouseLeave={() => setHoveredCategory(null)}
                >
                  <ul className="w-64 border-r divide-y text-sm">
                    {categories.map((cat) => (
                      <li
                        key={cat.label}
                        onMouseEnter={() => setHoveredCategory(cat.key ?? null)}
                        className="flex justify-between items-center px-4 py-3 hover:bg-gray-100 cursor-pointer"
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{cat.icon}</span>
                          <span>{cat.label}</span>
                        </div>
                        <ChevronRight className="h-4 w-4" />
                      </li>
                    ))}
                  </ul>
                  {hoveredCategory === 'phone' && (
                    <div className="flex-1 p-4 ">
                      <div className="w-[900px] grid grid-cols-5 gap-4 text-sm">
                        <div>
                          <h3 className="font-bold mb-2">Hãng điện thoại</h3>
                          <ul className="space-y-1 text-gray-500">
                            <li>
                              <a href="">iPhone</a>
                            </li>
                            <li>
                              <a href="">Samsung</a>{' '}
                            </li>
                            <li>
                              <a href="">Xiaomi</a>{' '}
                            </li>
                            <li>
                              <a href="">OPPO</a>{' '}
                            </li>
                            <li>
                              <a href="">realme</a>{' '}
                            </li>
                            <li>
                              <a href="">TECNO</a>{' '}
                            </li>
                            <li>
                              <a href="">vivo</a>{' '}
                            </li>
                          </ul>
                        </div>

                        <div>
                          <h3 className="font-bold mb-2">Mức giá</h3>
                          <ul className="space-y-1 text-gray-500">
                            <li>
                              <a href="">Dưới 2 triệu</a>
                            </li>
                            <li>
                              <a href="">2 - 4 triệu</a>
                            </li>
                            <li>
                              <a href="">4 - 7 triệu</a>
                            </li>
                            <li>
                              <a href="">7 - 13 triệu</a>
                            </li>
                            <li>
                              <a href="">13 - 20 triệu</a>
                            </li>
                            <li>
                              <a href="">Trên 20 triệu</a>
                            </li>
                          </ul>
                        </div>

                        <div>
                          <h3 className="font-bold mb-2">Điện thoại HOT</h3>
                          <ul className="space-y-1 text-gray-500">
                            <li>
                              <a href="">iPhone 16 Series</a>
                            </li>
                            <li>
                              <a href="">iPhone 15 Pro Max</a>
                            </li>
                            <li>
                              <a href="">S25 Ultra</a>
                            </li>
                            <li>
                              <a href="">Xiaomi 15</a>
                            </li>
                            <li>
                              <a href="">OPPO Reno13</a>
                            </li>
                          </ul>
                        </div>

                        <div>
                          <h3 className="font-bold mb-2">Hãng máy tính bảng</h3>
                          <ul className="space-y-1 text-gray-500">
                            <li>
                              <a href="">iPad</a>
                            </li>
                            <li>
                              <a href="">Samsung</a>
                            </li>
                            <li>
                              <a href="">Xiaomi</a>
                            </li>
                            <li>
                              <a href="">Huawei</a>
                            </li>
                          </ul>
                        </div>

                        <div>
                          <h3 className="font-bold mb-2">Máy tính bảng HOT</h3>
                          <ul className="space-y-1 text-gray-500">
                            <li>
                              <a href="">iPad Air M3</a>
                            </li>
                            <li>
                              <a href="">Xiaomi Pad 7 Pro</a>
                            </li>
                            <li>
                              <a href="">Galaxy Tab S10 Series</a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                  {hoveredCategory === 'laptop' && (
                    <div className="flex-1 p-4">
                      <div className="w-[900px] grid grid-cols-5 gap-4 text-sm">
                        <div>
                          <h3 className="font-bold mb-2">Thương hiệu</h3>
                          <ul className="space-y-1 text-gray-500">
                            <li>
                              <a href="">Mac</a>
                            </li>
                            <li>
                              <a href="">ASUS</a>
                            </li>
                            <li>
                              <a href="">Lenovo</a>
                            </li>
                            <li>
                              <a href="">Dell</a>
                            </li>
                            <li>
                              <a href="">HP</a>
                            </li>
                            <li>
                              <a href="">Acer</a>
                            </li>
                            <li>
                              <a href="">LG</a>
                            </li>
                            <li>
                              <a href="">Huawei</a>
                            </li>
                            <li>
                              <a href="">MSI</a>
                            </li>
                            <li>
                              <a href="">Gigabyte</a>
                            </li>
                            <li>
                              <a href="">Vaio</a>
                            </li>
                            <li>
                              <a href="">Masstel</a>
                            </li>
                          </ul>
                        </div>

                        <div>
                          <h3 className="font-bold mb-2">Phân khúc giá</h3>
                          <ul className="space-y-1 text-gray-500">
                            <li>
                              <a href="">Dưới 10 triệu</a>
                            </li>
                            <li>
                              <a href="">Từ 10 - 15 triệu</a>
                            </li>
                            <li>
                              <a href="">Từ 15 - 20 triệu</a>
                            </li>
                            <li>
                              <a href="">Từ 20 - 25 triệu</a>
                            </li>
                            <li>
                              <a href="">Từ 25 - 30 triệu</a>
                            </li>
                          </ul>
                        </div>

                        <div>
                          <h3 className="font-bold mb-2">Nhu cầu sử dụng</h3>
                          <ul className="space-y-1 text-gray-500">
                            <li>
                              <a href="">Văn phòng</a>
                            </li>
                            <li>
                              <a href="">Gaming</a>
                            </li>
                            <li>
                              <a href="">Mỏng nhẹ</a>
                            </li>
                            <li>
                              <a href="">Đồ họa - kỹ thuật</a>
                            </li>
                            <li>
                              <a href="">Sinh viên</a>
                            </li>
                            <li>
                              <a href="">Cảm ứng</a>
                            </li>
                            <li>
                              <a href="">
                                Laptop AI{' '}
                                <span className="text-red-500">MỚI</span>
                              </a>
                            </li>
                            <li>
                              <a href="">
                                Mac CTO - Nâng cấp theo cách của bạn{' '}
                                <span className="text-red-500">HOT</span>
                              </a>
                            </li>
                          </ul>
                        </div>

                        <div>
                          <h3 className="font-bold mb-2">Dòng chip</h3>
                          <ul className="space-y-1 text-gray-500">
                            <li>
                              <a href="">Laptop Core i3</a>
                            </li>
                            <li>
                              <a href="">Laptop Core i5</a>
                            </li>
                            <li>
                              <a href="">Laptop Core i7</a>
                            </li>
                            <li>
                              <a href="">Laptop Core i9</a>
                            </li>
                            <li>
                              <a href="">Apple M1 Series</a>
                            </li>
                            <li>
                              <a href="">Apple M3 Series</a>
                            </li>
                            <li>
                              <a href="">
                                Apple M4 Series{' '}
                                <span className="text-red-500">MỚI</span>
                              </a>
                            </li>
                            <li>
                              <a href="">AMD Ryzen</a>
                            </li>
                            <li>
                              <a href="">
                                Intel Core Ultra{' '}
                                <span className="text-red-500">HOT</span>
                              </a>
                            </li>
                          </ul>
                        </div>

                        <div>
                          <h3 className="font-bold mb-2">
                            Kích thước màn hình
                          </h3>
                          <ul className="space-y-1 text-gray-500">
                            <li>
                              <a href="">Laptop 12 inch</a>
                            </li>
                            <li>
                              <a href="">Laptop 13 inch</a>
                            </li>
                            <li>
                              <a href="">Laptop 14 inch</a>
                            </li>
                            <li>
                              <a href="">Laptop 15.6 inch</a>
                            </li>
                            <li>
                              <a href="">Laptop 16 inch</a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                  {hoveredCategory === 'audio' && (
                    <div className="flex-1 p-4">
                      <div className="w-[900px] grid grid-cols-6 gap-4 text-sm">
                        <div>
                          <h3 className="font-bold mb-2">Chọn loại tai nghe</h3>
                          <ul className="space-y-1 text-gray-500">
                            <li>
                              <a href="">Bluetooth</a>
                            </li>
                            <li>
                              <a href="">Chụp tai</a>
                            </li>
                            <li>
                              <a href="">Nhét tai</a>
                            </li>
                            <li>
                              <a href="">Có dây</a>
                            </li>
                            <li>
                              <a href="">Thể thao</a>
                            </li>
                            <li>
                              <a href="">Gaming</a>
                            </li>
                            <li>
                              <a href="">Xem tất cả tai nghe</a>
                            </li>
                          </ul>
                        </div>

                        <div>
                          <h3 className="font-bold mb-2">Hãng tai nghe</h3>
                          <ul className="space-y-1 text-gray-500">
                            <li>
                              <a href="">Apple</a>
                            </li>
                            <li>
                              <a href="">Sony</a>
                            </li>
                            <li>
                              <a href="">JBL</a>
                            </li>
                            <li>
                              <a href="">Samsung</a>
                            </li>
                            <li>
                              <a href="">Marshall</a>
                            </li>
                            <li>
                              <a href="">Soundpeats</a>
                            </li>
                            <li>
                              <a href="">Bose</a>
                            </li>
                            <li>
                              <a href="">Edifier</a>
                            </li>
                            <li>
                              <a href="">Xiaomi</a>
                            </li>
                            <li>
                              <a href="">Huawei</a>
                            </li>
                            <li>
                              <a href="">Sennheiser</a>
                            </li>
                            <li>
                              <a href="">Havit</a>
                            </li>
                            <li>
                              <a href="">Beats</a>
                            </li>
                          </ul>
                        </div>

                        <div>
                          <h3 className="font-bold mb-2">Chọn theo giá</h3>
                          <ul className="space-y-1 text-gray-500">
                            <li>
                              <a href="">Tai nghe dưới 200K</a>
                            </li>
                            <li>
                              <a href="">Tai nghe dưới 500K</a>
                            </li>
                            <li>
                              <a href="">Tai nghe dưới 1 triệu</a>
                            </li>
                            <li>
                              <a href="">Tai nghe dưới 2 triệu</a>
                            </li>
                            <li>
                              <a href="">Tai nghe dưới 5 triệu</a>
                            </li>
                          </ul>
                        </div>

                        <div>
                          <h3 className="font-bold mb-2">Hãng loa</h3>
                          <ul className="space-y-1 text-gray-500">
                            <li>
                              <a href="">JBL</a>
                            </li>
                            <li>
                              <a href="">Marshall</a>
                            </li>
                            <li>
                              <a href="">Harman Kardon</a>
                            </li>
                            <li>
                              <a href="">Acnos</a>
                            </li>
                            <li>
                              <a href="">Samsung</a>
                            </li>
                            <li>
                              <a href="">Sony</a>
                            </li>
                            <li>
                              <a href="">Arirang</a>
                            </li>
                            <li>
                              <a href="">LG</a>
                            </li>
                            <li>
                              <a href="">Alpha Works</a>
                            </li>
                            <li>
                              <a href="">Edifier</a>
                            </li>
                            <li>
                              <a href="">Bose</a>
                            </li>
                            <li>
                              <a href="">Nanomax</a>
                            </li>
                            <li>
                              <a href="">Tronsmart</a>
                            </li>
                          </ul>
                        </div>

                        <div>
                          <h3 className="font-bold mb-2">Chọn loại loa</h3>
                          <ul className="space-y-1 text-gray-500">
                            <li>
                              <a href="">Loa Bluetooth</a>
                            </li>
                            <li>
                              <a href="">Loa Karaoke</a>
                            </li>
                            <li>
                              <a href="">Loa kéo</a>
                            </li>
                            <li>
                              <a href="">Loa Soundbar</a>
                            </li>
                            <li>
                              <a href="">Loa vi tính</a>
                            </li>
                            <li>
                              <a href="">Xem tất cả loa</a>
                            </li>
                          </ul>
                        </div>

                        <div>
                          <h3 className="font-bold mb-2">Sản phẩm nổi bật</h3>
                          <ul className="space-y-1 text-gray-500">
                            <li>
                              <a href="">AirPods 4</a>
                            </li>
                            <li>
                              <a href="">AirPods Pro 2</a>
                            </li>
                            <li>
                              <a href="">Galaxy Buds 3 Pro</a>
                            </li>
                            <li>
                              <a href="">JBL Tour Pro 3</a>
                            </li>
                            <li>
                              <a href="">Sony WH-1000XM5</a>
                            </li>
                            <li>
                              <a href="">OPPO Enco Air3i - Chỉ có tại CPS</a>
                            </li>
                            <li>
                              <a href="">Redmi Buds 6 Pro</a>
                            </li>
                            <li>
                              <a href="">Onyx Studio 9</a>
                            </li>
                            <li>
                              <a href="">Marshall Willen II</a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                  {hoveredCategory === 'camera' && (
                    <div className="flex-1 p-4">
                      <div className="w-[900px] grid grid-cols-6 gap-4 text-sm">
                        <div>
                          <h3 className="font-bold mb-2">Loại đồng hồ</h3>
                          <ul className="space-y-1 text-gray-500">
                            <li>
                              <a href="">Đồng hồ thông minh</a>
                            </li>
                            <li>
                              <a href="">Vòng đeo tay thông minh</a>
                            </li>
                            <li>
                              <a href="">Đồng hồ định vị trẻ em</a>
                            </li>
                            <li>
                              <a href="">Dây đeo</a>
                            </li>
                          </ul>
                        </div>

                        <div>
                          <h3 className="font-bold mb-2">
                            Chọn theo thương hiệu
                          </h3>
                          <ul className="space-y-1 text-gray-500">
                            <li>
                              <a href="">Apple Watch</a>
                            </li>
                            <li>
                              <a href="">Samsung</a>
                            </li>
                            <li>
                              <a href="">Xiaomi</a>
                            </li>
                            <li>
                              <a href="">Huawei</a>
                            </li>
                            <li>
                              <a href="">Coros</a>
                            </li>
                            <li>
                              <a href="">Garmin</a>
                            </li>
                            <li>
                              <a href="">Kieslect</a>
                            </li>
                            <li>
                              <a href="">Amazfit</a>
                            </li>
                            <li>
                              <a href="">Black Shark</a>
                            </li>
                            <li>
                              <a href="">Mibro</a>
                            </li>
                            <li>
                              <a href="">Masstel</a>
                            </li>
                            <li>
                              <a href="">imoo</a>
                            </li>
                            <li>
                              <a href="">Kospet</a>
                            </li>
                          </ul>
                        </div>

                        <div>
                          <h3 className="font-bold mb-2">
                            Sản phẩm nổi bật ⚡
                          </h3>
                          <ul className="space-y-1 text-gray-500">
                            <li>
                              <a href="">Apple Watch Series 10</a>
                            </li>
                            <li>
                              <a href="">Apple Watch Ultra 2</a>
                            </li>
                            <li>
                              <a href="">
                                Samsung Galaxy Watch 7{' '}
                                <span className="text-red-500">HOT</span>
                              </a>
                            </li>
                            <li>
                              <a href="">
                                Samsung Galaxy Watch Ultra{' '}
                                <span className="text-red-500">HOT</span>
                              </a>
                            </li>
                            <li>
                              <a href="">Apple Watch SE</a>
                            </li>
                            <li>
                              <a href="">imoo Z1</a>
                            </li>
                            <li>
                              <a href="">Viettel MyKID 4G Lite</a>
                            </li>
                            <li>
                              <a href="">
                                Xiaomi Watch S4{' '}
                                <span className="text-red-500">MỚI</span>
                              </a>
                            </li>
                            <li>
                              <a href="">
                                Huawei Band 10{' '}
                                <span className="text-red-500">MỚI</span>
                              </a>
                            </li>
                            <li>
                              <a href="">Amazfit Active 2</a>
                            </li>
                            <li>
                              <a href="">Huawei Watch Fit 3</a>
                            </li>
                            <li>
                              <a href="">Garmin Instinct E</a>
                            </li>
                          </ul>
                        </div>

                        <div>
                          <h3 className="font-bold mb-2">Camera</h3>
                          <ul className="space-y-1 text-gray-500">
                            <li>
                              <a href="">Camera an ninh</a>
                            </li>
                            <li>
                              <a href="">Camera hành trình</a>
                            </li>
                            <li>
                              <a href="">
                                Action Camera{' '}
                                <span className="text-red-500">MỚI</span>
                              </a>
                            </li>
                            <li>
                              <a href="">
                                Camera AI{' '}
                                <span className="text-red-500">MỚI</span>
                              </a>
                            </li>
                            <li>
                              <a href="">Gimbal</a>
                            </li>
                            <li>
                              <a href="">Tripod</a>
                            </li>
                            <li>
                              <a href="">Máy ảnh</a>
                            </li>
                            <li>
                              <a href="">Flycam</a>
                            </li>
                            <li>
                              <a href="">Xem tất cả camera</a>
                            </li>
                          </ul>
                        </div>

                        <div>
                          <h3 className="font-bold mb-2">Camera nổi bật</h3>
                          <ul className="space-y-1 text-gray-500">
                            <li>
                              <a href="">Camera an ninh Imou</a>
                            </li>
                            <li>
                              <a href="">Camera an ninh Ezviz</a>
                            </li>
                            <li>
                              <a href="">Camera an ninh Xiaomi</a>
                            </li>
                            <li>
                              <a href="">Camera an ninh TP-Link</a>
                            </li>
                            <li>
                              <a href="">
                                Camera Tiandy{' '}
                                <span className="text-red-500">HOT</span>
                              </a>
                            </li>
                            <li>
                              <a href="">Camera DJI</a>
                            </li>
                            <li>
                              <a href="">Camera Insta360</a>
                            </li>
                            <li>
                              <a href="">
                                Máy ảnh Canon{' '}
                                <span className="text-red-500">HOT</span>
                              </a>
                            </li>
                            <li>
                              <a href="">
                                Máy ảnh Sony{' '}
                                <span className="text-red-500">HOT</span>
                              </a>
                            </li>
                            <li>
                              <a href="">Gopro Hero 13</a>
                            </li>
                            <li>
                              <a href="">Flycam DJI</a>
                            </li>
                            <li>
                              <a href="">DJI Action 5 Pro</a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                  {hoveredCategory === 'accessories' && (
                    <div className="flex-1 p-4">
                      <div className="w-[900px] grid grid-cols-6 gap-4 text-sm">
                        <div>
                          <h3 className="font-bold mb-2">Phụ kiện di động</h3>
                          <ul className="space-y-1 text-gray-500">
                            <li>
                              <a href="">Phụ kiện Apple</a>
                            </li>
                            <li>
                              <a href="">Dán màn hình</a>
                            </li>
                            <li>
                              <a href="">Ốp lưng - Bao da</a>
                            </li>
                            <li>
                              <a href="">Thẻ nhớ</a>
                            </li>
                            <li>
                              <a href="">Apple Care+</a>
                            </li>
                            <li>
                              <a href="">Samsung Care+</a>
                            </li>
                            <li>
                              <a href="">Sim 4G</a>
                            </li>
                            <li>
                              <a href="">Cáp, sạc</a>
                            </li>
                            <li>
                              <a href="">Pin dự phòng</a>
                            </li>
                            <li>
                              <a href="">Trạm sạc dự phòng</a>
                            </li>
                            <li>
                              <a href="">Phụ kiện điện thoại</a>
                            </li>
                          </ul>
                        </div>

                        <div>
                          <h3 className="font-bold mb-2">Phụ kiện Laptop</h3>
                          <ul className="space-y-1 text-gray-500">
                            <li>
                              <a href="">Chuột, bàn phím</a>
                            </li>
                            <li>
                              <a href="">Balo Laptop | Túi chống sốc</a>
                            </li>
                            <li>
                              <a href="">Phần mềm</a>
                            </li>
                            <li>
                              <a href="">Webcam</a>
                            </li>
                            <li>
                              <a href="">Giá đỡ</a>
                            </li>
                            <li>
                              <a href="">Thảm, lót chuột</a>
                            </li>
                            <li>
                              <a href="">Sạc laptop</a>
                            </li>
                            <li>
                              <a href="">Camera phòng họp</a>
                            </li>
                          </ul>
                        </div>

                        <div>
                          <h3 className="font-bold mb-2">Thiết bị mạng</h3>
                          <ul className="space-y-1 text-gray-500">
                            <li>
                              <a href="">Thiết bị phát sóng WiFi</a>
                            </li>
                            <li>
                              <a href="">Bộ phát WiFi di động</a>
                            </li>
                            <li>
                              <a href="">Bộ kích sóng WiFi</a>
                            </li>
                            <li>
                              <a href="">Xem tất cả thiết bị mạng</a>
                            </li>
                          </ul>
                        </div>

                        <div>
                          <h3 className="font-bold mb-2">Gaming Gear</h3>
                          <ul className="space-y-1 text-gray-500">
                            <li>
                              <a href="">PlayStation</a>
                            </li>
                            <li>
                              <a href="">ROG Ally</a>
                            </li>
                            <li>
                              <a href="">MSI Claw</a>
                            </li>
                            <li>
                              <a href="">Bàn phím Gaming</a>
                            </li>
                            <li>
                              <a href="">Chuột chơi game</a>
                            </li>
                            <li>
                              <a href="">Tai nghe Gaming</a>
                            </li>
                            <li>
                              <a href="">Tay cầm chơi game</a>
                            </li>
                            <li>
                              <a href="">Xem tất cả Gaming Gear</a>
                            </li>
                          </ul>
                        </div>

                        <div>
                          <h3 className="font-bold mb-2">Phụ kiện khác</h3>
                          <ul className="space-y-1 text-gray-500">
                            <li>
                              <a href="">Dây đeo đồng hồ</a>
                            </li>
                            <li>
                              <a href="">Dây đeo Airtag</a>
                            </li>
                            <li>
                              <a href="">Phụ kiện tiện ích</a>
                            </li>
                            <li>
                              <a href="">Phụ kiện ô tô</a>
                            </li>
                            <li>
                              <a href="">Bút cảm ứng</a>
                            </li>
                            <li>
                              <a href="">Thiết bị định vị</a>
                            </li>
                          </ul>
                        </div>

                        <div>
                          <h3 className="font-bold mb-2">Thiết bị lưu trữ</h3>
                          <ul className="space-y-1 text-gray-500">
                            <li>
                              <a href="">Thẻ nhớ</a>
                            </li>
                            <li>
                              <a href="">USB</a>
                            </li>
                            <li>
                              <a href="">Ổ cứng di động</a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                  {hoveredCategory === 'pc' && (
                    <div className="flex-1 p-4">
                      <div className="w-[900px] grid grid-cols-6 gap-4 text-sm">
                        <div>
                          <h3 className="font-bold mb-2">Loại PC</h3>
                          <ul className="space-y-1 text-gray-500">
                            <li>
                              <a href="">Build PC</a>
                            </li>
                            <li>
                              <a href="">Cấu hình sẵn</a>
                            </li>
                            <li>
                              <a href="">All In One</a>
                            </li>
                            <li>
                              <a href="">PC bộ</a>
                            </li>
                          </ul>
                        </div>
                        <div>
                          <h3 className="font-bold mb-2">
                            Chọn PC theo nhu cầu
                          </h3>
                          <ul className="space-y-1 text-gray-500">
                            <li>
                              <a href="">Gaming</a>
                            </li>
                            <li>
                              <a href="">Đồ họa</a>
                            </li>
                            <li>
                              <a href="">Văn phòng</a>
                            </li>
                          </ul>
                        </div>
                        <div>
                          <h3 className="font-bold mb-2">Linh kiện máy tính</h3>
                          <ul className="space-y-1 text-gray-500">
                            <li>
                              <a href="">CPU</a>
                            </li>
                            <li>
                              <a href="">Main</a>
                            </li>
                            <li>
                              <a href="">RAM</a>
                            </li>
                            <li>
                              <a href="">Ổ cứng</a>
                            </li>
                            <li>
                              <a href="">Nguồn</a>
                            </li>
                            <li>
                              <a href="">VGA</a>
                            </li>
                            <li>
                              <a href="">Tản nhiệt</a>
                            </li>
                            <li>
                              <a href="">Case</a>
                            </li>
                            <li>
                              <a href="">Xem tất cả</a>
                            </li>
                          </ul>
                        </div>
                        <div>
                          <h3 className="font-bold mb-2">
                            Chọn màn hình theo hãng
                          </h3>
                          <ul className="space-y-1 text-gray-500">
                            <li>
                              <a href="">ASUS</a>
                            </li>
                            <li>
                              <a href="">Samsung</a>
                            </li>
                            <li>
                              <a href="">DELL</a>
                            </li>
                            <li>
                              <a href="">LG</a>
                            </li>
                            <li>
                              <a href="">MSI</a>
                            </li>
                            <li>
                              <a href="">Acer</a>
                            </li>
                            <li>
                              <a href="">Xiaomi</a>
                            </li>
                            <li>
                              <a href="">ViewSonic</a>
                            </li>
                            <li>
                              <a href="">Philips</a>
                            </li>
                            <li>
                              <a href="">AOC</a>
                            </li>
                            <li>
                              <a href="">Dahua</a>
                            </li>
                          </ul>
                        </div>
                        <div>
                          <h3 className="font-bold mb-2">
                            Chọn màn hình theo nhu cầu
                          </h3>
                          <ul className="space-y-1 text-gray-500">
                            <li>
                              <a href="">Gaming</a>
                            </li>
                            <li>
                              <a href="">Văn phòng</a>
                            </li>
                            <li>
                              <a href="">Đồ họa</a>
                            </li>
                            <li>
                              <a href="">Lập trình</a>
                            </li>
                            <li>
                              <a href="">Màn hình di động</a>
                            </li>
                            <li>
                              <a href="">Arm màn hình</a>
                            </li>
                            <li>
                              <a href="">Xem tất cả</a>
                            </li>
                          </ul>
                        </div>
                        <div>
                          <h3 className="font-bold mb-2">Thiết bị văn phòng</h3>
                          <ul className="space-y-1 text-gray-500">
                            <li>
                              <a href="">Máy in</a>
                            </li>
                            <li>
                              <a href="">Phần mềm</a>
                            </li>
                            <li>
                              <a href="">Decor bàn làm việc</a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                  {hoveredCategory === 'tv' && (
                    <div className="flex-1 p-4">
                      <div className="w-[900px] grid grid-cols-5 gap-4 text-sm">
                        <div>
                          <h3 className="font-bold mb-2">Chọn theo hãng</h3>
                          <ul className="space-y-1 text-gray-500">
                            <li>
                              <a href="">Samsung</a>
                            </li>
                            <li>
                              <a href="">LG</a>
                            </li>
                            <li>
                              <a href="">Xiaomi</a>
                            </li>
                            <li>
                              <a href="">Coocaa</a>
                            </li>
                            <li>
                              <a href="">Sony</a>
                            </li>
                            <li>
                              <a href="">Toshiba</a>
                            </li>
                            <li>
                              <a href="">TCL</a>
                            </li>
                            <li>
                              <a href="">Hisense</a>
                            </li>
                            <li>
                              <a href="">
                                Aqua <span className="text-red-500">MỚI</span>
                              </a>
                            </li>
                          </ul>
                        </div>
                        <div>
                          <h3 className="font-bold mb-2">Chọn theo mức giá</h3>
                          <ul className="space-y-1 text-gray-500">
                            <li>
                              <a href="">Dưới 5 triệu</a>
                            </li>
                            <li>
                              <a href="">Từ 5 - 9 triệu</a>
                            </li>
                            <li>
                              <a href="">Từ 9 - 12 triệu</a>
                            </li>
                            <li>
                              <a href="">Từ 12 - 15 triệu</a>
                            </li>
                            <li>
                              <a href="">Trên 15 triệu</a>
                            </li>
                          </ul>
                        </div>
                        <div>
                          <h3 className="font-bold mb-2">
                            Chọn theo kích thước
                          </h3>
                          <ul className="space-y-1 text-gray-500">
                            <li>
                              <a href="">Tivi 32 inch</a>
                            </li>
                            <li>
                              <a href="">Tivi 43 inch</a>
                            </li>
                            <li>
                              <a href="">Tivi 50 inch</a>
                            </li>
                            <li>
                              <a href="">Tivi 55 inch</a>
                            </li>
                            <li>
                              <a href="">Tivi 65 inch</a>
                            </li>
                            <li>
                              <a href="">Tivi 70 inch</a>
                            </li>
                            <li>
                              <a href="">Tivi 85 inch</a>
                            </li>
                          </ul>
                        </div>
                        <div>
                          <h3 className="font-bold mb-2">
                            Chọn theo độ phân giải
                          </h3>
                          <ul className="space-y-1 text-gray-500">
                            <li>
                              <a href="">Tivi 4K</a>
                            </li>
                            <li>
                              <a href="">Tivi 8K</a>
                            </li>
                            <li>
                              <a href="">Tivi Full HD</a>
                            </li>
                            <li>
                              <a href="">Tivi OLED</a>
                            </li>
                            <li>
                              <a href="">Tivi QLED</a>
                            </li>
                            <li>
                              <a href="">Android Tivi</a>
                            </li>
                          </ul>
                        </div>
                        <div>
                          <h3 className="font-bold mb-2">
                            Sản phẩm nổi bật ⚡
                          </h3>
                          <ul className="space-y-1 text-gray-500">
                            <li>
                              <a href="">Tivi Samsung UHD 4K 55 inch</a>
                            </li>
                            <li>
                              <a href="">Tivi NanoCell LG 4K 55 inch</a>
                            </li>
                            <li>
                              <a href="">Tivi LG 4K 55 inch Evo Oled Pose</a>
                            </li>
                            <li>
                              <a href="">Tivi Samsung QLED 4K 65 inch</a>
                            </li>
                            <li>
                              <a href="">Tivi Samsung UHD 4K 65 inch 2024</a>
                            </li>
                            <li>
                              <a href="">Tivi LG 43LM5750PTC FHD 43 inch</a>
                            </li>
                            <li>
                              <a href="">Tivi Xiaomi A4 4K 2025 55 inch</a>
                            </li>
                            <li>
                              <a href="">
                                Tivi Coocaa khung tranh QLED 4K 55 inch
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
          <div className="col2 fixed top-0 left-0 w-full h-full  lg:static p-2 lg:p-0 bg-white z-50 !block hidden">
            <SearchBox />
          </div>
          <div className="col3 w-[10%] lg:w-[30%] flex items-center pl-7">
            {/* <div className="h-6 w-[1px] bg-gray-300"></div>
            <div className="col3 flex items-center gap-4">
              <Button onClick={handleCartClick}>
                <StyledBadge badgeContent={4} color="secondary">
                  <ShoppingCartIcon />
                </StyledBadge>
              </Button>
              <Button
                onClick={handleUserClick}
                className="flex items-center gap-2"
                startIcon={<FaUserCheck />}
              >
                {isAuthenticated ? user?.name || 'Profile' : 'Đăng nhập'}
              </Button>
            </div> */}
            <ul className="flex items-center justify-end gap-0 lg:gap-3 w-full">
              {isAuthenticated && (
                <>
                  <li>
                    <Button
                      onClick={handleWishlistClick}
                      className="!text-[#000] myAccountWrap flex items-center gap-3 cursor-pointer"
                      startIcon={
                        <StyledBadge badgeContent={2} color="secondary">
                          <FaHeart className="text-xl text-pink-500" />
                        </StyledBadge>
                      }
                    >
                      <div className="info flex flex-col">
                        <h4 className="leading-3 text-[14px] text-[rgba(0,0,0,0.6)] font-[500] mb-0 capitalize text-left justify-start">
                          Wishlist
                        </h4>
                        <span className="text-[13px] text-[rgba(0,0,0,0.6)]  font-[400] capitalize text-left justify-start">
                          2 items
                        </span>
                      </div>
                    </Button>
                  </li>
                  <li>
                    <Button
                      onClick={handleCartClick}
                      className="!text-[#000] myAccountWrap flex items-center gap-3 cursor-pointer"
                      startIcon={
                        <StyledBadge badgeContent={4} color="secondary">
                          <ShoppingCartIcon />
                        </StyledBadge>
                      }
                    >
                      <div className="info flex flex-col">
                        <h4 className="leading-3 text-[14px] text-[rgba(0,0,0,0.6)] font-[500] mb-0 capitalize text-left justify-start">
                          Cart
                        </h4>
                        <span className="text-[13px] text-[rgba(0,0,0,0.6)]  font-[400] capitalize text-left justify-start">
                          $150.000
                        </span>
                      </div>
                    </Button>
                  </li>
                  <div className="h-6 w-[1px] bg-gray-300"></div>
                </>
              )}

              <li
                onMouseEnter={() => setIsHoveringUser(true)}
                onMouseLeave={() => setIsHoveringUser(false)}
                className="relative"
              >
                <Button
                  onClick={handleUserClick}
                  className="!text-[#000] myAccountWrap flex items-center gap-3 cursor-pointer"
                >
                  {isAuthenticated ? user?.name || 'Profile' : 'Đăng nhập'}
                </Button>

                {isAuthenticated && isHoveringUser && (
                  <div
                    onClick={logout}
                    className="absolute top-full left-0 mt-1 bg-white border rounded shadow-lg px-4 py-2 text-sm text-red-500 hover:bg-gray-100 cursor-pointer z-50"
                  >
                    Đăng xuất
                  </div>
                )}
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* <Navigation /> */}
    </header>
  );
};

export default Header;
