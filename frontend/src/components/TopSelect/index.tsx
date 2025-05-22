import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Link } from 'react-router-dom';
import Rating from '@mui/material/Rating';
import { Pagination } from 'swiper/modules';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';

const TopSelect: React.FC = () => {
  const products = [
    {
      id: 1,
      name: 'Xiaomi 15G Ultra 12GB 256GB',
      image:
        'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/d/i/dien-thoai-xiaomi-15_11_.png',
      sold: '1M sold',
      price: 200,
      originalPrice: 250,
      rating: 4,
    },

    {
      id: 2,
      name: 'Samsung Galaxy Tab S9 FE 5G 6GB 128GB',
      image:
        'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/t/a/tab-s9-fe-5g-doc-quyen.png',
      sold: '1M sold',
      price: 400,
      originalPrice: 500,
      rating: 4,
    },
    {
      id: 3,
      name: 'Xiaomi Redmi Pad SE Wifi 6GB 128GB',
      image:
        'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/x/i/xiaomi-redmi-pad-se_1_3.png',
      sold: '1M sold',
      price: 210,
      originalPrice: 270,
      rating: 4,
    },
    {
      id: 4,
      name: 'Samsung Galaxy S25 Ultra 12GB 256GB',
      image:
        'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/d/i/dien-thoai-samsung-galaxy-s25-ultra_2__5.png',
      sold: '1M sold',
      price: 1500,
      originalPrice: 1700,
      rating: 4,
    },
    {
      id: 5,
      name: 'Camera IP 360 IMOU IPC-A32EP',
      image:
        'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/c/a/camera-ip-wifi-imou-ipc-s2xp-6m0wed-6mp-2-ong-kinh_2_2.png',
      sold: '1M sold',
      price: 50,
      originalPrice: 70,
      rating: 4,
    },
    {
      id: 6,
      name: 'Headphone Bluetooth SoundPEATS Air4 Pro',
      image:
        'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/t/a/tai-nghe-khong-day-soundpeats-air-4-pro_9_.png',
      sold: '1M sold',
      price: 50,
      originalPrice: 89,
      rating: 4,
    },
    {
      id: 7,
      name: 'Power Bank Xiaomi 30000mAh 18W',
      image:
        'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/a/sac-pin-du-phong-xiaomi-30000mah-18w_3_.png',
      sold: '1M sold',
      price: 49,
      originalPrice: 75,
      rating: 4,
    },
    {
      id: 8,
      name: 'Headphone Bluetooth Sport Nothing Ear Open',
      image:
        'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/1/_/1_718_21.png',
      sold: '1M sold',
      price: 129,
      originalPrice: 199,
      rating: 4,
    },
    {
      id: 9,
      name: 'Samsung Galaxy A16 5G 8GB 128GB',
      image:
        'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/a/samsung-a16-5g_2_.png',
      sold: '1M sold',
      price: 259,
      originalPrice: 310,
      rating: 4,
    },
    {
      id: 10,
      name: 'Samsung Galaxy S25 Ultra 12GB 256GB',
      image:
        'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/d/i/dien-thoai-samsung-galaxy-s25-ultra_3__3.png',
      sold: '1M sold',
      price: 1099,
      originalPrice: 1300,
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
      <div className="topSelect mt-5">
        <Swiper
          slidesPerView={5}
          spaceBetween={10}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
          className="mySwiper !pb-10"
        >
          {products.map((product) => (
            <SwiperSlide key={product.id}>
              <div className="relative productItem flex flex-col border border-[rgba(0,0,0,0.1)] rounded-[20px] bg-[#f1f1f1] h-[400px] overflow-hidden">
                <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded z-10">
                  Discount{' '}
                  {Math.round(
                    ((product.originalPrice - product.price) /
                      product.originalPrice) *
                      100
                  )}
                  %
                </div>

                <div className="imgWrapper w-full h-[220px] overflow-hidden rounded-t-[20px]">
                  <img
                    className="w-full h-full object-cover"
                    src={product.image}
                    alt={product.name}
                  />
                </div>

                <div className="flex flex-col justify-between flex-1 p-4">
                  <h3 className="text-[16px] font-[500] text-[rgba(0,0,0,0.9)] leading-tight">
                    <Link to="/product-detail" className="link transition-all">
                      {product.name}
                    </Link>
                  </h3>

                  <div className="mt-2 mb-3">
                    <h3 className="text-sm text-gray-500 mb-1">
                      {product.sold}
                    </h3>
                    <div className="flex items-center gap-2">
                      <h3 className="text-primary font-[500] text-red-600">
                        ${product.price}
                      </h3>
                      <h3 className="line-through text-gray-500 text-sm">
                        ${product.originalPrice}
                      </h3>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-auto pt-2 border-gray-200">
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
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};
export default TopSelect;
