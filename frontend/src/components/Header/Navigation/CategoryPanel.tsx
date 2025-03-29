import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import { FaRegPlusSquare } from "react-icons/fa";
import { IoIosClose } from "react-icons/io";
import "../Navigation/style.css";

interface CategoryPanelProps {
  isOpenCatPanel: boolean;
  setIsOpenCatPanel: (isOpen: boolean) => void;
}

const CategoryPanel: React.FC<CategoryPanelProps> = (props) => {
  const toggleDrawer = (newOpen: boolean) => () => {
    props.setIsOpenCatPanel(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" className="categoryPanel">
      <h3 className='p-3 text-[20px] font-[500] flex items-center justify-between'>
        Shop by categories 
        <IoIosClose className='curser-pointer text-[20px]' onClick={toggleDrawer(false)} />
      </h3>
      <div className="scroll">
        <ul className='w-full'>
          <li className='list-none flex items-center relative'>
            <Button className='w-full !text-left !justify-start !px-3 !text-[rgba(0,0,0,0.8)]'>Accessories</Button>
          </li>
        </ul>
        <ul className='w-full'>
          <li className='list-none flex items-center relative'>
            <Button className='w-full !text-left !justify-start !px-3 !text-[rgba(0,0,0,0.8)]'>Smartphone</Button>
          </li>
        </ul>
        <ul className='w-full'>
          <li className='list-none flex items-center relative'>
            <Button className='w-full !text-left !justify-start !px-3 !text-[rgba(0,0,0,0.8)]'>Computer</Button>
          </li>
        </ul>
        <ul className='w-full'>
          <li className='list-none flex items-center relative'>
            <Button className='w-full !text-left !justify-start !px-3 !text-[rgba(0,0,0,0.8)]'>Gaming Equipments</Button>
          </li>
        </ul>
        <ul className='w-full'>
          <li className='list-none flex items-center relative'>
            <Button className='w-full !text-left !justify-start !px-3 !text-[rgba(0,0,0,0.8)]'>TV & Monitors</Button>
          </li>
        </ul>
        <ul className='w-full'>
          <li className='list-none flex items-center relative'>
            <Button className='w-full !text-left !justify-start !px-3 !text-[rgba(0,0,0,0.8)]'>Headphones</Button>
          </li>
        </ul>
        <ul className='w-full'>
          <li className='list-none flex items-center relative'>
            <Button className='w-full !text-left !justify-start !px-3 !text-[rgba(0,0,0,0.8)]'>Speaker</Button>
          </li>
        </ul>
      </div>
    </Box>
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