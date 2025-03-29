import React from "react";
import { Link } from "react-router-dom";
import Rating from '@mui/material/Rating';
// import "../BestDeal/style.css"

const BestDeal: React.FC = () => {
    return (
        <>
            <div className="bestDeal rounded-[20px] mt-5">
                <div className="grid grid-cols-5 gap-4 ">
                    <div className="grid grid-cols-2 border-2 border-[rgba(0,0,0,0.1)] rounded-[20px] bg-[#f1f1f1] shadow-lg">
                        <div className="imgWrapper w-[150px] h-[150px] overflow-hidden rounded-[20px]   ">
                            <img className="w-full" src="https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/d/i/dien-thoai-realme-c65_3_.png" alt="" />
                        </div>
                        <div className="info w-[60%] ms-6">
                            <h3 className="text-[16px] font-[500] text-[rgba(0,0,0,0.9)]">
                                <Link to='/' className="link transition-all ">Realme C65</Link>
                            </h3>
                            <h3 className="mt-12 text-primary font-[500]">200$</h3>
                            <Rating name="size-small" defaultValue={4} size="small" readOnly />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 border-2 border-[rgba(0,0,0,0.1)] rounded-[20px] bg-[#f1f1f1] shadow-lg">
                        <div className="imgWrapper w-[150px] h-[150px] overflow-hidden rounded-[20px]   ">
                            <img className="w-full" src="https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/m/a/man-hinh-xiaomi-a27i-ela5345eu-27-inch.png" alt="" />
                        </div>
                        <div className="info w-[60%] ms-6">
                            <h3 className="text-[16px] font-[500] text-[rgba(0,0,0,0.9)]">
                                <Link to='/' className="link transition-all ">TV Xiaomi 27inch</Link>
                            </h3>
                            <h3 className="mt-12 text-primary font-[500]">150$</h3>
                            <Rating name="size-small" defaultValue={4} size="small" readOnly />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 border-2 border-[rgba(0,0,0,0.1)] rounded-[20px] bg-[#f1f1f1] shadow-lg">
                        <div className="imgWrapper w-[150px] h-[150px] overflow-hidden rounded-[20px]   ">
                            <img className="w-full" src="https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/g/r/group_167_2_5.png" alt="" />
                        </div>
                        <div className="info w-[60%] ms-6">
                            <h3 className="text-[16px] font-[500] text-[rgba(0,0,0,0.9)]">
                                <Link to='/' className="link transition-all ">PC Gaming</Link>
                            </h3>
                            <h3 className="mt-12 text-primary font-[500]">137$</h3>
                            <Rating name="size-small" defaultValue={4} size="small" readOnly />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 border-2 border-[rgba(0,0,0,0.1)] rounded-[20px] bg-[#f1f1f1] shadow-lg">
                        <div className="imgWrapper w-[150px] h-[150px] overflow-hidden rounded-[20px]   ">
                            <img className="w-full" src="https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/ipad-air-11-wifi-1.jpg" alt="" />
                        </div>
                        <div className="info w-[60%] ms-6">
                            <h3 className="text-[16px] font-[500] text-[rgba(0,0,0,0.9)]">
                                <Link to='/' className="link transition-all ">Apple Air 11 M3</Link>
                            </h3>
                            <h3 className="mt-12 text-primary font-[500]">210$</h3>
                            <Rating name="size-small" defaultValue={4} size="small" readOnly />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 border-2 border-[rgba(0,0,0,0.1)] rounded-[20px] bg-[#f1f1f1] shadow-lg">
                        <div className="imgWrapper w-[150px] h-[150px] overflow-hidden rounded-[20px]   ">
                            <img className="w-full" src="https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/a/p/apple-airpods-4-thumb.png" alt="" />
                        </div>
                        <div className="info w-[60%] ms-6">
                            <h3 className="text-[16px] font-[500] text-[rgba(0,0,0,0.9)]">
                                <Link to='/' className="link transition-all ">Apple AirPods 4</Link>
                            </h3>
                            <h3 className="mt-12 text-primary font-[500]">300$</h3>
                            <Rating name="size-small" defaultValue={4} size="small" readOnly />
                        </div>
                    </div>
                </div>
            </div>
            <div className="bestDeal rounded-[20px] mt-5">
                <div className="grid grid-cols-5 gap-4 ">
                    <div className="grid grid-cols-2 border-2 border-[rgba(0,0,0,0.1)] rounded-[20px] bg-[#f1f1f1] shadow-lg">
                        <div className="imgWrapper w-[150px] h-[150px] overflow-hidden rounded-[20px]   ">
                            <img className="w-full" src="https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/t/a/tai-nghe-chup-tai-marshall-monitor-iii-anc-thumb_1.png" alt="" />
                        </div>
                        <div className="info w-[60%] ms-6">
                            <h3 className="text-[16px] font-[500] text-[rgba(0,0,0,0.9)]">
                                <Link to='/' className="link transition-all ">Headphone Marshall</Link>
                            </h3>
                            <h3 className="mt-12 text-primary font-[500]">290$</h3>
                            <Rating name="size-small" defaultValue={4} size="small" readOnly />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 border-2 border-[rgba(0,0,0,0.1)] rounded-[20px] bg-[#f1f1f1] shadow-lg">
                        <div className="imgWrapper w-[150px] h-[150px] overflow-hidden rounded-[20px]   ">
                            <img className="w-full" src="https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/h/u/huawei_1__1_2.png" alt="" />
                        </div>
                        <div className="info w-[60%] ms-6">
                            <h3 className="text-[16px] font-[500] text-[rgba(0,0,0,0.9)]">
                                <Link to='/' className="link transition-all "> Huawei Fit3</Link>
                            </h3>
                            <h3 className="mt-12 text-primary font-[500]">220$</h3>
                            <Rating name="size-small" defaultValue={4} size="small" readOnly />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 border-2 border-[rgba(0,0,0,0.1)] rounded-[20px] bg-[#f1f1f1] shadow-lg">
                        <div className="imgWrapper w-[150px] h-[150px] overflow-hidden rounded-[20px]   ">
                            <img className="w-full" src="https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/m/a/macbook_11_1.png" alt="" />
                        </div>
                        <div className="info w-[60%] ms-6">
                            <h3 className="text-[16px] font-[500] text-[rgba(0,0,0,0.9)]">
                                <Link to='/' className="link transition-all ">MacBook Air M4 </Link>
                            </h3>
                            <h3 className="mt-12 text-primary font-[500]">400$</h3>
                            <Rating name="size-small" defaultValue={4} size="small" readOnly />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 border-2 border-[rgba(0,0,0,0.1)] rounded-[20px] bg-[#f1f1f1] shadow-lg">
                        <div className="imgWrapper w-[150px] h-[150px] overflow-hidden rounded-[20px]   ">
                            <img className="w-full" src="https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/ipad-air-11-wifi-1.jpg" alt="" />
                        </div>
                        <div className="info w-[60%] ms-6">
                            <h3 className="text-[16px] font-[500] text-[rgba(0,0,0,0.9)]">
                                <Link to='/' className="link transition-all ">Apple Air 11 M3</Link>
                            </h3>
                            <h3 className="mt-12 text-primary font-[500]">340$</h3>
                            <Rating name="size-small" defaultValue={4} size="small" readOnly />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 border-2 border-[rgba(0,0,0,0.1)] rounded-[20px] bg-[#f1f1f1] shadow-lg">
                        <div className="imgWrapper w-[150px] h-[150px] overflow-hidden rounded-[20px]   ">
                            <img className="w-full" src="https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-16-pro_1.png" alt="" />
                        </div>
                        <div className="info w-[60%] ms-6">
                            <h3 className="text-[16px] font-[500] text-[rgba(0,0,0,0.9)]">
                                <Link to='/' className="link transition-all ">iPhone 16 Pro Max</Link>
                            </h3>
                            <h3 className="mt-12 text-primary font-[500]">320$</h3>
                            <Rating name="size-small" defaultValue={4} size="small" readOnly />
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
export default BestDeal;