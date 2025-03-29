import React from "react";
import { FaLaptop } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper/modules";
import { Link } from "react-router-dom";
import Rating from '@mui/material/Rating';

const Cate: React.FC = () => {
    return (
        <div className="flex min-h-screen bg-gray-100">
            <aside className="mt-6 ms-5 h-[300px] bg-white shadow p-4 overflow-y-auto rounded-[20px]">
                <h2 className="text-lg font-semibold mb-4">Show all categories</h2>
                <ul className="text-gray-700">
                    <li>
                        <p className="font-bold text-orange-500">Laptop & Computer (45)</p>
                        <ul className="ml-4 border-l-2 border-orange-400 pl-2">
                            <li className="text-sm text-gray-600">Hardware (25)</li>
                            <li className="text-sm text-gray-600">Software (30)</li>
                        </ul>
                    </li>
                </ul>
            </aside>

            <main className="flex-1 p-6  ">
                <div className="w-full h-64 bg-white shadow rounded-lg p-6 flex items-center">
                    <div>
                        <h1 className="text-3xl font-bold">Laptop & Computers Category</h1>
                        <p className="text-gray-600 mt-2">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mt-6">
                    <div className="bg-gray-200 p-6 rounded-lg flex flex-col items-center justify-center text-center">
                        <FaLaptop className="text-3xl text-gray-700 mb-2" />
                        <p className="font-semibold">Laptop</p>
                        <p className="text-sm text-gray-600">24 Products</p>
                    </div>
                    <div className="bg-gray-200 p-6 rounded-lg flex flex-col items-center justify-center text-center">
                        <FaLaptop className="text-3xl text-gray-700 mb-2" />
                        <p className="font-semibold">Ultrabookp</p>
                        <p className="text-sm text-gray-600">24 Products</p>
                    </div>
                    <div className="bg-gray-200 p-6 rounded-lg flex flex-col items-center justify-center text-center">
                        <FaLaptop className="text-3xl text-gray-700 mb-2" />
                        <p className="font-semibold">Desktop/PC</p>
                        <p className="text-sm text-gray-600">24 Products</p>
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-4 mt-6">
                    <div className="bg-gray-200 p-6 rounded-lg flex flex-col items-center justify-center text-center">
                        <FaLaptop className="text-3xl text-gray-700 mb-2" />
                        <p className="font-semibold">All in One PC</p>
                        <p className="text-sm text-gray-600">24 Products</p>
                    </div>
                    <div className="bg-gray-200 p-6 rounded-lg flex flex-col items-center justify-center text-center">
                        <FaLaptop className="text-3xl text-gray-700 mb-2" />
                        <p className="font-semibold">Routers</p>
                        <p className="text-sm text-gray-600">24 Products</p>
                    </div>
                    <div className="bg-gray-200 p-6 rounded-lg flex flex-col items-center justify-center text-center">
                        <FaLaptop className="text-3xl text-gray-700 mb-2" />
                        <p className="font-semibold">Speakers</p>
                        <p className="text-sm text-gray-600">24 Products</p>
                    </div>
                </div>
                {/* Best Offers */}
                <h2 className="text-xl font-semibold mt-8">Best Offer in Laptops</h2>
               
                <Swiper
                    slidesPerView={4}
                    spaceBetween={20}
                    pagination={{
                        clickable: true,
                    }}
                    modules={[Pagination]}
                    className="mySwiper">
                    <SwiperSlide>
                        <div className="recentlyViewed rounded-[20px] mt-5">
                            <div className="grid grid-cols-1 gap-4 ">
                                <div className="grid grid-cols-2 border-2 border-[rgba(0,0,0,0.1)] rounded-[20px] bg-[#f1f1f1] shadow-lg">
                                    <div className="imgWrapper w-[150px] h-[150px] overflow-hidden rounded-[20px]   ">
                                        <img className="w-full" src="https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/g/r/group_17333.png" alt="" />
                                    </div>
                                    <div className="info ms-6">
                                        <h3 className="text-[16px] font-[500] text-[rgba(0,0,0,0.9)]">
                                            <Link to='/' className="link transition-all ">Headphone Bluetooth Sony</Link>
                                        </h3>
                                        <h3 className="mt-12 text-primary font-[500]">$150</h3>
                                        <Rating name="size-small" defaultValue={4} size="small" readOnly />
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
                                        <img className="w-full" src="https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/1/_/1.4_5.png" alt="" />
                                    </div>
                                    <div className="info ms-6">
                                        <h3 className="text-[16px] font-[500] text-[rgba(0,0,0,0.9)]">
                                            <Link to='/' className="link transition-all ">Mouse Rapoo VT200</Link>
                                        </h3>
                                        <h3 className="mt-12 text-primary font-[500]">$150</h3>
                                        <Rating name="size-small" defaultValue={4} size="small" readOnly />
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
                                        <img className="w-full" src="https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/t/a/tai-nghe-chup-tai-alpha-works-aw-lite-600-thumb_1.png" alt="" />
                                    </div>
                                    <div className="info ms-6">
                                        <h3 className="text-[16px] font-[500] text-[rgba(0,0,0,0.9)]">
                                            <Link to='/' className="link transition-all ">Headphone Alpha Works</Link>
                                        </h3>
                                        <h3 className="mt-12 text-primary font-[500]">$150</h3>
                                        <Rating name="size-small" defaultValue={4} size="small" readOnly />
                                    </div>
                                </div>

                            </div>
                        </div>
                    </SwiperSlide>
 
                </Swiper>


            </main>
        </div>
    );
};

export default Cate;
