import React, { useState, useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import Rating from '@mui/material/Rating';
import { FaFireAlt } from 'react-icons/fa';
import { flashSaleService, FlashSale } from '../../services/flashSaleService';
import { cartService } from '../../services/cartService';
import { toast } from 'react-toastify';
import './style.css';

const HotSale: React.FC = () => {
  const [flashSales, setFlashSales] = useState<FlashSale[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [addingToCart, setAddingToCart] = useState<string | null>(null);

  useEffect(() => {
    const fetchFlashSales = async () => {
      try {
        const response = await flashSaleService.getFlashSales(10);
        setFlashSales(response.data);
      } catch (err) {
        setError('Failed to fetch flash sales');
        console.error('Error fetching flash sales:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFlashSales();
  }, []);

  const [wishlist, setWishlist] = useState<string[]>([]);
  const toggleWishlist = (variantId: string) => {
    setWishlist((prev) =>
      prev.includes(variantId)
        ? prev.filter((x) => x !== variantId)
        : [...prev, variantId]
    );
  };

  const handleAddToCart = async (variantId: string) => {
    try {
      setAddingToCart(variantId);
      await cartService.addToCart(variantId, 1);
      toast.success('Đã thêm vào giỏ hàng!');
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('Không thể thêm vào giỏ hàng. Vui lòng thử lại!');
    } finally {
      setAddingToCart(null);
    }
  };

  // Get the first active flash sale
  const activeFlashSale = flashSales[0];
  const saleEndTimeRef = useRef(
    activeFlashSale
      ? new Date(activeFlashSale.endDate).getTime()
      : Date.now() + 2 * 60 * 60 * 1000
  );

  const [remainingTime, setRemainingTime] = useState(
    Math.floor((saleEndTimeRef.current - Date.now()) / 1000)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const timeLeft = Math.max(
        Math.floor((saleEndTimeRef.current - Date.now()) / 1000),
        0
      );
      setRemainingTime(timeLeft);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTimeParts = (totalSeconds: number) => {
    const h = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
    const m = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
    const s = String(totalSeconds % 60).padStart(2, '0');
    return { h, m, s };
  };

  const { h, m, s } = formatTimeParts(remainingTime);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!activeFlashSale) {
    return <div>No active flash sales</div>;
  }

  return (
    <div className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 pb-6 rounded-3xl shadow-xl p-6">
      <h3 className="text-[36px] font-extrabold flex items-center text-white drop-shadow-md tracking-wide">
        <FaFireAlt className="me-3 text-white animate-pulse text-4xl" />
        {activeFlashSale.title}
      </h3>

      <div className="flex justify-center items-center ">
        <div className="flex flex-col md:flex-row items-center gap-3  font-mono text-white">
          <span className=" font-semibold">⏰ Kết thúc sau:</span>
          <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-2xl shadow-inner border border-white/30">
            {[h, m, s].map((value, index) => (
              <React.Fragment key={index}>
                <div className="w-8 h-8 bg-yellow-200 text-red-700 flex items-center justify-center rounded-full shadow-lg font-extrabold">
                  {value}
                </div>
                {index < 2 && (
                  <span className="text-yellow-200 text-2xl font-bold -mt-1">
                    :
                  </span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      <Swiper
        slidesPerView={5}
        spaceBetween={10}
        pagination={{ clickable: true }}
        modules={[Pagination]}
        className="mySwiper !pb-10 mt-6"
      >
        {activeFlashSale.products.map((product) => (
          <SwiperSlide key={product.variantId}>
            <div className="productItem h-[450px] border-2 border-[rgba(0,0,0,0.1)] rounded-[20px] bg-[#f1f1f1] shadow-lg flex flex-col items-center relative overflow-hidden">
              <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded z-10">
                Giảm{' '}
                {Math.round(
                  ((product.variant.price - product.flashPrice) /
                    product.variant.price) *
                    100
                )}
                %
              </div>

              <div className="imgWrapper w-full h-[220px] overflow-hidden rounded-[20px] flex items-center justify-center">
                <img
                  className="w-full h-full object-cover"
                  src={product.variant.images[0]?.imageUrl}
                  alt={product.variant.sku}
                />
              </div>

              <div className="info flex flex-col items-center justify-center text-center gap-1 mt-4 w-full px-4">
                <h3 className="font-[700] text-lg text-orange-500">
                  {product.flashPrice.toLocaleString('vi-VN')}đ
                </h3>
                <h3 className="line-through text-gray-500 text-sm">
                  {product.variant.price.toLocaleString('vi-VN')}đ
                </h3>

                <div className="mt-1 h-[48px] flex items-center justify-center">
                  <h3 className="text-[16px] font-[1000] text-[rgba(0,0,0,0.9)] text-center line-clamp-2 leading-tight">
                    <Link
                      to={`/product-detail/${product.variant.productId}`}
                      className="link transition-all"
                    >
                      {product.variant.sku}
                    </Link>
                  </h3>
                </div>

                <div className="flex items-center justify-between pt-2 pb-2 w-full">
                  <Rating
                    name={`rating-${product.variantId}`}
                    defaultValue={4}
                    size="small"
                    readOnly
                  />
                  <button
                    onClick={() => toggleWishlist(product.variantId)}
                    className="text-red-500 hover:text-red-600 transition-colors"
                  >
                    {wishlist.includes(product.variantId) ? (
                      <AiFillHeart className="text-2xl" />
                    ) : (
                      <AiOutlineHeart className="text-2xl" />
                    )}
                  </button>
                </div>

                <div className="mt-auto mb-4">
                  <Button
                    variant="outlined"
                    disabled={addingToCart === product.variantId}
                    onClick={() => handleAddToCart(product.variantId)}
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
                      '&:disabled': {
                        borderColor: 'gray',
                        color: 'gray',
                      },
                    }}
                  >
                    {addingToCart === product.variantId
                      ? 'Đang thêm...'
                      : 'Thêm vào giỏ'}
                  </Button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HotSale;
