import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import Rating from '@mui/material/Rating';

const HotSale: React.FC = () => {
  const product = [
    {
      id: 2,
      name: 'Xiaomi 15G',
      image:
        'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/d/i/dien-thoai-xiaomi-15_11_.png',
      price: 200,
      originalPrice: 250,
      rating: 4,
    },
    {
      id: 3,
      name: 'OPPO Reno10 Pro+ 5G',
      image:
        'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/o/p/oppo-reno10-pro-plus-tim.png',
      price: 100,
      originalPrice: 129,
      rating: 4,
    },
    {
      id: 4,
      name: 'iPhone 15 128GB',
      image:
        'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-15-plus_1__1.png',
      price: 329,
      originalPrice: 400,
      rating: 4,
    },
    {
      id: 5,
      name: 'Samsung Galaxy Z Flip6',
      image:
        'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/f/r/frame_166_3.png',
      price: 313,
      originalPrice: 410,
      rating: 4,
    },
    {
      id: 6,
      name: 'Samsung Galaxy S25',
      image:
        'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/d/i/dien-thoai-samsung-galaxy-s25_1__2.png',
      price: 299,
      originalPrice: 350,
      rating: 4,
    },
    {
      id: 7,
      name: 'Samsung Galaxy A15 LTE',
      image:
        'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/g/a/galaxy-a15-xanh-01.png',
      price: 270,
      originalPrice: 320,
      rating: 4,
    },
    {
      id: 8,
      name: 'Mouse Rapoo VT200',
      image:
        'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/1/_/1.4_5.png',
      price: 15,
      originalPrice: 22,

      rating: 4,
    },
    {
      id: 9,
      name: 'Headphone Sony WH-1000XM4',
      image:
        'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/g/r/group_17333.png',
      price: 199,
      originalPrice: 250,
      rating: 4,
    },
  ];
  const [wishlist, setWishlist] = useState<number[]>([]);

  const toggleWishlist = (id: number) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };
  return (
    <>
      <Swiper
        slidesPerView={5}
        spaceBetween={10}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper !pb-10"
      >
        {product.map((product) => (
          <SwiperSlide key={product.id}>
            <div className="productItem h-[450px] border-2 border-[rgba(0,0,0,0.1)] rounded-[20px] bg-[#f1f1f1] shadow-lg flex flex-col items-center relative overflow-hidden">
              <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded z-10">
                Discount{' '}
                {Math.round(
                  ((product.originalPrice - product.price) /
                    product.originalPrice) *
                    100
                )}
                %
              </div>
              <div className="imgWrapper w-full h-[220px] overflow-hidden rounded-[20px] flex items-center justify-center">
                <img
                  className="w-full h-full object-cover"
                  src={product.image}
                  alt={product.name}
                />
              </div>

              <div className="info flex flex-col items-center justify-center text-center gap-1 mt-4 w-full px-4">
                <h3 className="font-[700] text-lg text-orange-500">
                  ${product.price}
                </h3>
                <h3 className="line-through text-gray-500 text-sm">
                  ${product.originalPrice}
                </h3>

                <div className="mt-1 h-[48px] flex items-center justify-center">
                  <h3 className="text-[16px] font-[1000] text-[rgba(0,0,0,0.9)] text-center line-clamp-2 leading-tight">
                    <Link to="/product-detail" className="link transition-all">
                      {product.name}
                    </Link>
                  </h3>
                </div>
                <div className="flex items-center justify-between pt-2 pb-2 w-full ">
                  <Rating
                    name={`rating-${product.id}`}
                    defaultValue={product.rating}
                    size="small"
                    readOnly
                  />
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className="text-red-500 hover:text-red-600 transition-colors"
                  >
                    {wishlist.includes(product.id) ? (
                      <AiFillHeart className="text-2xl" />
                    ) : (
                      <AiOutlineHeart className="text-2xl" />
                    )}
                  </button>
                </div>
                <div className="mt-auto mb-4">
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
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};
export default HotSale;
