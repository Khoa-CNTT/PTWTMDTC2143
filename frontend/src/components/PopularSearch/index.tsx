import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { Link } from 'react-router-dom';
import Rating from '@mui/material/Rating';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';

const PopularSearch: React.FC = () => {
  const [wishlist, setWishlist] = useState<number[]>([]);

  const toggleWishlist = (id: number) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const products = [
    {
      id: 1,
      name: 'Xiaomi 15G Ultra 12GB 256GB',
      image:
        'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/d/i/dien-thoai-xiaomi-15_11_.png',
      price: 200,
      originalPrice: 250,
      rating: 4,
    },
    {
      id: 2,
      name: 'OPPO Reno10 Pro+ 5G',
      image:
        'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/o/p/oppo-reno10-pro-plus-tim.png',
      price: 100,
      originalPrice: 129,
      rating: 4,
    },
    {
      id: 3,
      name: 'iPhone 15 128GB',
      image:
        'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-15-plus_1__1.png',
      price: 329,
      originalPrice: 400,
      rating: 5,
    },
    {
      id: 4,
      name: 'Samsung Galaxy Z Flip6',
      image:
        'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/f/r/frame_166_3.png',
      price: 313,
      originalPrice: 410,
      rating: 4,
    },
    {
      id: 5,
      name: 'Samsung Galaxy S25',
      image:
        'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/d/i/dien-thoai-samsung-galaxy-s25_1__2.png',
      price: 299,
      originalPrice: 350,
      rating: 5,
    },
    {
      id: 6,
      name: 'Samsung Galaxy A15 LTE',
      image:
        'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/g/a/galaxy-a15-xanh-01.png',
      price: 270,
      originalPrice: 320,
      rating: 4,
    },
    {
      id: 7,
      name: 'Mouse Rapoo VT200',
      image:
        'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/1/_/1.4_5.png',
      price: 15,
      originalPrice: 22,
      rating: 4,
    },
    {
      id: 8,
      name: 'Headphone Sony WH-1000XM4',
      image:
        'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/g/r/group_17333.png',
      price: 199,
      originalPrice: 250,
      rating: 5,
    },
    {
      id: 9,
      name: 'iPhone 14 Pro Max 128GB',
      image:
        'https://cdn2.cellphones.com.vn/358x/media/catalog/product/i/p/iphone_14_pro_-_tim_1.png',
      price: 999,
      originalPrice: 1099,
      rating: 5,
    },
    {
      id: 10,
      name: 'Samsung Galaxy S23 Ultra',
      image:
        'https://cdn2.cellphones.com.vn/358x/media/catalog/product/g/a/galaxy-s23-ultra-xanh.png',
      price: 850,
      originalPrice: 950,
      rating: 4,
    },
  ];

  return (
    <>
      <div className="bg-gray-200 p-6 rounded-[20px] shadow-md">
        <h3 className=" text-[30px] font-[500] pb-3">Popula Search</h3>
        <Swiper
          slidesPerView={5}
          spaceBetween={10}
          pagination={{ clickable: true }}
          modules={[Pagination]}
          className="mySwiper !pb-10"
        >
          {products.map((product) => (
            <SwiperSlide key={product.id}>
              <div className="relative productItem h-[400px] border-2 border-[rgba(0,0,0,0.1)] rounded-[20px] bg-[#f1f1f1] shadow-lg flex flex-col items-center overflow-hidden">
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

                <div className="info flex flex-col h-[140px] px-4 w-full">
                  <div className="text-center mt-2">
                    <h3 className="font-[700] text-lg text-orange-500">
                      ${product.price}
                    </h3>
                    <h3 className="line-through text-gray-500 text-sm">
                      ${product.originalPrice}
                    </h3>
                  </div>

                  <div className="mt-auto h-[48px] flex items-center justify-center">
                    <h3 className="text-[16px] font-[1000] text-[rgba(0,0,0,0.9)] text-center line-clamp-2 leading-tight">
                      <Link
                        to="/product-detail"
                        className="link transition-all"
                      >
                        {product.name}
                      </Link>
                    </h3>
                  </div>
                </div>

                <div className="flex items-center justify-between px-4  w-full ">
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
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default PopularSearch;
