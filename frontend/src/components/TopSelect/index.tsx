import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Link } from 'react-router-dom';
import Rating from '@mui/material/Rating';
import { Pagination } from 'swiper/modules';

const TopSelect: React.FC = () => {
  return (
    <>
      <div className="topSelect mt-5">
        <Swiper
          slidesPerView={5}
          spaceBetween={30}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
          className="mySwiper"
        >
          <SwiperSlide>
            <div className="productItem border-2 border-[rgba(0,0,0,0.1)] rounded-[20px] bg-[#f1f1f1] shadow-lg ">
              <div className="imgWrapper imgWrapper w-[100%] h-[300px] overflow-hidden rounded-[20px] ">
                <img
                  className="w-full"
                  src="https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/d/i/dien-thoai-xiaomi-15_11_.png"
                  alt=""
                />
              </div>
              <div className="info ms-4">
                <h3 className="text-[18px] font-[500] text-[rgba(0,0,0,0.9)]">
                  <Link to="/" className="link transition-all ">
                    Xiaomi 15G Ultra 12GB 256GB
                  </Link>
                </h3>
                <h3 className="light-through text-gray-500">1M sold</h3>
                <div className="flex items-center mt-8 mb-4">
                  <h3 className=" text-primary font-[500]">200$</h3>
                  <h3 className=" line-through text-gray-500 ms-4 me-12">
                    250$
                  </h3>
                  <Rating
                    name="size-small"
                    defaultValue={4}
                    size="small"
                    readOnly
                  />
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="productItem border-2 border-[rgba(0,0,0,0.1)] rounded-[20px] bg-[#f1f1f1] shadow-lg mb-9">
              <div className="imgWrapper imgWrapper w-[100%] h-[300px] overflow-hidden rounded-[20px] ">
                <img
                  className="w-full"
                  src="https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/t/a/tab-s9-fe-5g-doc-quyen.png"
                  alt=""
                />
              </div>
              <div className="info ms-4">
                <h3 className="text-[18px] font-[500] text-[rgba(0,0,0,0.9)]">
                  <Link to="/" className="link transition-all ">
                    Samsung Galaxy Tab S9 FE 5G 6GB 128GB
                  </Link>
                </h3>
                <h3 className="light-through text-gray-500">1M sold</h3>
                <div className="flex items-center mt-8 mb-4">
                  <h3 className=" text-primary font-[500]">400$</h3>
                  <h3 className=" line-through text-gray-500 ms-4 me-12">
                    500$
                  </h3>
                  <Rating
                    name="size-small"
                    defaultValue={4}
                    size="small"
                    readOnly
                  />
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="productItem border-2 border-[rgba(0,0,0,0.1)] rounded-[20px] bg-[#f1f1f1] shadow-lg ">
              <div className="imgWrapper imgWrapper w-[100%] h-[300px] overflow-hidden rounded-[20px] ">
                <img
                  className="w-full"
                  src="https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/x/i/xiaomi-redmi-pad-se_1_3.png"
                  alt=""
                />
              </div>
              <div className="info ms-4">
                <h3 className="text-[18px] font-[500] text-[rgba(0,0,0,0.9)]">
                  <Link to="/" className="link transition-all ">
                    Xiaomi Redmi Pad SE Wifi 6GB 128GB
                  </Link>
                </h3>
                <h3 className="light-through text-gray-500">1M sold</h3>
                <div className="flex items-center mt-8 mb-4">
                  <h3 className=" text-primary font-[500]">210$</h3>
                  <h3 className=" line-through text-gray-500 ms-4 me-12">
                    270$
                  </h3>
                  <Rating
                    name="size-small"
                    defaultValue={4}
                    size="small"
                    readOnly
                  />
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="productItem border-2 border-[rgba(0,0,0,0.1)] rounded-[20px] bg-[#f1f1f1] shadow-lg ">
              <div className="imgWrapper imgWrapper w-[100%] h-[300px] overflow-hidden rounded-[20px] ">
                <img
                  className="w-full"
                  src="https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/d/i/dien-thoai-samsung-galaxy-s25-ultra_2__5.png"
                  alt=""
                />
              </div>
              <div className="info ms-4">
                <h3 className="text-[18px] font-[500] text-[rgba(0,0,0,0.9)]">
                  <Link to="/" className="link transition-all ">
                    Samsung Galaxy S25 Ultra 12GB 256GB
                  </Link>
                </h3>
                <h3 className="light-through text-gray-500">1M sold</h3>
                <div className="flex items-center mt-8 mb-4">
                  <h3 className=" text-primary font-[500]">1500$</h3>
                  <h3 className=" line-through text-gray-500 ms-4 me-12">
                    1700$
                  </h3>
                  <Rating
                    name="size-small"
                    defaultValue={4}
                    size="small"
                    readOnly
                  />
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="productItem border-2 border-[rgba(0,0,0,0.1)] rounded-[20px] bg-[#f1f1f1] shadow-lg ">
              <div className="imgWrapper imgWrapper w-[100%] h-[300px] overflow-hidden rounded-[20px] ">
                <img
                  className="w-full"
                  src="https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/c/a/camera-ip-wifi-imou-ipc-s2xp-6m0wed-6mp-2-ong-kinh_2_2.png"
                  alt=""
                />
              </div>
              <div className="info ms-4">
                <h3 className="text-[18px] font-[500] text-[rgba(0,0,0,0.9)]">
                  <Link to="/" className="link transition-all ">
                    Camera IP 360 IMOU IPC-A32EP
                  </Link>
                </h3>
                <h3 className="light-through text-gray-500">1M sold</h3>
                <div className="flex items-center mt-8 mb-4">
                  <h3 className=" text-primary font-[500]">50$</h3>
                  <h3 className=" line-through text-gray-500 ms-4 me-12">
                    70$
                  </h3>
                  <Rating
                    name="size-small"
                    defaultValue={4}
                    size="small"
                    readOnly
                  />
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="productItem border-2 border-[rgba(0,0,0,0.1)] rounded-[20px] bg-[#f1f1f1] shadow-lg ">
              <div className="imgWrapper imgWrapper w-[100%] h-[300px] overflow-hidden rounded-[20px] ">
                <img
                  className="w-full"
                  src="https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/t/a/tai-nghe-khong-day-soundpeats-air-4-pro_9_.png"
                  alt=""
                />
              </div>
              <div className="info ms-4">
                <h3 className="text-[18px] font-[500] text-[rgba(0,0,0,0.9)]">
                  <Link to="/" className="link transition-all ">
                    Headphone Bluetooth SoundPEATS Air4 Pro
                  </Link>
                </h3>
                <h3 className="light-through text-gray-500">1M sold</h3>
                <div className="flex items-center mt-8 mb-4">
                  <h3 className=" text-primary font-[500]">50$</h3>
                  <h3 className=" line-through text-gray-500 ms-4 me-12">
                    89$
                  </h3>
                  <Rating
                    name="size-small"
                    defaultValue={4}
                    size="small"
                    readOnly
                  />
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="productItem border-2 border-[rgba(0,0,0,0.1)] rounded-[20px] bg-[#f1f1f1] shadow-lg ">
              <div className="imgWrapper imgWrapper w-[100%] h-[300px] overflow-hidden rounded-[20px] ">
                <img
                  className="w-full"
                  src="https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/a/sac-pin-du-phong-xiaomi-30000mah-18w_3_.png"
                  alt=""
                />
              </div>
              <div className="info ms-4">
                <h3 className="text-[18px] font-[500] text-[rgba(0,0,0,0.9)]">
                  <Link to="/" className="link transition-all ">
                    Power Bank Xiaomi 30000mAh 18W
                  </Link>
                </h3>
                <h3 className="light-through text-gray-500">1M sold</h3>
                <div className="flex items-center mt-8 mb-4">
                  <h3 className=" text-primary font-[500]">49$</h3>
                  <h3 className=" line-through text-gray-500 ms-4 me-12">
                    75$
                  </h3>
                  <Rating
                    name="size-small"
                    defaultValue={4}
                    size="small"
                    readOnly
                  />
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="productItem border-2 border-[rgba(0,0,0,0.1)] rounded-[20px] bg-[#f1f1f1] shadow-lg ">
              <div className="imgWrapper imgWrapper w-[100%] h-[300px] overflow-hidden rounded-[20px] ">
                <img
                  className="w-full"
                  src="https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/1/_/1_718_21.png"
                  alt=""
                />
              </div>
              <div className="info ms-4">
                <h3 className="text-[18px] font-[500] text-[rgba(0,0,0,0.9)]">
                  <Link to="/" className="link transition-all ">
                    Headphone Bluetooth Sport Nothing Ear Open
                  </Link>
                </h3>
                <h3 className="light-through text-gray-500">1M sold</h3>
                <div className="flex items-center mt-8 mb-4">
                  <h3 className=" text-primary font-[500]">129$</h3>
                  <h3 className=" line-through text-gray-500 ms-4 me-12">
                    199$
                  </h3>
                  <Rating
                    name="size-small"
                    defaultValue={4}
                    size="small"
                    readOnly
                  />
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="productItem border-2 border-[rgba(0,0,0,0.1)] rounded-[20px] bg-[#f1f1f1] shadow-lg ">
              <div className="imgWrapper imgWrapper w-[100%] h-[300px] overflow-hidden rounded-[20px] ">
                <img
                  className="w-full"
                  src="https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/a/samsung-a16-5g_2_.png"
                  alt=""
                />
              </div>
              <div className="info ms-4">
                <h3 className="text-[18px] font-[500] text-[rgba(0,0,0,0.9)]">
                  <Link to="/" className="link transition-all ">
                    Samsung Galaxy A16 5G 8GB 128GB
                  </Link>
                </h3>
                <h3 className="light-through text-gray-500">1M sold</h3>
                <div className="flex items-center mt-8 mb-4">
                  <h3 className=" text-primary font-[500]">259$</h3>
                  <h3 className=" line-through text-gray-500 ms-4 me-12">
                    310$
                  </h3>
                  <Rating
                    name="size-small"
                    defaultValue={4}
                    size="small"
                    readOnly
                  />
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="productItem border-2 border-[rgba(0,0,0,0.1)] rounded-[20px] bg-[#f1f1f1] shadow-lg ">
              <div className="imgWrapper imgWrapper w-[100%] h-[300px] overflow-hidden rounded-[20px] ">
                <img
                  className="w-full"
                  src="https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/d/i/dien-thoai-samsung-galaxy-s25-ultra_3__3.png"
                  alt=""
                />
              </div>
              <div className="info ms-4">
                <h3 className="text-[18px] font-[500] text-[rgba(0,0,0,0.9)]">
                  <Link to="/" className="link transition-all ">
                    Samsung Galaxy S25 Ultra 12GB 256GB
                  </Link>
                </h3>
                <h3 className="light-through text-gray-500">1M sold</h3>
                <div className="flex items-center mt-8 mb-4">
                  <h3 className=" text-primary font-[500]">1099$</h3>
                  <h3 className=" line-through text-gray-500 ms-4 me-12">
                    1300$
                  </h3>
                  <Rating
                    name="size-small"
                    defaultValue={4}
                    size="small"
                    readOnly
                  />
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </>
  );
};
export default TopSelect;
