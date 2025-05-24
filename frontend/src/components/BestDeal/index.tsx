import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Rating from '@mui/material/Rating';
import { getBestDealProducts, Products } from '../../services/productsService';
import { CircularProgress, Typography } from '@mui/material';

const BestDeal: React.FC = () => {
  const [products, setProducts] = useState<Products[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getBestDealProducts(10);
        setProducts(data);
      } catch (err) {
        console.error('Error fetching best deal products:', err);
        setError('Không thể tải danh sách sản phẩm. Vui lòng thử lại sau.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <Typography color="error">{error}</Typography>
      </div>
    );
  }

  if (!products.length) {
    return (
      <div className="text-center py-8">
        <Typography>Không có sản phẩm nào</Typography>
      </div>
    );
  }

  return (
    <div className="bestDeal mt-5">
      <Typography variant="h5" className="mb-4 font-semibold">
        Sản phẩm giảm giá tốt nhất
      </Typography>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {products.map((product) => (
          <div
            key={product.id}
            className="grid grid-cols-2 border border-gray-200 rounded-[20px] bg-white hover:shadow-lg transition-shadow duration-300 overflow-hidden"
          >
            <div className="w-full h-full rounded-[20px] overflow-hidden">
              <img
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                src={
                  product.images?.[0]?.imageUrl ||
                  'https://via.placeholder.com/150'
                }
                alt={product.title || 'Product image'}
              />
            </div>
            <div className="p-4 flex flex-col justify-between">
              <div>
                <h3 className="text-[16px] font-medium text-gray-800 line-clamp-2">
                  <Link
                    to={`/product/${product.id}`}
                    className="hover:text-primary transition-colors duration-200"
                  >
                    {product.title}
                  </Link>
                </h3>
              </div>
              <div className="mt-4">
                <div className="flex items-center gap-2">
                  <h3 className="text-primary font-medium">
                    ${product.price?.toFixed(2)}
                  </h3>
                  {product.variants?.[0]?.compareAtPrice && (
                    <span className="text-gray-500 line-through text-sm">
                      ${product.variants[0].compareAtPrice.toFixed(2)}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-1 mt-1">
                  <Rating
                    name="size-small"
                    value={product.rating || 0}
                    size="small"
                    readOnly
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BestDeal;
