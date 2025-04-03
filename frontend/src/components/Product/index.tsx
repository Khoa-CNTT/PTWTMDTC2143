import React, { useState } from 'react';
import { Typography, Button } from '@mui/material';
import { Slider, Checkbox, Select, MenuItem } from '@mui/material';
import { Link } from 'react-router-dom';
import Rating from '@mui/material/Rating';
type FilterType = {
  [key: string]: boolean;
};
const Product: React.FC = () => {
  const [priceRange, setPriceRange] = useState<number | number[]>([
    1500, 90500,
  ]);
  const [filters, setFilters] = useState<FilterType>({
    white: false,
    black: false,
    blue: false,
    red: false,
  });

  return (
    <>
      <div className="flex bg-gray-100">
        <aside className="mt-6 ms-5 h-[300px] bg-white shadow p-4  rounded-[20px]">
          <h2 className="text-lg font-semibold mb-4">Show all categories</h2>
          <ul className="text-gray-700">
            <li>
              <p className="font-bold text-orange-500">
                Laptop & Computer (45)
              </p>
              <ul className="ml-4 border-l-2 border-orange-400 pl-2">
                <li className="text-sm text-gray-600">Hardware (25)</li>
                <li className="text-sm text-gray-600">Software (30)</li>
              </ul>
            </li>
          </ul>
        </aside>

        <main className="flex-1 p-6  ">
          <div className="w-full h-64 bg-white shadow rounded-lg p-6 flex items-center">
            <div>
              <h1 className="text-3xl font-bold">
                Laptop & Computers Category
              </h1>
              <p className="text-gray-600 mt-2">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
            </div>
          </div>
        </main>
      </div>
      <div className="flex  gap-6 p-6 bg-gray-50 text-gray-900">
        <aside className="w-1/4 p-6 bg-white shadow-lg rounded-lg">
          <h2 className="text-lg font-bold mb-4 text-black">Filters</h2>
          <Typography gutterBottom className="text-gray-700 font-medium">
            Price range
          </Typography>
          <Slider
            value={priceRange}
            onChange={(e, newValue) => setPriceRange(newValue)}
            min={1500}
            max={90500}
            valueLabelDisplay="auto"
            sx={{ color: '#f97316' }}
          />
          <Typography gutterBottom className="text-gray-700 font-medium">
            Choose Brand
          </Typography>
          <Select fullWidth displayEmpty className="mb-4 border-gray-300">
            <MenuItem value="">Choose Brand</MenuItem>
          </Select>
          <Typography gutterBottom className="text-gray-700 font-medium">
            Choose Location
          </Typography>
          <Select fullWidth displayEmpty className="mb-4 border-gray-300">
            <MenuItem value="">Choose Location</MenuItem>
          </Select>
          <Typography gutterBottom className="text-gray-700 font-medium">
            Color
          </Typography>
          <div className="flex items-center justify-between">
            <Typography className="text-gray-700">Select All</Typography>
            <Checkbox sx={{ color: 'gray' }} />
          </div>
          <div className="grid grid-cols-2 gap-2 mb-4">
            {Object.keys(filters).map((color) => (
              <Button
                key={color}
                variant={filters[color] ? 'contained' : 'outlined'}
                onClick={() =>
                  setFilters({ ...filters, [color]: !filters[color] })
                }
                sx={{
                  borderColor: '#f97316',
                  color: filters[color] ? 'white' : '#f97316',
                  backgroundColor: filters[color] ? '#f97316' : 'transparent',
                }}
              >
                {color.charAt(0).toUpperCase() + color.slice(1)}
              </Button>
            ))}
          </div>
          <Typography className="text-orange-500 cursor-pointer">
            + Show more
          </Typography>
          <Button
            variant="contained"
            fullWidth
            sx={{
              backgroundColor: '#f97316',
              color: 'white',
              marginTop: 2,
              fontWeight: 'bold',
              fontSize: '1rem',
              padding: '10px',
            }}
          >
            FILTER
          </Button>
          <Typography className="text-orange-500 mt-2 text-center cursor-pointer">
            Reset Filter
          </Typography>
        </aside>
        <div className=" flex grid grid-cols-4 gap-4">
          <div className="productItem border-2 border-[rgba(0,0,0,0.1)] rounded-[20px] bg-[#f1f1f1] shadow-lg flex flex-col items-center">
            <div className="imgWrapper w-full h-[270px] overflow-hidden rounded-[20px] flex items-center justify-center">
              <img
                className="w-full h-full object-cover"
                src="https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/o/p/oppo-reno10-pro-plus-tim.png"
                alt=""
              />
            </div>
            <div className="info flex flex-col  justify-center gap-1 mt-4">
              <h3 className="text-[16px] font-[1000] text-[rgba(0,0,0,0.9)] ">
                <Link to="/" className="link transition-all">
                  OPPO Reno10 Pro+ 5G
                </Link>
              </h3>
              <div className="flex items-center justify-between mt-3 mb-3">
                <h3 className="font-[700] text-lg text-orange-500">$100</h3>
                <Rating
                  name="size-small"
                  defaultValue={4}
                  size="small"
                  readOnly
                />
              </div>
              <div className="mb-6">
                <Button
                  variant="outlined"
                  sx={{
                    borderColor: 'orange',
                    color: 'orange',
                    width: '100%',
                    minWidth: '200px',
                    padding: '4px 0',
                    fontSize: '16px',
                    '&:hover': {
                      borderColor: 'darkorange',
                      backgroundColor: 'rgba(255,165,0,0.1)',
                    },
                  }}
                >
                  Add to cart
                </Button>
              </div>
            </div>
          </div>
          <div className="productItem border-2 border-[rgba(0,0,0,0.1)] rounded-[20px] bg-[#f1f1f1] shadow-lg flex flex-col items-center">
            <div className="imgWrapper w-full h-[270px] overflow-hidden rounded-[20px] flex items-center justify-center">
              <img
                className="w-full h-full object-cover"
                src="https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/o/p/oppo-reno10-pro-plus-tim.png"
                alt=""
              />
            </div>
            <div className="info flex flex-col  justify-center gap-1 mt-4">
              <h3 className="text-[16px] font-[1000] text-[rgba(0,0,0,0.9)] ">
                <Link to="/" className="link transition-all">
                  OPPO Reno10 Pro+ 5G
                </Link>
              </h3>
              <div className="flex items-center justify-between mt-3 mb-3">
                <h3 className="font-[700] text-lg text-orange-500">$100</h3>
                <Rating
                  name="size-small"
                  defaultValue={4}
                  size="small"
                  readOnly
                />
              </div>
              <div className="mb-6">
                <Button
                  variant="outlined"
                  sx={{
                    borderColor: 'orange',
                    color: 'orange',
                    width: '100%',
                    minWidth: '200px',
                    padding: '4px 0',
                    fontSize: '16px',
                    '&:hover': {
                      borderColor: 'darkorange',
                      backgroundColor: 'rgba(255,165,0,0.1)',
                    },
                  }}
                >
                  Add to cart
                </Button>
              </div>
            </div>
          </div>
          <div className="productItem border-2 border-[rgba(0,0,0,0.1)] rounded-[20px] bg-[#f1f1f1] shadow-lg flex flex-col items-center">
            <div className="imgWrapper w-full h-[270px] overflow-hidden rounded-[20px] flex items-center justify-center">
              <img
                className="w-full h-full object-cover"
                src="https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/o/p/oppo-reno10-pro-plus-tim.png"
                alt=""
              />
            </div>
            <div className="info flex flex-col  justify-center gap-1 mt-4">
              <h3 className="text-[16px] font-[1000] text-[rgba(0,0,0,0.9)] ">
                <Link to="/" className="link transition-all">
                  OPPO Reno10 Pro+ 5G
                </Link>
              </h3>
              <div className="flex items-center justify-between mt-3 mb-3">
                <h3 className="font-[700] text-lg text-orange-500">$100</h3>
                <Rating
                  name="size-small"
                  defaultValue={4}
                  size="small"
                  readOnly
                />
              </div>
              <div className="mb-6">
                <Button
                  variant="outlined"
                  sx={{
                    borderColor: 'orange',
                    color: 'orange',
                    width: '100%',
                    minWidth: '200px',
                    padding: '4px 0',
                    fontSize: '16px',
                    '&:hover': {
                      borderColor: 'darkorange',
                      backgroundColor: 'rgba(255,165,0,0.1)',
                    },
                  }}
                >
                  Add to cart
                </Button>
              </div>
            </div>
          </div>
          <div className="productItem border-2 border-[rgba(0,0,0,0.1)] rounded-[20px] bg-[#f1f1f1] shadow-lg flex flex-col items-center">
            <div className="imgWrapper w-full h-[270px] overflow-hidden rounded-[20px] flex items-center justify-center">
              <img
                className="w-full h-full object-cover"
                src="https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/o/p/oppo-reno10-pro-plus-tim.png"
                alt=""
              />
            </div>
            <div className="info flex flex-col  justify-center gap-1 mt-4">
              <h3 className="text-[16px] font-[1000] text-[rgba(0,0,0,0.9)] ">
                <Link to="/" className="link transition-all">
                  OPPO Reno10 Pro+ 5G
                </Link>
              </h3>
              <div className="flex items-center justify-between mt-3 mb-3">
                <h3 className="font-[700] text-lg text-orange-500">$100</h3>
                <Rating
                  name="size-small"
                  defaultValue={4}
                  size="small"
                  readOnly
                />
              </div>
              <div className="mb-6">
                <Button
                  variant="outlined"
                  sx={{
                    borderColor: 'orange',
                    color: 'orange',
                    width: '100%',
                    minWidth: '200px',
                    padding: '4px 0',
                    fontSize: '16px',
                    '&:hover': {
                      borderColor: 'darkorange',
                      backgroundColor: 'rgba(255,165,0,0.1)',
                    },
                  }}
                >
                  Add to cart
                </Button>
              </div>
            </div>
          </div>
          <div className="productItem border-2 border-[rgba(0,0,0,0.1)] rounded-[20px] bg-[#f1f1f1] shadow-lg flex flex-col items-center">
            <div className="imgWrapper w-full h-[270px] overflow-hidden rounded-[20px] flex items-center justify-center">
              <img
                className="w-full h-full object-cover"
                src="https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/o/p/oppo-reno10-pro-plus-tim.png"
                alt=""
              />
            </div>
            <div className="info flex flex-col  justify-center gap-1 mt-4">
              <h3 className="text-[16px] font-[1000] text-[rgba(0,0,0,0.9)] ">
                <Link to="/" className="link transition-all">
                  OPPO Reno10 Pro+ 5G
                </Link>
              </h3>
              <div className="flex items-center justify-between mt-3 mb-3">
                <h3 className="font-[700] text-lg text-orange-500">$100</h3>
                <Rating
                  name="size-small"
                  defaultValue={4}
                  size="small"
                  readOnly
                />
              </div>
              <div className="mb-6">
                <Button
                  variant="outlined"
                  sx={{
                    borderColor: 'orange',
                    color: 'orange',
                    width: '100%',
                    minWidth: '200px',
                    padding: '4px 0',
                    fontSize: '16px',
                    '&:hover': {
                      borderColor: 'darkorange',
                      backgroundColor: 'rgba(255,165,0,0.1)',
                    },
                  }}
                >
                  Add to cart
                </Button>
              </div>
            </div>
          </div>
          <div className="productItem border-2 border-[rgba(0,0,0,0.1)] rounded-[20px] bg-[#f1f1f1] shadow-lg flex flex-col items-center">
            <div className="imgWrapper w-full h-[270px] overflow-hidden rounded-[20px] flex items-center justify-center">
              <img
                className="w-full h-full object-cover"
                src="https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/o/p/oppo-reno10-pro-plus-tim.png"
                alt=""
              />
            </div>
            <div className="info flex flex-col  justify-center gap-1 mt-4">
              <h3 className="text-[16px] font-[1000] text-[rgba(0,0,0,0.9)] ">
                <Link to="/" className="link transition-all">
                  OPPO Reno10 Pro+ 5G
                </Link>
              </h3>
              <div className="flex items-center justify-between mt-3 mb-3">
                <h3 className="font-[700] text-lg text-orange-500">$100</h3>
                <Rating
                  name="size-small"
                  defaultValue={4}
                  size="small"
                  readOnly
                />
              </div>
              <div className="mb-6">
                <Button
                  variant="outlined"
                  sx={{
                    borderColor: 'orange',
                    color: 'orange',
                    width: '100%',
                    minWidth: '200px',
                    padding: '4px 0',
                    fontSize: '16px',
                    '&:hover': {
                      borderColor: 'darkorange',
                      backgroundColor: 'rgba(255,165,0,0.1)',
                    },
                  }}
                >
                  Add to cart
                </Button>
              </div>
            </div>
          </div>
          <div className="productItem border-2 border-[rgba(0,0,0,0.1)] rounded-[20px] bg-[#f1f1f1] shadow-lg flex flex-col items-center">
            <div className="imgWrapper w-full h-[270px] overflow-hidden rounded-[20px] flex items-center justify-center">
              <img
                className="w-full h-full object-cover"
                src="https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/o/p/oppo-reno10-pro-plus-tim.png"
                alt=""
              />
            </div>
            <div className="info flex flex-col  justify-center gap-1 mt-4">
              <h3 className="text-[16px] font-[1000] text-[rgba(0,0,0,0.9)] ">
                <Link to="/" className="link transition-all">
                  OPPO Reno10 Pro+ 5G
                </Link>
              </h3>
              <div className="flex items-center justify-between mt-3 mb-3">
                <h3 className="font-[700] text-lg text-orange-500">$100</h3>
                <Rating
                  name="size-small"
                  defaultValue={4}
                  size="small"
                  readOnly
                />
              </div>
              <div className="mb-6">
                <Button
                  variant="outlined"
                  sx={{
                    borderColor: 'orange',
                    color: 'orange',
                    width: '100%',
                    minWidth: '200px',
                    padding: '4px 0',
                    fontSize: '16px',
                    '&:hover': {
                      borderColor: 'darkorange',
                      backgroundColor: 'rgba(255,165,0,0.1)',
                    },
                  }}
                >
                  Add to cart
                </Button>
              </div>
            </div>
          </div>
          <div className="productItem border-2 border-[rgba(0,0,0,0.1)] rounded-[20px] bg-[#f1f1f1] shadow-lg flex flex-col items-center">
            <div className="imgWrapper w-full h-[270px] overflow-hidden rounded-[20px] flex items-center justify-center">
              <img
                className="w-full h-full object-cover"
                src="https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/o/p/oppo-reno10-pro-plus-tim.png"
                alt=""
              />
            </div>
            <div className="info flex flex-col  justify-center gap-1 mt-4">
              <h3 className="text-[16px] font-[1000] text-[rgba(0,0,0,0.9)] ">
                <Link to="/" className="link transition-all">
                  OPPO Reno10 Pro+ 5G
                </Link>
              </h3>
              <div className="flex items-center justify-between mt-3 mb-3">
                <h3 className="font-[700] text-lg text-orange-500">$100</h3>
                <Rating
                  name="size-small"
                  defaultValue={4}
                  size="small"
                  readOnly
                />
              </div>
              <div className="mb-6">
                <Button
                  variant="outlined"
                  sx={{
                    borderColor: 'orange',
                    color: 'orange',
                    width: '100%',
                    minWidth: '200px',
                    padding: '4px 0',
                    fontSize: '16px',
                    '&:hover': {
                      borderColor: 'darkorange',
                      backgroundColor: 'rgba(255,165,0,0.1)',
                    },
                  }}
                >
                  Add to cart
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
