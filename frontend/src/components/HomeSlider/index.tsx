import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/modules';
const HomeSlider = () => {
  return (
    <>
      <div className="row">
        <div className="homeSlider mt-5">
          <div className="container">
            <Swiper
              spaceBetween={30}
              navigation={true}
              mousewheel={true}
              pagination={true}
              keyboard={true}
              modules={[Navigation, Pagination, Mousewheel, Keyboard]}
              className="sliderHome"
            >
              <SwiperSlide>
                <div className="item rounded-[40px] overflow-hidden">
                  <img
                    src="https://cdn2.fptshop.com.vn/unsafe/1920x0/filters:quality(100)/H1_1440x242_a5d0f2a667.png"
                    alt="Banner slide"
                    className="w-full"
                  />
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="item rounded-[40px] overflow-hidden">
                  <img
                    src="https://cdn2.fptshop.com.vn/unsafe/1920x0/filters:quality(100)/H1_1440x242_96886672aa.png"
                    alt="Banner slide"
                    className="w-full"
                  />
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="item rounded-[40px] overflow-hidden">
                  <img
                    src="https://cdn2.fptshop.com.vn/unsafe/1920x0/filters:quality(100)/H1_1440x242_c7fb1dd38a.png"
                    alt="Banner slide"
                    className="w-full"
                  />
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeSlider;
