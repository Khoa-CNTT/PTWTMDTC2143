import React from 'react';
import { Link } from 'react-router-dom';
import Rating from '@mui/material/Rating';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';

const RecentlyViewed: React.FC = () => {
  return (
    <>
      <Swiper
        slidesPerView={5}
        spaceBetween={20}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        <SwiperSlide>
          <div className="recentlyViewed rounded-[20px] mt-5">
            <div className="grid grid-cols-1 gap-4 ">
              <div className="grid grid-cols-2 border-2 border-[rgba(0,0,0,0.1)] rounded-[20px] bg-[#f1f1f1] shadow-lg">
                <div className="imgWrapper w-[150px] h-[150px] overflow-hidden rounded-[20px]   ">
                  <img
                    className="w-full"
                    src="https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/p/o/poco-m6_1_.png"
                    alt=""
                  />
                </div>
                <div className="info w-[60%] ms-6">
                  <h3 className="text-[16px] font-[500] text-[rgba(0,0,0,0.9)]">
                    <Link to="/" className="link transition-all ">
                      Xiaomi POCO M6
                    </Link>
                  </h3>
                  <h3 className="mt-12 text-primary font-[500]">$150</h3>
                  <Rating
                    name="size-small"
                    defaultValue={4}
                    size="small"
                    readOnly
                  />
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="recentlyViewed rounded-[20px] mt-5">
            <div className="grid grid-cols-1 gap-4 ">
              <div className="grid grid-cols-2 border-2 border-[rgba(0,0,0,0.1)] rounded-[20px] bg-[#f1f1f1] shadow-lg">
                <div className="imgWrapper w-[150px] h-[150px] overflow-hidden rounded-[20px]   ">
                  <img
                    className="w-full"
                    src="https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/d/i/dien-thoai-xiaomi-redmi-note-14_2__2.png"
                    alt=""
                  />
                </div>
                <div className="info w-[60%] ms-6">
                  <h3 className="text-[16px] font-[500] text-[rgba(0,0,0,0.9)]">
                    <Link to="/" className="link transition-all ">
                      Redmi Note 14
                    </Link>
                  </h3>
                  <h3 className="mt-12 text-primary font-[500]">$219</h3>
                  <Rating
                    name="size-small"
                    defaultValue={4}
                    size="small"
                    readOnly
                  />
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="recentlyViewed rounded-[20px] mt-5">
            <div className="grid grid-cols-1 gap-4 ">
              <div className="grid grid-cols-2 border-2 border-[rgba(0,0,0,0.1)] rounded-[20px] bg-[#f1f1f1] shadow-lg">
                <div className="imgWrapper w-[150px] h-[150px] overflow-hidden rounded-[20px]   ">
                  <img
                    className="w-full"
                    src="https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/p/c/pc-cps-van-phong-s4-spa_2_1.png"
                    alt=""
                  />
                </div>
                <div className="info w-[60%] ms-6">
                  <h3 className="text-[16px] font-[500] text-[rgba(0,0,0,0.9)]">
                    <Link to="/" className="link transition-all ">
                      PC AMD R5 4600G
                    </Link>
                  </h3>
                  <h3 className="mt-12 text-primary font-[500]">$450</h3>
                  <Rating
                    name="size-small"
                    defaultValue={4}
                    size="small"
                    readOnly
                  />
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="recentlyViewed rounded-[20px] mt-5">
            <div className="grid grid-cols-1 gap-4 ">
              <div className="grid grid-cols-2 border-2 border-[rgba(0,0,0,0.1)] rounded-[20px] bg-[#f1f1f1] shadow-lg">
                <div className="imgWrapper w-[150px] h-[150px] overflow-hidden rounded-[20px]   ">
                  <img
                    className="w-full"
                    src="https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/r/o/robot-hut-bui-dreame-d9-max-gen-2_1_.png"
                    alt=""
                  />
                </div>
                <div className="info w-[60%] ms-6">
                  <h3 className="text-[16px] font-[500] text-[rgba(0,0,0,0.9)]">
                    <Link to="/" className="link transition-all ">
                      Robot Cleaner
                    </Link>
                  </h3>
                  <h3 className="mt-12 text-primary font-[500]">$269</h3>
                  <Rating
                    name="size-small"
                    defaultValue={4}
                    size="small"
                    readOnly
                  />
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="recentlyViewed rounded-[20px] mt-5">
            <div className="grid grid-cols-1 gap-4 ">
              <div className="grid grid-cols-2 border-2 border-[rgba(0,0,0,0.1)] rounded-[20px] bg-[#f1f1f1] shadow-lg">
                <div className="imgWrapper w-[150px] h-[150px] overflow-hidden rounded-[20px]   ">
                  <img
                    className="w-full"
                    src="https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/g/r/group_17333.png"
                    alt=""
                  />
                </div>
                <div className="info w-[60%] ms-6">
                  <h3 className="text-[16px] font-[500] text-[rgba(0,0,0,0.9)]">
                    <Link to="/" className="link transition-all ">
                      Headphone Bluetooth
                    </Link>
                  </h3>
                  <h3 className="mt-12 text-primary font-[500]">$199</h3>
                  <Rating
                    name="size-small"
                    defaultValue={4}
                    size="small"
                    readOnly
                  />
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="recentlyViewed rounded-[20px] mt-5">
            <div className="grid grid-cols-1 gap-4 ">
              <div className="grid grid-cols-2 border-2 border-[rgba(0,0,0,0.1)] rounded-[20px] bg-[#f1f1f1] shadow-lg">
                <div className="imgWrapper w-[150px] h-[150px] overflow-hidden rounded-[20px]   ">
                  <img
                    className="w-full"
                    src="https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/l/o/loa-xiaomi-soundbar-2-0-spa_1.png"
                    alt=""
                  />
                </div>
                <div className="info w-[60%] ms-6">
                  <h3 className="text-[16px] font-[500] text-[rgba(0,0,0,0.9)]">
                    <Link to="/" className="link transition-all ">
                      Speaker Bluetooth
                    </Link>
                  </h3>
                  <h3 className="mt-12 text-primary font-[500]">$149</h3>
                  <Rating
                    name="size-small"
                    defaultValue={4}
                    size="small"
                    readOnly
                  />
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="recentlyViewed rounded-[20px] mt-5">
            <div className="grid grid-cols-1 gap-4 ">
              <div className="grid grid-cols-2 border-2 border-[rgba(0,0,0,0.1)] rounded-[20px] bg-[#f1f1f1] shadow-lg">
                <div className="imgWrapper w-[150px] h-[150px] overflow-hidden rounded-[20px]   ">
                  <img
                    className="w-full"
                    src="https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/c/h/chuot-blue-tooth-hyperwork-1.png"
                    alt=""
                  />
                </div>
                <div className="info w-[60%] ms-6">
                  <h3 className="text-[16px] font-[500] text-[rgba(0,0,0,0.9)]">
                    <Link to="/" className="link transition-all ">
                      Mouse Hypework
                    </Link>
                  </h3>
                  <h3 className="mt-12 text-primary font-[500]">$49</h3>
                  <Rating
                    name="size-small"
                    defaultValue={4}
                    size="small"
                    readOnly
                  />
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
};
export default RecentlyViewed;
