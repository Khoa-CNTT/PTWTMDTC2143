import { Breadcrumbs, Button } from "@mui/material";
import React, { useContext } from "react";
import { FaHome, FaEye, FaEdit } from "react-icons/fa";
import { MdExpandMore, MdDeleteForever } from "react-icons/md";
import { RxAvatar } from "react-icons/rx";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { IoBagHandleOutline } from "react-icons/io5";
import Chip from "@mui/material/Chip";
import { emphasize, styled } from "@mui/material/styles";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import Pagination from "@mui/material/Pagination";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Rating from "@mui/material/Rating";
import { Link } from "react-router-dom";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import { MyContext } from "../../context/MyContext";

const StyledBreadcrumb = styled(Chip)(({ theme }) => {
  const backgroundColor =
    theme.palette.mode === "light"
      ? theme.palette.grey[100]
      : theme.palette.grey[800];
  return {
    backgroundColor,
    height: theme.spacing(3),
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightRegular,
    "&:hover, &:focus": {
      backgroundColor: emphasize(backgroundColor, 0.06),
    },
    "&:active": {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(backgroundColor, 0.12),
    },
  };
});

const Products: React.FC = () => {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error("Header must be used within a MyContextProvider");
  }

  const [age, setAge] = React.useState<string>("");
  const [category, setCategory] = React.useState<string>("");

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };
  const handleCateChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value);
  };

  const dashboardBoxes = [
    {
      gradient: "from-[#1da256] to-[#48d483]",
      icon: <RxAvatar />,
      trend: <TrendingUpIcon />,
      title: "Total Users",
      value: "277",
    },
    {
      gradient: "from-[#c012e2] to-[#eb64fe]",
      icon: <HiOutlineShoppingCart />,
      trend: <TrendingDownIcon />,
      title: "Total Users",
      value: "277",
    },
    {
      gradient: "from-[#2c75e5] to-[#60aff5]",
      icon: <IoBagHandleOutline />,
      trend: <TrendingUpIcon />,
      title: "Total Users",
      value: "277",
    },
  ];

  const productData = Array.from({ length: 10 }, (_, i) => ({
    uid: `#${i + 1}`,
    image: "https://mironcoder-hotash.netlify.app/images/product/01.webp",
    title: "Tops and skirt set for Female...",
    description:
      "Women's exclusive summer Tops and skirt set for Female Tops and skirt set",
    category: "Womans",
    brand: "Richman",
    oldPrice: "$21.00",
    newPrice: "$21.00",
    rating: 4,
    ratingText: "4.9(16)",
    orders: "380",
    sales: "$38k",
  }));

  return (
    <>
      <div className="right-content w-full">
        <div className="shadow border-0 w-full flex flex-row p-4">
          <h5 className="mb-0">Product List</h5>
          <Breadcrumbs aria-label="breadcrumb" className="ml-auto breadcrumbs_">
            <StyledBreadcrumb
              component="a"
              href="#"
              label="Dashboard"
              icon={<FaHome fontSize="small" />}
            />
            <StyledBreadcrumb label="Products" deleteIcon={<MdExpandMore />} />
          </Breadcrumbs>
        </div>

        <div className="flex flex-wrap dashboardBoxWrapperRow dashboardBoxWrapperRowV2">
          <div className="w-full">
            <div className="dashboardBoxWrapper flex flex-wrap gap-4">
              {dashboardBoxes.map((box, index) => (
                <Button
                  key={index}
                  className="dashboardBox flex-1 min-w-[200px]"
                  style={{
                    backgroundImage: `linear-gradient(to right, ${box.gradient.split(" ")[0]}, ${box.gradient.split(" ")[1]})`,
                  }}
                >
                  <span className="chart">{box.trend}</span>
                  <div className="flex w-full">
                    <div className="col1">
                      <h4 className="text-white mb-1">{box.title}</h4>
                      <span className="text-white">{box.value}</span>
                    </div>
                    <div className="ml-auto">
                      <span className="icon">{box.icon}</span>
                    </div>
                  </div>
                </Button>
              ))}
            </div>
          </div>
        </div>

        <div className="shadow border-0 p-3 mt-4">
          <h3 className="hd">Best Selling Products</h3>
          <div className="flex flex-wrap cardFilters mt-3">
            {[
              { label: "SHOW BY", value: age, onChange: handleChange },
              {
                label: "CATEGORY BY",
                value: category,
                onChange: handleCateChange,
              },
            ].map((filter, index) => (
              <div key={index} className="w-full md:w-3/12">
                <h4>{filter.label}</h4>
                <FormControl
                  size="small"
                  className="w-full"
                  sx={{ m: 1, minWidth: 120 }}
                >
                  <Select
                    value={filter.value}
                    onChange={filter.onChange}
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
            ))}
          </div>

          <div className="overflow-x-auto mt-3">
            <table className="table-auto w-full border-collapse v-align">
              <thead className="thead-dark bg-gray-800 text-white">
                <tr>
                  <th className="p-2">UID</th>
                  <th className="p-2 w-[300px]">PRODUCT</th>
                  <th className="p-2">CATEGORY</th>
                  <th className="p-2">BRAND</th>
                  <th className="p-2">PRICE</th>
                  <th className="p-2">STOCK</th>
                  <th className="p-2">RATING</th>
                  <th className="p-2">ORDER</th>
                  <th className="p-2">SALES</th>
                  <th className="p-2">ACTION</th>
                </tr>
              </thead>
              <tbody>
                {productData.map((product, index) => (
                  <tr key={index} className="border-b">
                    <td className="p-2">{product.uid}</td>
                    <td className="p-2">
                      <div className="flex items-center productBox">
                        <div className="imgWrapper">
                          <div className="img shadow m-0">
                            <img
                              src={product.image}
                              alt="product test"
                              className="w-full"
                            />
                          </div>
                        </div>
                        <div className="info pl-3">
                          <h6>{product.title}</h6>
                          <p>{product.description}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-2">{product.category}</td>
                    <td className="p-2">{product.brand}</td>
                    <td className="p-2 w-[70px]">
                      <del className="old">{product.oldPrice}</del>
                      <span className="new text-red-500">
                        {product.newPrice}
                      </span>
                    </td>
                    <td className="p-2">
                      <Rating
                        name="read-only"
                        size="small"
                        value={product.rating}
                        readOnly
                      />
                    </td>
                    <td className="p-2">{product.ratingText}</td>
                    <td className="p-2">{product.orders}</td>
                    <td className="p-2">{product.sales}</td>
                    <td className="p-2">
                      <div className="actions flex items-center">
                        <Link to="/product/details">
                          <Button className="view">
                            <FaEye />
                          </Button>
                        </Link>
                        <Button className="edit">
                          <FaEdit />
                        </Button>
                        <Button className="delete">
                          <MdDeleteForever />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex justify-between items-center tableFooter mt-3">
              <p>
                Showing <b>10</b> of <b>60</b> results
              </p>
              <Pagination
                className="pagination"
                count={10}
                showFirstButton
                showLastButton
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;
