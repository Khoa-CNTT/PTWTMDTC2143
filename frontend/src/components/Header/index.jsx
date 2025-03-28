import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/images/MESSIU-logo2.png";
import SearchBox from "../SearchBox";
import { TfiShoppingCartFull } from "react-icons/tfi";
import { Button } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import { FaUserCheck } from "react-icons/fa";
import Navigation from '../../components/Header/Navigation';
const Header = () => {
  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      right: -3,
      top: 3,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: "0 4px",
    },
  }));
  return (
    <header className="bg-white">
      <div className="top-strip lg:block py-2 border-t-[1px] border-gray-250  border-b-[1px]">
        <div className="container">
          <div className="flex items-center justify-between">
            <div className="col1 w-[50%]">
              <p className="text-[12px] font-[500] mt-0 mb-0">
                Get up to 50% off new season styles, limited time only.
              </p>
            </div>
            <div className="col2 flex items-center justify-between w-full lg:w-[50%] lg:justify-end">
              <ul className="flex items-center gap-3 w-full justify-between lg:w-[200px]">
                <li class="list-none">
                  <Link
                    class="text-[11px] lg:text-[13px] link font-[500] transition"
                    href="/help-center"
                    data-discover="true"
                  >
                    Help Center{" "}
                  </Link>
                </li>
                <li class="list-none">
                  <Link
                    class="text-[11px] lg:text-[13px] link font-[500] transition"
                    href="/order-tracking"
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

      <div className="header py-2 lg:py-4 border-b-[1px] border-gray-250">
        <div className="container flex items-center justify-between">
          <div className="col1 w-[40%] lg:w-[25%]">
            <Link to={"/"}>
              <img src={Logo} />
            </Link>
          </div>
          <div className="col2 fixed top-0 left-0 w-full h-full lg:w-[40%] lg:static p-2 lg:p-0 bg-white z-50 !block hidden">
            <SearchBox />
          </div>
          <div className="col3 w-[10%] lg:w-[30%] flex items-center pl-7">
            <ul className="flex items-center justify-end gap-0 lg:gap-3 w-full">
              <li>
                <Button className="!text-[#000] myAccountWrap flex items-center gap-3 cursor-pointer">
                  <IconButton aria-label="cart">
                    <StyledBadge badgeContent={4} color="secondary">
                      <ShoppingCartIcon />
                    </StyledBadge>
                  </IconButton>
                  <div className="info flex flex-col">
                    <h4 className="leading-3 text-[14px] text-[rgba(0,0,0,0.6)] font-[500] mb-0 capitalize text-left justify-start">
                      Cart
                    </h4>
                    <span class="text-[13px] text-[rgba(0,0,0,0.6)]  font-[400] capitalize text-left justify-start">
                      $150.000
                    </span>
                  </div>
                </Button>
              </li>

              <div className="h-6 w-[1px] bg-gray-300"></div>
              <li>
                <Button className="!text-[#000] myAccountWrap flex items-center gap-3 cursor-pointer">
                  <FaUserCheck className="text-2xl text-gray-700" />
                  <div className="info flex flex-col">
                    <h4 className="leading-3 text-[14px] text-[rgba(0,0,0,0.6)] font-[500] mb-0 capitalize text-left justify-start">
                      User
                    </h4>
                    <span class="text-[13px] text-[rgba(0,0,0,0.6)]  font-[400] capitalize text-left justify-start">
                      Messiu
                    </span>
                  </div>
                </Button>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Navigation />
    </header>
  );
};

export default Header;
