import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/images/MESSIU-logo2.png';
import SearchBox from '../SearchBox';
import { Button } from '@mui/material';
import { FaUserCheck } from 'react-icons/fa';
import Navigation from '../../components/Header/Navigation';

const Header: React.FC = () => {
  return (
    <header className="bg-white">
      <div className="header py-2 lg:py-4 border-b-[1px] border-gray-250">
        <div className="container flex items-center gap-4 flex-wrap justify-start">
          <div className="w-auto min-w-[120px]">
            <Link to={'/'}>
              <img src={Logo} alt="Logo" className="h-10 object-contain" />
            </Link>
          </div>

          <div className="flex items-center  flex-1 min-w-[200px]">
            <Navigation />
            <div className="hidden lg:block w-full max-w-[400px]">
              <SearchBox />
            </div>
          </div>

          <div className="w-auto flex justify-end ml-auto">
            <ul className="flex items-center gap-3">
              <li>
                <Button className="!text-[#000] myAccountWrap flex items-center gap-3 cursor-pointer">
                  <FaUserCheck className="text-2xl text-gray-700" />
                  <div className="info flex flex-col text-left">
                    <h4 className="text-[14px] text-[rgba(0,0,0,0.6)] font-[500] mb-0 capitalize">
                      Admin
                    </h4>
                    <span className="text-[13px] text-[rgba(0,0,0,0.6)] font-[400] capitalize">
                      Messiu
                    </span>
                  </div>
                </Button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
