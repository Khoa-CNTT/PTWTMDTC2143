import React, { useState } from "react";
import { IoMdMore } from "react-icons/io";
import { Button } from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import Menu from "@mui/material/Menu";
import { IoTimerOutline } from "react-icons/io5";
import MenuItem from "@mui/material/MenuItem";

interface DashboardBoxProps {
  color?: [string, string];
  grows?: boolean;
  icon?: React.ReactNode;
}

const DashboardBox: React.FC<DashboardBoxProps> = (props) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <div
        className="dashboardBox"
        style={{
          backgroundImage: `linear-gradient(to right, ${props.color?.[0]}, ${props.color?.[1]})`,
        }}
      >
        {props.grows === true ? (
          <span className="chart">
            <TrendingUpIcon />
          </span>
        ) : (
          <span className="chart">
            <TrendingDownIcon />
          </span>
        )}
        <div className="flex w-full">
          <div className="col1">
            <h4 className="text-white mb-0">Total Users</h4>
            <span className="text-white">277</span>
          </div>
          <div className="ml-auto">
            {props.icon ? <span className="icon">{props.icon}</span> : ""}
          </div>
        </div>
        <div className="flex items-center w-full bottomEle">
          <h6 className="text-white mb-0 mt-0">Last Month</h6>
          <div className="ml-auto">
            <Button onClick={handleClick} className="toggleIcon ml-auto">
              <IoMdMore />
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={handleClose}>
                <IoTimerOutline />
                &nbsp;Last Day
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <IoTimerOutline />
                &nbsp;Last Week
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <IoTimerOutline />
                &nbsp;Last Month
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <IoTimerOutline />
                &nbsp;Last Year
              </MenuItem>
            </Menu>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardBox;
