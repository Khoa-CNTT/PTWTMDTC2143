import React, { useState, useEffect } from 'react';
import {
  Typography,
  Button,
  Slider,
  Checkbox,
  Select,
  MenuItem,
  Pagination,
} from '@mui/material';

import {
  getAllProducts,
  Products,
  ProductsResponse,
} from '../../services/productsService';
import { getAllBrands } from '../../services/brandsService';
import { Brand } from '../../services/brandsService';
import ProductCard from './ProductCard';

type FilterType = {
  [key: string]: boolean;
};

const Product: React.FC = () => {
  const [products, setProducts] = useState<Products[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [selectedBrand, setSelectedBrand] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  // const [total, setTotal] = useState(0);
  const ITEMS_PER_PAGE = 8;

  const [priceRange, setPriceRange] = useState<number | number[]>([
    1500, 90500,
  ]);
  const [filters, setFilters] = useState<FilterType>({
    white: false,
    black: false,
    blue: false,
    red: false,
  });

  const fetchProducts = async (page: number) => {
    try {
      setLoading(true);
      setError(null);
      const response: ProductsResponse = await getAllProducts(
        page,
        ITEMS_PER_PAGE
      );
      console.log('Response for page', page, ':', response);

      // Update all states at once
      setProducts(response.products);
      // setTotal(response.total);
      const calculatedTotalPages = Math.ceil(response.total / ITEMS_PER_PAGE);
      setTotalPages(calculatedTotalPages);
    } catch (err) {
      // setError('Failed to fetch products');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage]);

  useEffect(() => {
    const fetchBrands = async () => {
      const res = await getAllBrands();
      setBrands(res);
    };
    fetchBrands();
  }, []);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    if (value !== currentPage) {
      setCurrentPage(value);
    }
  };

  return (
    <>
      <div className="flex bg-gray-100">
        <aside className="mt-6 ms-5 h-[300px] bg-white shadow p-4 rounded-[20px]">
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

        <main className="flex-1 p-6">
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

      <div className="flex gap-6 p-6 bg-gray-50 text-gray-900">
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
          <Select
            fullWidth
            displayEmpty
            className="mb-4 border-gray-300"
            value={selectedBrand}
            onChange={(e) => setSelectedBrand(e.target.value)}
          >
            <MenuItem value="">Choose Brand</MenuItem>
            {brands.map((brand) => (
              <MenuItem key={brand.id} value={brand.id}>
                {brand.name}
              </MenuItem>
            ))}
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

        <div className="flex-1">
          {loading ? (
            <div className="flex justify-center items-center min-h-[400px]">
              <Typography>Loading products...</Typography>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-4 gap-4">
                {products && products.length > 0 ? (
                  products.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onAddToCart={() => {
                        console.log('Add to cart:', product.id);
                      }}
                    />
                  ))
                ) : (
                  <Typography className="col-span-4 text-center py-8">
                    No products found
                  </Typography>
                )}
              </div>

              {totalPages > 1 && (
                <div className="flex flex-col items-center mt-8 gap-2">
                  <Typography>
                    Page {currentPage} of {totalPages}
                  </Typography>
                  <Pagination
                    count={totalPages}
                    page={currentPage}
                    onChange={handlePageChange}
                    color="primary"
                    disabled={loading}
                    sx={{
                      '& .MuiPaginationItem-root': {
                        color: '#f97316',
                        '&.Mui-selected': {
                          backgroundColor: '#f97316',
                          color: 'white',
                          '&:hover': {
                            backgroundColor: '#ea580c',
                          },
                        },
                        '&:hover': {
                          backgroundColor: 'rgba(249, 115, 22, 0.1)',
                        },
                      },
                    }}
                  />
                </div>
              )}

              {error && (
                <Typography color="error" className="text-center mt-4">
                  {error}
                </Typography>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Product;
