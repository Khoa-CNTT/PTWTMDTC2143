import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

import { RiMenu2Fill } from 'react-icons/ri';
import { FaAngleDown } from 'react-icons/fa';
import CategoryPanel from './CategoryPanel';

const Navigation: React.FC = () => {
  const [isOpenCatPanel, setIsOpenCatPanel] = useState(false);
  const openCategoryPanel = () => {
    setIsOpenCatPanel(true);
  };

  return (
    <>
      <nav className="py-2">
        <div className="container flex items-center justify-end ">
          <div className="col_1 w-[20%]">
            <Button
              className="!text-black gap-2 w-full"
              onClick={openCategoryPanel}
            >
              <RiMenu2Fill className="text-[18px]" />
              Shop By Categories
              <FaAngleDown className="text-[13px] ml-auto font-bold" />
            </Button>
          </div>
          <div className="col_2 w-[80%]">
            <ul className="flex items-center gap-3">
              <li className="list-none relative group">
                <Link
                  to="/product"
                  className="link transition text-[14px] font-[500]"
                >
                  <Button className="link transition !font-[500] !text-[rgba(0,0,0,0.8)] hover:!text-[#ff5252]">
                    Smartphone
                  </Button>
                </Link>
                <ul className="absolute left-0 top-full hidden group-hover:block bg-white shadow-md rounded-lg p-2 z-50">
                  <li className="p-2 hover:bg-gray-100">
                    <Link
                      to="/smartphone/android"
                      className="text-sm text-gray-700"
                    >
                      Android Phones
                    </Link>
                  </li>
                  <li className="p-2 hover:bg-gray-100">
                    <Link
                      to="/smartphone/ios"
                      className="text-sm text-gray-700"
                    >
                      iOS Phones
                    </Link>
                  </li>
                  <li className="p-2 hover:bg-gray-100">
                    <Link
                      to="/smartphone/accessories"
                      className="text-sm text-gray-700"
                    >
                      Smartphone Accessories
                    </Link>
                  </li>
                </ul>
              </li>

              <li className="list-none relative group">
                <Link to="/" className="link transition text-[14px] font-[500]">
                  <Button className="link transition !font-[500] !text-[rgba(0,0,0,0.8)] hover:!text-[#ff5252]">
                    Computer
                  </Button>
                </Link>
                <ul className="absolute left-0 top-full hidden group-hover:block bg-white shadow-md rounded-lg p-2 z-50">
                  <li className="p-2 hover:bg-gray-100">
                    <Link
                      to="/computer/laptops"
                      className="text-sm text-gray-700"
                    >
                      Laptops
                    </Link>
                  </li>
                  <li className="p-2 hover:bg-gray-100">
                    <Link
                      to="/computer/desktops"
                      className="text-sm text-gray-700"
                    >
                      Desktops
                    </Link>
                  </li>
                  <li className="p-2 hover:bg-gray-100">
                    <Link
                      to="/computer/accessories"
                      className="text-sm text-gray-700"
                    >
                      Computer Accessories
                    </Link>
                  </li>
                </ul>
              </li>

              <li className="list-none relative group">
                <Link to="/" className="link transition text-[14px] font-[500]">
                  <Button className="link transition !font-[500] !text-[rgba(0,0,0,0.8)] hover:!text-[#ff5252]">
                    Gaming Equipments
                  </Button>
                </Link>
                <ul className="absolute left-0 top-full hidden group-hover:block bg-white shadow-md rounded-lg p-2 z-50">
                  <li className="p-2 hover:bg-gray-100">
                    <Link
                      to="/gaming/consoles"
                      className="text-sm text-gray-700"
                    >
                      Gaming Consoles
                    </Link>
                  </li>
                  <li className="p-2 hover:bg-gray-100">
                    <Link
                      to="/gaming/accessories"
                      className="text-sm text-gray-700"
                    >
                      Gaming Accessories
                    </Link>
                  </li>
                  <li className="p-2 hover:bg-gray-100">
                    <Link to="/gaming/pc" className="text-sm text-gray-700">
                      Gaming PCs
                    </Link>
                  </li>
                </ul>
              </li>

              <li className="list-none relative group">
                <Link to="/" className="link transition text-[14px] font-[500]">
                  <Button className="link transition !font-[500] !text-[rgba(0,0,0,0.8)] hover:!text-[#ff5252]">
                    TV & Monitors
                  </Button>
                </Link>
                <ul className="absolute left-0 top-full hidden group-hover:block bg-white shadow-md rounded-lg p-2 z-50">
                  <li className="p-2 hover:bg-gray-100">
                    <Link to="/tv/led" className="text-sm text-gray-700">
                      LED TVs
                    </Link>
                  </li>
                  <li className="p-2 hover:bg-gray-100">
                    <Link to="/tv/oled" className="text-sm text-gray-700">
                      OLED TVs
                    </Link>
                  </li>
                  <li className="p-2 hover:bg-gray-100">
                    <Link to="/monitors" className="text-sm text-gray-700">
                      Monitors
                    </Link>
                  </li>
                </ul>
              </li>

              <li className="list-none relative group">
                <Link to="/" className="link transition text-[14px] font-[500]">
                  <Button className="link transition !font-[500] !text-[rgba(0,0,0,0.8)] hover:!text-[#ff5252]">
                    Headphones
                  </Button>
                </Link>
                <ul className="absolute left-0 top-full hidden group-hover:block bg-white shadow-md rounded-lg p-2 z-50">
                  <li className="p-2 hover:bg-gray-100">
                    <Link
                      to="/headphones/wireless"
                      className="text-sm text-gray-700"
                    >
                      Wireless Headphones
                    </Link>
                  </li>
                  <li className="p-2 hover:bg-gray-100">
                    <Link
                      to="/headphones/wired"
                      className="text-sm text-gray-700"
                    >
                      Wired Headphones
                    </Link>
                  </li>
                  <li className="p-2 hover:bg-gray-100">
                    <Link
                      to="/headphones/noise-cancelling"
                      className="text-sm text-gray-700"
                    >
                      Noise Cancelling Headphones
                    </Link>
                  </li>
                </ul>
              </li>

              <li className="list-none relative group">
                <Link to="/" className="link transition text-[14px] font-[500]">
                  <Button className="link transition !font-[500] !text-[rgba(0,0,0,0.8)] hover:!text-[#ff5252]">
                    Speaker
                  </Button>
                </Link>
                <ul className="absolute left-0 top-full hidden group-hover:block bg-white shadow-md rounded-lg p-2 z-50">
                  <li className="p-2 hover:bg-gray-100">
                    <Link
                      to="/speaker/bluetooth"
                      className="text-sm text-gray-700"
                    >
                      Bluetooth Speakers
                    </Link>
                  </li>
                  <li className="p-2 hover:bg-gray-100">
                    <Link
                      to="/speaker/home-theater"
                      className="text-sm text-gray-700"
                    >
                      Home Theater Systems
                    </Link>
                  </li>
                  <li className="p-2 hover:bg-gray-100">
                    <Link
                      to="/speaker/portable"
                      className="text-sm text-gray-700"
                    >
                      Portable Speakers
                    </Link>
                  </li>
                </ul>
              </li>

              <li className="list-none">
                <Link
                  to="/electric-ai"
                  className="link transition text-[14px] font-[500] "
                >
                  <Button className="link transition !font-[500] !text-[rgba(0,0,0,0.8)] hover:!text-[#ff5252]">
                    AI ELECTRIC
                  </Button>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <CategoryPanel
        isOpenCatPanel={isOpenCatPanel}
        setIsOpenCatPanel={setIsOpenCatPanel}
      />
    </>
  );
};
export default Navigation;
