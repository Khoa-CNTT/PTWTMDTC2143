import React from 'react';
import { Link } from 'react-router-dom';
import Rating from '@mui/material/Rating';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';

const RecentlyViewed: React.FC = () => {
  const product = [
    {
      id: 1,
      name: 'Xiaomi POCO M6',
      price: 150,
      image:
        'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/p/o/poco-m6_1_.png',
      rating: 4,
    },
    {
      id: 2,
      name: 'Redmi Note 14',
      price: 219,
      image:
        'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/d/i/dien-thoai-xiaomi-redmi-note-14_2__2.png',
      rating: 4,
    },
    {
      id: 3,
      name: 'PC AMD R5 4600G',
      price: 450,
      image:
        'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/p/c/pc-cps-van-phong-s4-spa_2_1.png',
      rating: 4,
    },
    {
      id: 4,
      name: 'Robot Cleaner',
      price: 269,
      image:
        'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/r/o/robot-hut-bui-dreame-d9-max-gen-2_1_.png',
      rating: 4,
    },
    {
      id: 5,
      name: 'Headphone Bluetooth',
      price: 199,
      image:
        'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/g/r/group_17333.png',
      rating: 4,
    },
    {
      id: 6,
      name: 'Speaker Bluetooth',
      price: 149,
      image:
        'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/l/o/loa-xiaomi-soundbar-2-0-spa_1.png',
      rating: 4,
    },
    {
      id: 7,
      name: 'Mouse Hypework',
      price: 49,
      image:
        'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/c/h/chuot-blue-tooth-hyperwork-1.png',
      rating: 4,
    },
  ];

  return (
    <>
      <div className="bg-gray-200 p-6 rounded-[20px] shadow-md">
        <h3 className="text-[30px] font-[500] flex items-center pb-3">
          Recently Viewed
        </h3>
        <Swiper
          slidesPerView={5}
          spaceBetween={10}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
          className="mySwiper !pb-10"
        >
          {product.map(({ id, name, price, image, rating }) => (
            <SwiperSlide key={id}>
              <div className="recentlyViewed rounded-[20px]">
                <div className="grid grid-cols-1 gap-4">
                  <div className="grid grid-cols-2 border-2 border-[rgba(0,0,0,0.1)] rounded-[20px] bg-[#f1f1f1] shadow-lg">
                    <div className="w-full h-full rounded-[20px] overflow-hidden">
                      <img
                        className="w-full h-full object-cover"
                        src={image}
                        alt={name}
                      />
                    </div>
                    <div className="p-4 flex flex-col justify-between">
                      <div>
                        <h3 className="text-[16px] font-[500] text-[rgba(0,0,0,0.9)] -mt-3">
                          <Link
                            to="/product-detail"
                            className="link transition-all"
                          >
                            {name}
                          </Link>
                        </h3>
                      </div>
                      <div className="mt-4">
                        <h3 className="text-primary font-[500]">${price}</h3>
                        <Rating
                          name="size-small"
                          value={rating}
                          size="small"
                          readOnly
                        />
                      </div>
                    </div>
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
export default RecentlyViewed;
