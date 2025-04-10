import React, { useState } from "react";
import { Link } from "react-router-dom";
import { RiDashboardHorizontalFill } from "react-icons/ri";
import { Button } from "@mui/material";
import { FaProductHunt } from "react-icons/fa6";
import { IoIosArrowForward } from "react-icons/io";
import { FaCartArrowDown } from "react-icons/fa";
import { TbMessageCircleBolt } from "react-icons/tb";
import { MdNotificationsActive } from "react-icons/md";
import { IoSettingsSharp } from "react-icons/io5";
import { FaUserEdit } from "react-icons/fa";
import { IoLogOutOutline } from "react-icons/io5";

const SideBar: React.FC = () => {
  const [isActive, setIsActive] = useState<number | null>(null);
  const [showProduct, setShowProduct] = useState<boolean>(true);

  const handleActive = (index: number): void => {
    setIsActive(index);
  };

  const handleProduct = (): void => {
    setShowProduct(!showProduct);
  };

  return (
    <>
      <div className="sidebar">
        <ul>
          <li>
            <Link to={"/"}>
              <Button
                className={isActive === 0 ? "w-full active" : "w-full"}
                onClick={() => handleActive(0)}
              >
                <span className="icon">
                  <RiDashboardHorizontalFill />
                </span>
                &nbsp;Dashboard
              </Button>
            </Link>
          </li>

          <li>
            <Link to={"/"}>
              <Button
                className={`w-full ${showProduct ? "active" : ""}`}
                onClick={() => {
                  handleProduct();
                  setIsActive(1);
                }}
              >
                <span className="icon">
                  <FaProductHunt />
                </span>
                &nbsp;Product
                <span className="arrow">
                  <IoIosArrowForward />
                </span>
              </Button>
            </Link>
            <div
              className={`submenuWrapper ${showProduct ? "colapse" : "colapsed"}`}
            >
              <ul className="submenu">
                <li>
                  <a href="/products">Product List</a>
                </li>
                <li>
                  <a href="/product/details">Product View</a>
                </li>
                <li>
                  <a href="/product/upload">Product Upload</a>
                </li>
              </ul>
            </div>
          </li>

          <li>
            <Link to={"/"}>
              <Button
                className={isActive === 2 ? "w-full active" : "w-full"}
                onClick={() => handleActive(2)}
              >
                <span className="icon">
                  <FaCartArrowDown />
                </span>
                &nbsp;Orders
                <span className="arrow">
                  <IoIosArrowForward />
                </span>
              </Button>
            </Link>
          </li>

          <li>
            <Link to={"/"}>
              <Button
                className={isActive === 3 ? "w-full active" : "w-full"}
                onClick={() => handleActive(3)}
              >
                <span className="icon">
                  <TbMessageCircleBolt />
                </span>
                &nbsp;Messages
                <span className="arrow">
                  <IoIosArrowForward />
                </span>
              </Button>
            </Link>
          </li>

          <li>
            <Link to={"/"}>
              <Button
                className={isActive === 4 ? "w-full active" : "w-full"}
                onClick={() => handleActive(4)}
              >
                <span className="icon">
                  <MdNotificationsActive />
                </span>
                &nbsp;Notifications
                <span className="arrow">
                  <IoIosArrowForward />
                </span>
              </Button>
            </Link>
          </li>

          <li>
            <Link to={"/"}>
              <Button
                className={isActive === 5 ? "w-full active" : "w-full"}
                onClick={() => handleActive(5)}
              >
                <span className="icon">
                  <IoSettingsSharp />
                </span>
                &nbsp;Settings
                <span className="arrow">
                  <IoIosArrowForward />
                </span>
              </Button>
            </Link>
          </li>

          <li>
            <Link to={"/"}>
              <Button
                className={isActive === 6 ? "w-full active" : "w-full"}
                onClick={() => handleActive(6)}
              >
                <span className="icon">
                  <FaUserEdit />
                </span>
                &nbsp;Users
              </Button>
            </Link>
          </li>
        </ul>
        <br />

        <div className="logoutWrapper">
          <div className="logoutBox">
            <Link to="/login">
              <Button variant="contained">
                <IoLogOutOutline />
                LOGOUT
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideBar;
