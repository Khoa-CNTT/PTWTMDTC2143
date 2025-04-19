import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import { IoIosClose } from 'react-icons/io';
import '../Navigation/style.css';
import {
  FaThLarge,
  FaBoxOpen,
  FaUsers,
  FaClipboardList,
  FaChevronDown,
} from 'react-icons/fa';
import { MdCategory, MdLogout } from 'react-icons/md';

interface CategoryPanelProps {
  isOpenCatPanel: boolean;
  setIsOpenCatPanel: (isOpen: boolean) => void;
}

const CategoryPanel: React.FC<CategoryPanelProps> = (props) => {
  const [isProductOpen, setIsProductOpen] = useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    props.setIsOpenCatPanel(newOpen);
  };

  const toggleProductDropdown = () => {
    setIsProductOpen(!isProductOpen);
  };

  const DrawerList = (
    <div className="w-64 min-h-screen bg-white p-4 shadow-md flex flex-col justify-between">
      <div className="space-y-2">
        {/* Dashboard */}
        <div className="flex items-center gap-3 text-gray-700 cursor-pointer p-2 rounded-lg hover:bg-gray-100">
          <FaThLarge />
          <span>Dashboard</span>
          <div className="ml-auto">
            <IoIosClose
              className="cursor-pointer text-[20px]"
              onClick={toggleDrawer(false)}
            />
          </div>
        </div>
        <div className="rounded-lg hover:bg-gray-100">
          <div
            className="flex items-center justify-between text-gray-800 p-2 cursor-pointer"
            onClick={toggleProductDropdown}
          >
            <div className="flex items-center gap-3 font-medium">
              <FaBoxOpen className="text-blue-500" />
              <span>Product</span>
            </div>
            <FaChevronDown
              className={`transform ${isProductOpen ? 'rotate-180' : 'rotate-0'}`}
            />
          </div>
          {isProductOpen && (
            <div className="ml-10 mt-1 mb-2 space-y-1 text-sm text-gray-600">
              <div className="cursor-pointer hover:text-black">
                <a href="/product-list">Product List</a>
              </div>
              <div className="cursor-pointer hover:text-black">
                <a href="/product-view">Product View</a>
              </div>
              <div className="cursor-pointer hover:text-black">
                <a href="/product-upload">Product Upload</a>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between text-gray-700 cursor-pointer p-2 rounded-lg hover:bg-gray-100">
          <div className="flex items-center gap-3">
            <MdCategory />
            <span>Category</span>
          </div>
          <FaChevronDown />
        </div>

        <div className="flex items-center gap-3 text-gray-700 cursor-pointer p-2 rounded-lg hover:bg-gray-100">
          <FaUsers />
          <span>Users</span>
        </div>

        <div className="flex items-center gap-3 text-gray-700 cursor-pointer p-2 rounded-lg hover:bg-gray-100">
          <FaClipboardList />
          <span>Orders</span>
        </div>
      </div>

      <div className="bg-blue-100 rounded-2xl p-4 mt-4">
        <button className="w-full bg-blue-500 text-white py-2 rounded-xl flex items-center justify-center gap-2 hover:bg-blue-600 text-sm font-medium">
          <MdLogout className="text-lg" />
          LOGOUT
        </button>
      </div>
    </div>
  );

  return (
    <>
      <Drawer open={props.isOpenCatPanel} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </>
  );
};

export default CategoryPanel;
