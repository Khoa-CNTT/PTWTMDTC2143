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
      <Button className="!text-black " onClick={openCategoryPanel}>
        <RiMenu2Fill />
      </Button>

      <CategoryPanel
        isOpenCatPanel={isOpenCatPanel}
        setIsOpenCatPanel={setIsOpenCatPanel}
      />
    </>
  );
};
export default Navigation;
