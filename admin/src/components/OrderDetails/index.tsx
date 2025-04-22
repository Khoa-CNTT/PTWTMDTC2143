import React from 'react';

import { Card, CardContent, Button } from '@mui/material';
import { CheckCircle, Truck, CreditCard, Trash2, Edit } from 'lucide-react';
import clsx from 'clsx';
import { FaTruckMoving } from 'react-icons/fa';
import { MdOutlineShoppingCart } from 'react-icons/md';
const OrderDetails = () => {
  return (
    <>
      <div className="pt-6 ps-6 pe-6">
        <div className="flex items-center justify-between p-6 bg-white shadow-sm rounded-lg">
          <div>
            <h2 className="text-xl font-semibold">Order #32543</h2>
            <div className="text-sm text-gray-500">Aug 17, 2025, 5:48 (ET)</div>
            <div className="mt-2 flex gap-2">
              <span className="bg-green-100 text-green-600 text-xs font-medium px-2 py-1 rounded">
                Paid
              </span>
              <span className="bg-blue-100 text-blue-600 text-xs font-medium px-2 py-1 rounded">
                Ready to Pickup
              </span>
            </div>
          </div>
          <button className="bg-red-100 text-red-500 hover:bg-red-200 font-medium px-3 py-2 rounded flex items-center gap-1 justify-center">
            <Trash2 className="" /> Delete Order
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardContent className="p-6">
              <div className="">
                <h3 className="text-lg font-semibold">Order details</h3>
                <table className="w-full text-left text-sm relative">
                  <thead>
                    <tr className="text-gray-500 border-b">
                      <th className="py-2 px-2">PRODUCT</th>
                      <th className="py-2 px-2">PRICE</th>
                      <th className="py-2 px-2">QTY</th>
                      <th className="py-2 px-2 text-end">TOTAL</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-2 px-2">iPhone 20</td>
                      <td className="py-2 px-2">$1046.5</td>
                      <td className="py-2 px-2">2</td>
                      <td className="py-2 px-2 text-end">$2093</td>
                    </tr>
                  </tbody>
                </table>
                <div className="flex justify-end pt-4 text-sm text-gray-600 pe-2">
                  <div className="w-1/4 space-y-1 ">
                    <div className="flex justify-between">
                      <span>Subtotal:</span>
                      <span>$2093</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Discount:</span>
                      <span>-$2</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tax:</span>
                      <span>$28</span>
                    </div>
                    <div className="flex justify-between font-semibold text-black">
                      <span>Total:</span>
                      <span>$2113</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Shipping activity</h3>
              <ul className="space-y-4 text-sm">
                {[
                  'Order was placed',
                  'Pick-up',
                  'Dispatched',
                  'Package arrived',
                  'Dispatched for delivery',
                  'Delivery',
                ].map((step, index) => (
                  <li key={index} className="flex items-start gap-4">
                    <div
                      className={clsx(
                        'w-3 h-3 mt-1 rounded-full',
                        index === 5 ? 'bg-gray-400' : 'bg-blue-500'
                      )}
                    ></div>
                    <div>
                      <div className="font-medium">{step}</div>
                      <div className="text-gray-500 text-xs">
                        {new Date().toLocaleString()}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-2">Customer details</h3>
              <div className="text-sm">
                <div className="flex gap-2">
                  <img
                    src="https://i.pravatar.cc/40?img=2"
                    alt="Customer Avatar"
                    className="w-12 h-12 rounded-full border border-gray-300"
                  />
                  <div>
                    <div className="font-medium">Shamus Tuttle</div>
                    <div className="text-gray-500">Customer ID: #58909</div>
                  </div>
                </div>
                <div className="flex gap-2 mt-3 ">
                  <div className="w-12 h-12 rounded-full border border-gray-300 bg-green-100 flex items-center justify-center">
                    <MdOutlineShoppingCart className="w-7 h-7 text-green-400" />
                  </div>
                  <div className="mt-2">12 Orders</div>
                </div>
                <div className="mt-4">
                  <h3 className="text-l font-semibold mb-2">Contact info</h3>
                  <div className="text-sm text-gray-500">
                    <div>Email: Shamus889@yahoo.com</div>
                    <div>Mobile: +1 (609) 972-22-22</div>
                  </div>
                </div>
                <div className="mt-4">
                  <h3 className="text-l font-semibold mb-2">
                    Shipping address
                  </h3>
                  <p className="text-sm text-gray-500">
                    45 Roker Terrace, Latheronwheel, KW5 8NW, London, UK
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default OrderDetails;
