import React, { useEffect, useState } from 'react';
import {
  getAllProducts,
  Products,
  ProductsResponse,
} from '../../services/productsService';
import { Grid, Typography, Pagination } from '@mui/material';
import ProductCard from './ProductCard';
import { Link } from 'react-router-dom';

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Products[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const ITEMS_PER_PAGE = 8;

  const fetchProducts = async (page: number) => {
    try {
      setLoading(true);
      setError(null);
      console.log('=== API Request Debug ===');
      console.log('Request URL params:', {
        page,
        limit: ITEMS_PER_PAGE,
      });
      const response: ProductsResponse = await getAllProducts(
        page,
        ITEMS_PER_PAGE
      );
      console.log('=== API Response Debug ===');
      console.log('Full Response:', response);
      console.log('First product ID:', response.products[0]?.id);
      console.log(
        'Last product ID:',
        response.products[response.products.length - 1]?.id
      );
      console.log('Total products:', response.total);
      console.log('Current page:', page);
      console.log('=====================');

      setProducts(response.products);
      setTotal(response.total);
      const calculatedTotalPages = Math.ceil(response.total / ITEMS_PER_PAGE);
      setTotalPages(calculatedTotalPages);
    } catch (err) {
      setError('Failed to fetch products');
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage]);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    if (value !== currentPage) {
      setCurrentPage(value);
    }
  };

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Products ({total})
      </Typography>

      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
            <Link
              to={`/product/${product.id}`}
              style={{ textDecoration: 'none' }}
            >
              <ProductCard
                product={product}
                onAddToCart={() => {
                  console.log('Add to cart:', product.id);
                }}
              />
            </Link>
          </Grid>
        ))}
      </Grid>

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
    </div>
  );
};

export default ProductList;
