import React, { useState } from "react";
import { IoTimerOutline } from "react-icons/io5";
import DashboardBox from "./components/dashboardBox";
import { RxAvatar } from "react-icons/rx";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { IoBagHandleOutline } from "react-icons/io5";
import { TbStars } from "react-icons/tb";
import { IoMdMore } from "react-icons/io";
import {
  Button,
  Menu,
  MenuItem,
  Pagination,
  FormControl,
  Select,
  Rating,
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";
import { Chart } from "react-google-charts";
import { FaEye, FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { Link } from "react-router-dom";

const Dashboard: React.FC = () => {
  // For Button MORE (3 dots)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // For GOOGLE CHART
  const data = [
    ["Task", "Hours per Day"],
    ["2013", 9],
    ["2014", 2],
    ["2015", 2],
    ["2016", 2],
  ];
  const options = {
    backgroundColor: "transparent",
    chartArea: { width: "100%", height: "80%" },
  };

  // For SELECT
  const [age, setAge] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };
  const handleCateChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value);
  };

  return (
    <>
      <div className="w-full">
        <div className="flex flex-wrap">
          <div className="w-full md:w-2/3">
            <div className="flex space-x-4">
              <DashboardBox
                color={["#1da256", "#48d483"]}
                icon={<RxAvatar />}
                grows={true}
              />
              <DashboardBox
                color={["#c012e2", "#eb64fe"]}
                icon={<HiOutlineShoppingCart />}
              />
              <DashboardBox
                color={["#2c75e5", "#60aff5"]}
                icon={<IoBagHandleOutline />}
              />
              <DashboardBox color={["#e1950e", "#f3cd29"]} icon={<TbStars />} />
            </div>
          </div>

          <div className="w-full md:w-1/3 pl-0">
            <div className="bg-gray-800 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <h6 className="text-white mb-0">Total Sales</h6>
                <Button onClick={handleClick} className="ml-auto">
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
              <h3 className="text-white font-bold">$3,787,681.00</h3>
              <p>$3,578.90 in last month</p>

              <Chart
                chartType="PieChart"
                data={data}
                options={options}
                width={"100%"}
                height="170px"
              />
            </div>
          </div>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6 mt-6">
          <h3 className="text-lg font-bold">Best Selling Products</h3>
          <div className="flex flex-wrap mt-4 space-x-4">
            <div className="w-full md:w-1/4">
              <h4 className="text-sm font-semibold">SHOW BY</h4>
              <FormControl size="small" className="w-full">
                <Select
                  value={age}
                  onChange={handleChange}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className="w-full md:w-1/4">
              <h4 className="text-sm font-semibold">CATEGORY BY</h4>
              <FormControl size="small" className="w-full">
                <Select
                  value={category}
                  onChange={handleCateChange}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
          <div className="overflow-x-auto mt-6">
            <table className="table-auto w-full border-collapse border border-gray-200">
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th className="px-4 py-2">UID</th>
                  <th className="px-4 py-2">PRODUCT</th>
                  <th className="px-4 py-2">CATEGORY</th>
                  <th className="px-4 py-2">BRAND</th>
                  <th className="px-4 py-2">PRICE</th>
                  <th className="px-4 py-2">STOCK</th>
                  <th className="px-4 py-2">RATING</th>
                  <th className="px-4 py-2">ORDER</th>
                  <th className="px-4 py-2">SALES</th>
                  <th className="px-4 py-2">ACTION</th>
                </tr>
              </thead>
              <tbody>
                {/* Example row */}
                <tr>
                  <td className="border px-4 py-2">#1</td>
                  <td className="border px-4 py-2">
                    <div className="flex items-center">
                      <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden">
                        <img
                          src="https://mironcoder-hotash.netlify.app/images/product/01.webp"
                          alt="product test"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="ml-4">
                        <h6 className="font-semibold">Tops and skirt set...</h6>
                        <p className="text-sm text-gray-500">
                          Women's exclusive summer Tops and skirt set
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="border px-4 py-2">Womans</td>
                  <td className="border px-4 py-2">Richman</td>
                  <td className="border px-4 py-2">
                    <del className="text-gray-500">$21.00</del>
                    <span className="text-red-500 ml-2">$21.00</span>
                  </td>
                  <td className="border px-4 py-2">
                    <Rating name="read-only" size="small" value={4} readOnly />
                  </td>
                  <td className="border px-4 py-2">4.9(16)</td>
                  <td className="border px-4 py-2">380</td>
                  <td className="border px-4 py-2">$38k</td>
                  <td className="border px-4 py-2">
                    <div className="flex space-x-2">
                      <Link to="/product/details">
                        <Button className="text-blue-500">
                          <FaEye />
                        </Button>
                      </Link>
                      <Button className="text-green-500">
                        <FaEdit />
                      </Button>
                      <Button className="text-red-500">
                        <MdDeleteForever />
                      </Button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="flex justify-between items-center mt-4">
              <p>
                Showing <b>10</b> of <b>60</b> results
              </p>
              <Pagination count={10} showFirstButton showLastButton />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
