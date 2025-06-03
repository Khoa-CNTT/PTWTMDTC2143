import React, { useState, useEffect } from 'react';
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
import { TbDeviceComputerCamera } from 'react-icons/tb';
import { MdWatch } from 'react-icons/md';
import { BsFullscreen } from 'react-icons/bs';
import { GiPc } from 'react-icons/gi';
import { FaTv } from 'react-icons/fa';
import { useAuth } from '../../contexts/AuthContext';
import { FaHeart } from 'react-icons/fa';
import { categoryService } from '../../services/categoryService';

interface Category {
  id: string;
  name: string;
  // Add other category properties as needed
}

function getCategoryIcon(name: string) {
  const lower = name.toLowerCase();
  if (lower.includes('điện thoại')) return <IoPhonePortraitOutline />;
  if (lower.includes('laptop')) return <IoIosLaptop className="text-2xl" />;
  if (lower.includes('đồng hồ')) return <MdWatch className="text-2xl" />;
  if (lower.includes('camera'))
    return <TbDeviceComputerCamera className="text-2xl" />;
  if (lower.includes('pc')) return <GiPc className="text-2xl" />;
  if (lower.includes('màn hình')) return <BsFullscreen className="text-2xl" />;
  if (lower.includes('tivi') || lower.includes('tv'))
    return <FaTv className="text-2xl" />;
  return null;
}

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [categories, setCategories] = useState<Category[]>([]);
  // const [isHoveringUser, setIsHoveringUser] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [subCategories, setSubCategories] = useState<
    Record<string, Category[]>
  >({});

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await categoryService.getRootCategoriesWithProductCount();
        setCategories(res);
      } catch (err) {
        setCategories([]);
      }
    };
    fetchCategories();
  }, []);

  const handleCartClick = () => {
    if (isAuthenticated) {
      navigate('/shopping-cart');
    } else {
      navigate('/login');
    }
  };

  const handleUserClick = () => {
    if (isAuthenticated) {
      navigate('/profile');
    } else {
      navigate('/login');
    }
  };

  const handleWishlistClick = () => {
    if (isAuthenticated) {
      navigate('/wishlist');
    } else {
      navigate('/login');
    }
  };

  const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      right: -3,
      top: 3,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '0 4px',
    },
  }));

  // Fetch subcategories on hover
  const handleCategoryHover = async (catId: string) => {
    if (!subCategories[catId]) {
      const response = await categoryService.getSubCategories(catId);
      console.log('Fetched subcategories:', response);
      setSubCategories((prev) => ({ ...prev, [catId]: response }));
    }
    setHoveredCategory(catId);
  };

  // Fetch products by subcategory
  const handleSubCategoryClick = (subCat: Category) => {
    // Chuyển hướng sang trang /product với query ?categoryId=subCat.id
    navigate(`/product?categoryId=${subCat.id}`);
    setIsOpen(false); // Đóng dropdown nếu cần
  };

  return (
    <header
      className={`z-[1000] w-full transition ${isOpen ? 'shadow-lg bg-blue-50' : 'bg-white'} sticky top-0`}
    >
      <div
        className={`top-strip lg:block py-2 border-t-[1px] border-gray-250 border-b-[1px] ${isOpen ? 'bg-white' : ''}`}
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
        className={`header py-2 lg:py-4 border-b-[1px] border-gray-250 ${isOpen ? 'bg-white' : ''}`}
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
              className={`mt-3 px-5 py-2 rounded-md whitespace-nowrap flex items-center gap-2  transition-colors duration-300
    ${
      isOpen
        ? 'bg-orange-600 text-white hover:bg-orange-700'
        : 'border border-orange-300 text-orange-500 hover:bg-orange-300'
    }`}
            >
              <CiViewList className="text-2xl" />
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
                  <ul className="w-64 border-r divide-y text-sm relative">
                    {categories.map((cat) => (
                      <div
                        key={cat.id}
                        className="relative"
                        onMouseEnter={() => handleCategoryHover(cat.id)}
                        onMouseLeave={() => setHoveredCategory(null)}
                      >
                        <li
                          className="flex justify-between items-center px-4 py-3 hover:bg-gray-100 cursor-pointer relative gap-2"
                          style={{ position: 'relative' }}
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-lg">
                              {getCategoryIcon(cat.name)}
                            </span>
                            <span>{cat.name}</span>
                          </div>
                          <ChevronRight className="h-4 w-4" />
                        </li>
                        {/* Subcategory dropdown */}
                        {hoveredCategory === cat.id &&
                          subCategories[cat.id] &&
                          subCategories[cat.id].length > 0 && (
                            <div
                              className="absolute left-full top-0 mt-0 bg-white border rounded-lg shadow-lg z-[1002] min-w-[220px] p-2 flex flex-col gap-2"
                              style={{ display: 'block' }}
                            >
                              {subCategories[cat.id].map((sub) => (
                                <div
                                  key={sub.id}
                                  className="px-4 py-2 hover:bg-orange-100 cursor-pointer rounded text-left transition-all duration-150 gap-2 flex items-center"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleSubCategoryClick(sub);
                                  }}
                                >
                                  <span className="truncate">{sub.name}</span>
                                </div>
                              ))}
                            </div>
                          )}
                      </div>
                    ))}
                  </ul>
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
              {isAuthenticated ? (
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
              ) : null}

              <li className="relative">
                <Button
                  onClick={handleUserClick}
                  className="!text-[#000] myAccountWrap flex items-center gap-3 cursor-pointer"
                >
                  {isAuthenticated ? user?.name || 'Profile' : 'Login'}
                </Button>
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
