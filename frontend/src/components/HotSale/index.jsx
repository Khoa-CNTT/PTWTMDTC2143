import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper/modules";
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';

const HotSale = () => {
    return (
        <>
            <Swiper
                slidesPerView={5}
                spaceBetween={20}
                pagination={{
                    clickable: true,
                }}
                modules={[Pagination]}
                className="mySwiper">
                <SwiperSlide>
                    <div className="productItem border-2 border-[rgba(0,0,0,0.1)] rounded-[20px] bg-[#f1f1f1] shadow-lg flex flex-col items-center mb-9">
                        <div className="imgWrapper w-full h-[270px] overflow-hidden rounded-[20px] flex items-center justify-center">
                            <img className="w-full h-full object-cover" src="https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/d/i/dien-thoai-xiaomi-15_11_.png" alt="" />
                        </div>
                        <div className="info flex flex-col items-center justify-center text-center gap-1 mt-4">
                            <h3 className="font-[700] text-lg text-orange-500">$200</h3>
                            <h3 className="line-through text-gray-500 text-sm">$250</h3>

                            <h3 className="text-[16px] font-[1000] text-[rgba(0,0,0,0.9)] mb-8 mt-5">
                                <Link to='/' className="link transition-all">Xiaomi 15G</Link>
                            </h3>
                            <div className="mb-6">
                                <Button variant="outlined" sx={{
                                    borderColor: "orange", color: "orange", width: "100%", minWidth: "200px", padding: "4px 0", fontSize: "16px", "&:hover": {
                                        borderColor: "darkorange",
                                        backgroundColor: "rgba(255,165,0,0.1)"
                                    }
                                }}>
                                    Add to cart
                                </Button>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="productItem border-2 border-[rgba(0,0,0,0.1)] rounded-[20px] bg-[#f1f1f1] shadow-lg flex flex-col items-center">
                        <div className="imgWrapper w-full h-[270px] overflow-hidden rounded-[20px] flex items-center justify-center">
                            <img className="w-full h-full object-cover" src="https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/o/p/oppo-reno10-pro-plus-tim.png" alt="" />
                        </div>
                        <div className="info flex flex-col items-center justify-center text-center gap-1 mt-4">
                            <h3 className="font-[700] text-lg text-orange-500">$100</h3>
                            <h3 className="line-through text-gray-500 text-sm">$129</h3>

                            <h3 className="text-[16px] font-[1000] text-[rgba(0,0,0,0.9)] mb-8 mt-5">
                                <Link to='/' className="link transition-all">OPPO Reno10 Pro+ 5G</Link>
                            </h3>
                            <div className="mb-6">
                                <Button variant="outlined" sx={{
                                    borderColor: "orange", color: "orange", width: "100%", minWidth: "200px", padding: "4px 0", fontSize: "16px", "&:hover": {
                                        borderColor: "darkorange",
                                        backgroundColor: "rgba(255,165,0,0.1)"
                                    }
                                }}>
                                    Add to cart
                                </Button>
                            </div>
                        </div>
                        
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="productItem border-2 border-[rgba(0,0,0,0.1)] rounded-[20px] bg-[#f1f1f1] shadow-lg flex flex-col items-center">
                        <div className="imgWrapper w-full h-[270px] overflow-hidden rounded-[20px] flex items-center justify-center">
                            <img className="w-full h-full object-cover" src="https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-15-plus_1__1.png" alt="" />
                        </div>
                        <div className="info flex flex-col items-center justify-center text-center gap-1 mt-4">
                            <h3 className="font-[700] text-lg text-orange-500">$329</h3>
                            <h3 className="line-through text-gray-500 text-sm">$400</h3>

                            <h3 className="text-[16px] font-[1000] text-[rgba(0,0,0,0.9)] mb-8 mt-5">
                                <Link to='/' className="link transition-all">iPhone 15 128GB</Link>
                            </h3>
                            <div className="mb-6">
                                <Button variant="outlined" sx={{
                                    borderColor: "orange", color: "orange", width: "100%", minWidth: "200px", padding: "4px 0", fontSize: "16px", "&:hover": {
                                        borderColor: "darkorange",
                                        backgroundColor: "rgba(255,165,0,0.1)"
                                    }
                                }}>
                                    Add to cart
                                </Button>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="productItem border-2 border-[rgba(0,0,0,0.1)] rounded-[20px] bg-[#f1f1f1] shadow-lg flex flex-col items-center">
                        <div className="imgWrapper w-full h-[270px] overflow-hidden rounded-[20px] flex items-center justify-center">
                            <img className="w-full h-full object-cover" src="https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/f/r/frame_166_3.png" alt="" />
                        </div>
                        <div className="info flex flex-col items-center justify-center text-center gap-1 mt-4">
                            <h3 className="font-[700] text-lg text-orange-500">$313</h3>
                            <h3 className="line-through text-gray-500 text-sm">$410</h3>

                            <h3 className="text-[16px] font-[1000] text-[rgba(0,0,0,0.9)] mb-8 mt-5">
                                <Link to='/' className="link transition-all">Samsung Galaxy Z Flip6</Link>
                            </h3>
                            <div className="mb-6">
                                <Button variant="outlined" sx={{
                                    borderColor: "orange", color: "orange", width: "100%", minWidth: "200px", padding: "4px 0", fontSize: "16px", "&:hover": {
                                        borderColor: "darkorange",
                                        backgroundColor: "rgba(255,165,0,0.1)"
                                    }
                                }}>
                                    Add to cart
                                </Button>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="productItem border-2 border-[rgba(0,0,0,0.1)] rounded-[20px] bg-[#f1f1f1] shadow-lg flex flex-col items-center">
                        <div className="imgWrapper w-full h-[270px] overflow-hidden rounded-[20px] flex items-center justify-center">
                            <img className="w-full h-full object-cover" src="https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/d/i/dien-thoai-samsung-galaxy-s25_1__2.png" alt="" />
                        </div>
                        <div className="info flex flex-col items-center justify-center text-center gap-1 mt-4">
                            <h3 className="font-[700] text-lg text-orange-500">$299</h3>
                            <h3 className="line-through text-gray-500 text-sm">$350</h3>

                            <h3 className="text-[16px] font-[1000] text-[rgba(0,0,0,0.9)] mb-8 mt-5">
                                <Link to='/' className="link transition-all">Samsung Galaxy S25</Link>
                            </h3>
                            <div className="mb-6">
                                <Button variant="outlined" sx={{
                                    borderColor: "orange", color: "orange", width: "100%", minWidth: "200px", padding: "4px 0", fontSize: "16px", "&:hover": {
                                        borderColor: "darkorange",
                                        backgroundColor: "rgba(255,165,0,0.1)"
                                    }
                                }}>
                                    Add to cart
                                </Button>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="productItem border-2 border-[rgba(0,0,0,0.1)] rounded-[20px] bg-[#f1f1f1] shadow-lg flex flex-col items-center">
                        <div className="imgWrapper w-full h-[270px] overflow-hidden rounded-[20px] flex items-center justify-center">
                            <img className="w-full h-full object-cover" src="https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/g/a/galaxy-a15-xanh-01.png" alt="" />
                        </div>
                        <div className="info flex flex-col items-center justify-center text-center gap-1 mt-4">
                            <h3 className="font-[700] text-lg text-orange-500">$270</h3>
                            <h3 className="line-through text-gray-500 text-sm">$320</h3>

                            <h3 className="text-[16px] font-[1000] text-[rgba(0,0,0,0.9)] mb-8 mt-5">
                                <Link to='/' className="link transition-all">Samsung Galaxy A15 LTE</Link>
                            </h3>
                            <div className="mb-6">
                                <Button variant="outlined" sx={{
                                    borderColor: "orange", color: "orange", width: "100%", minWidth: "200px", padding: "4px 0", fontSize: "16px", "&:hover": {
                                        borderColor: "darkorange",
                                        backgroundColor: "rgba(255,165,0,0.1)"
                                    }
                                }}>
                                    Add to cart
                                </Button>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="productItem border-2 border-[rgba(0,0,0,0.1)] rounded-[20px] bg-[#f1f1f1] shadow-lg flex flex-col items-center">
                        <div className="imgWrapper w-full h-[270px] overflow-hidden rounded-[20px] flex items-center justify-center">
                            <img className="w-full h-full object-cover" src="https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/1/_/1.4_5.png" alt="" />
                        </div>
                        <div className="info flex flex-col items-center justify-center text-center gap-1 mt-4">
                            <h3 className="font-[700] text-lg text-orange-500">$15</h3>
                            <h3 className="line-through text-gray-500 text-sm">$22</h3>

                            <h3 className="text-[16px] font-[1000] text-[rgba(0,0,0,0.9)] mb-8 mt-5">
                                <Link to='/' className="link transition-all">Mouse Rapoo VT200</Link>
                            </h3>
                            <div className="mb-6">
                                <Button variant="outlined" sx={{
                                    borderColor: "orange", color: "orange", width: "100%", minWidth: "200px", padding: "4px 0", fontSize: "16px", "&:hover": {
                                        borderColor: "darkorange",
                                        backgroundColor: "rgba(255,165,0,0.1)"
                                    }
                                }}>
                                    Add to cart
                                </Button>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="productItem border-2 border-[rgba(0,0,0,0.1)] rounded-[20px] bg-[#f1f1f1] shadow-lg flex flex-col items-center">
                        <div className="imgWrapper w-full h-[270px] overflow-hidden rounded-[20px] flex items-center justify-center">
                            <img className="w-full h-full object-cover" src="https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/g/r/group_17333.png" alt="" />
                        </div>
                        <div className="info flex flex-col items-center justify-center text-center gap-1 mt-4">
                            <h3 className="font-[700] text-lg text-orange-500">$199</h3>
                            <h3 className="line-through text-gray-500 text-sm">$250</h3>

                            <h3 className="text-[16px] font-[1000] text-[rgba(0,0,0,0.9)] mb-8 mt-5">
                                <Link to='/' className="link transition-all">Headphone Sony WH-1000XM4</Link>
                            </h3>
                            <div className="mb-6">
                                <Button variant="outlined" sx={{
                                    borderColor: "orange", color: "orange", width: "100%", minWidth: "200px", padding: "4px 0", fontSize: "16px", "&:hover": {
                                        borderColor: "darkorange",
                                        backgroundColor: "rgba(255,165,0,0.1)"
                                    }
                                }}>
                                    Add to cart
                                </Button>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>

            </Swiper>
        </>
    )
}
export default HotSale;
