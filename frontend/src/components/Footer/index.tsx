import React from "react";
import { FaTruckMoving } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { GiBackwardTime } from "react-icons/gi";
import { VscFeedback } from "react-icons/vsc";
import { MdPayment } from "react-icons/md";
const Footer: React.FC = () => {

    return (
        <>
            <div className="mt-12">
            <div className="container ">
                <div className="flex items-center justify-center gap-7 flex-wrap mb-12">
                    <div className="relative flex flex-col items-center justify-center p-4 border border-[rgba(0,0,0,0.1)] rounded-2xl shadow-md bg-white w-44">
                        <div className="absolute -top-6 bg-white p-2 rounded-full">
                            <FaTruckMoving className="text-orange-500 w-10 h-10" />
                        </div>
                        <div className="mt-6 text-center">
                            <p className="font-semibold text-black">Free Delivery</p>
                            <p className="text-gray-500 text-sm">from $40</p>
                        </div>
                    </div>

                    <div className="relative flex flex-col items-center justify-center p-4 border border-[rgba(0,0,0,0.1)] rounded-2xl shadow-md bg-white w-44">
                        <div className="absolute -top-6 bg-white p-2 rounded-full">
                            <FaStar className="text-orange-500 w-10 h-10" />
                        </div>
                        <div className="mt-6 text-center">
                            <p className="font-semibold text-black">Best Quality</p>
                            <p className="text-gray-500 text-sm">Brand</p>
                        </div>
                    </div>

                    <div className="relative flex flex-col items-center justify-center p-4 border border-[rgba(0,0,0,0.1)] rounded-2xl shadow-md bg-white w-44">
                        <div className="absolute -top-6 bg-white p-2 rounded-full">
                            <GiBackwardTime className="text-orange-500 w-10 h-10" />
                        </div>
                        <div className="mt-6 text-center">
                            <p className="font-semibold text-black">1 Year</p>
                            <p className="text-gray-500 text-sm">for free Return</p>
                        </div>
                    </div>

                    <div className="relative flex flex-col items-center justify-center p-4 border border-[rgba(0,0,0,0.1)] rounded-2xl shadow-md bg-white w-44">
                        <div className="absolute -top-6 bg-white p-2 rounded-full">
                            <VscFeedback className="text-orange-500 w-10 h-10" />
                        </div>
                        <div className="mt-6 text-center">
                            <p className="font-semibold text-black">Feedback</p>
                            <p className="text-gray-500 text-sm">99% Real Data</p>
                        </div>
                    </div>

                    <div className="relative flex flex-col items-center justify-center p-4 border border-[rgba(0,0,0,0.1)] rounded-2xl shadow-md bg-white w-44">
                        <div className="absolute -top-6 bg-white p-2 rounded-full">
                            <MdPayment className="text-orange-500 w-10 h-10" />
                        </div>
                        <div className="mt-6 text-center">
                            <p className="font-semibold text-black">Payment</p>
                            <p className="text-gray-500 text-sm">Secure</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-orange-500 text-white py-10 px-6 lg:px-20 flex flex-col md:flex-row items-center justify-between">
                <div className="flex flex-col md:flex-row items-center md:space-x-6">
                    <div className="flex items-center space-x-4">
                        <span className="text-4xl">📩</span>
                        <div>
                            <h2 className="text-2xl font-bold">Sign Up for Newsletter</h2>
                            <p className="text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                        </div>
                    </div>
                </div>
                <div className="relative mt-4 md:mt-0">
                    <input type="text" placeholder="Enter your email here" className="p-3 rounded-lg w-80 text-black" />
                    <button className="absolute right-0 top-0 bottom-0 px-6 bg-gray-800 text-white rounded-r-lg">SUBSCRIBE</button>
                </div>
            </div>
            <footer className="bg-gray-500 text-gray-100 py-10">
                <div className="container mx-auto px-6 lg:px-20">
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        <div>
                            <h2 className="text-2xl font-bold text-white">Elextra</h2>
                            <p className="mt-2 text-sm">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            </p>
                            <div className="flex space-x-3 mt-4">
                                <span className="p-2 bg-gray-200 rounded-full">🔗</span>
                                <span className="p-2 bg-gray-200 rounded-full">🔗</span>
                                <span className="p-2 bg-gray-200 rounded-full">🔗</span>
                                <span className="p-2 bg-gray-200 rounded-full">🔗</span>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold">Quick Links</h3>
                            <ul className="mt-2 space-y-2 text-sm">
                                <li>About us</li>
                                <li>Contact us</li>
                                <li>Products</li>
                                <li>Login</li>
                                <li>Sign Up</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold">Customer Area</h3>
                            <ul className="mt-2 space-y-2 text-sm">
                                <li>My Account</li>
                                <li>Orders</li>
                                <li>Tracking List</li>
                                <li>Terms</li>
                                <li>Privacy Policy</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold">Contact</h3>
                            <p className="mt-2 text-sm">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            </p>
                            <p className="mt-2 text-white font-semibold">+123 456 789</p>
                            <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg">Live Chat</button>
                        </div>
                    </div>
                    <div className="mt-10 flex flex-col md:flex-row items-center justify-between text-sm border-t border-gray-300 pt-4">
                        <p>ELEXTRA © 2020 All Rights Reserved</p>
                        <div className="flex space-x-4">
                            <span>VISA</span>
                            <span>MASTERCARD</span>
                            <span>PAYPAL</span>
                            <span>BITCOIN</span>
                        </div>
                    </div>
                </div>
            </footer>
            </div>
        </>
    );
};

export default Footer;
