import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { Button, Rating, IconButton } from '@mui/material';
import { AiOutlineHeart } from 'react-icons/ai';
import { FaMinus, FaPlus } from 'react-icons/fa';
import {
  BsLinkedin,
  BsTwitter,
  BsFacebook,
  BsWhatsapp,
  BsLink,
} from 'react-icons/bs';

interface Product {
  id: number;
  name: string;
  description: string;
  features: string[];
  price: number;
  oldPrice: number;
  discount: number;
  rating: number;
  reviews: number;
  sold: number;
  viewed: string;
  store: string;
  colors: {
    [key: string]: string[];
  };
  sizes: string[];
}

const product: Product = {
  id: 1,
  name: 'LED Monitor With High Quality In The World',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam',
  features: [
    'Direct Full Array',
    'Quantum Dot Technology',
    'Ambient Mode',
    'One Remote Control',
  ],
  price: 976.33,
  oldPrice: 1020.99,
  discount: 20,
  rating: 4.0,
  reviews: 223,
  sold: 4320,
  viewed: '1.4k',
  store: 'manthul Official Store',
  colors: {
    Blue: [
      'https://m.media-amazon.com/images/I/71eYPFqm9ZL._AC_SX466_.jpg',
      'https://m.media-amazon.com/images/I/71KH4jIuyCL._AC_SX466_.jpg',
      'https://m.media-amazon.com/images/I/818QLOWC7IL._AC_SX466_.jpg',
    ],
    Red: [
      'https://m.media-amazon.com/images/I/818QLOWC7IL._AC_SX466_.jpg',
      'https://m.media-amazon.com/images/I/71eYPFqm9ZL._AC_SX466_.jpg',
      'https://m.media-amazon.com/images/I/712mhY6t5zL._AC_SL1500_.jpg',
    ],
  },
  sizes: ['14-Inch', '24-Inch', '32-Inch', '60-Inch'],
};

const ProductDetail: React.FC = () => {
  const [selectedSize, setSelectedSize] = useState(product.sizes[1]);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState('Blue');
  const [selectedImage, setSelectedImage] = useState(product.colors['Blue'][0]);
  const [activeTab, setActiveTab] = useState('Description');

  return (
    <>
      <div className="container mx-auto p-6 flex gap-10 border-1 rounded-[30px] bg-gray-200">
        <div className="flex flex-col">
          <img
            src={selectedImage}
            alt="Product Thumbnail"
            className="w-[400px] h-[300px] object-cover rounded-lg"
          />

          <div className="flex mt-3 space-x-2">
            {product.colors[selectedColor].map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Thumbnail ${index}`}
                className={`w-16 h-16 object-cover rounded-lg cursor-pointer border-2 ${
                  selectedImage === img
                    ? 'border-orange-500'
                    : 'border-transparent'
                }`}
                onClick={() => setSelectedImage(img)}
              />
            ))}
          </div>
        </div>
        <div className="flex-1">
          <span className="text-gray-500 text-sm">SKU 12314124124</span>
          <h2 className="text-2xl font-bold mt-2">{product.name}</h2>

          <div className="flex items-center gap-2 mt-2">
            <Rating value={product.rating} readOnly size="small" />
            <span className="text-sm text-gray-600">({product.reviews})</span>
            <span className="text-sm text-gray-400">
              ✔ {product.sold} Sold
            </span>
            <span className="text-sm text-gray-400">
              👁 {product.viewed} Viewed
            </span>
            <IconButton>
              <AiOutlineHeart className="text-gray-500" size={20} />
            </IconButton>
            <span className="text-orange-500 cursor-pointer">
              Add to wishlist
            </span>
          </div>

          <div className="flex items-center mt-3">
            <span className="text-orange-500 text-3xl font-bold">
              ${product.price.toFixed(2)}
            </span>
            <span className="text-gray-400 line-through text-xl ml-3">
              ${product.oldPrice.toFixed(2)}
            </span>
            <span className="bg-green-200 text-green-800 text-sm font-semibold px-2 py-1 rounded ml-3">
              {product.discount}% OFF
            </span>
          </div>

          <p className="text-gray-600 text-sm mt-3">{product.description}</p>

          <ul className="mt-3 text-sm text-gray-700 list-disc list-inside">
            {product.features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>

          <div className="mt-4">
            <span className="text-lg font-semibold">Screen Size</span>
            <div className="flex gap-3 mt-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 border rounded-lg transition-all ${
                    selectedSize === size
                      ? 'bg-orange-200 text-orange-700 border-orange-400'
                      : 'bg-white text-gray-800 border-gray-300 hover:bg-gray-100'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-4">
            <span className="text-lg font-semibold">Color</span>
            <div className="flex gap-3 mt-2">
              {Object.keys(product.colors).map((color) => (
                <button
                  key={color}
                  onClick={() => {
                    setSelectedColor(color);
                    setSelectedImage(product.colors[color][0]);
                  }}
                  className={`px-4 py-2 border rounded-lg transition-all ${
                    selectedColor === color
                      ? 'bg-orange-200 text-orange-700 border-orange-400'
                      : 'bg-white text-gray-800 border-gray-300 hover:bg-gray-100'
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-4 flex items-center">
            <Button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="border border-gray-300 px-2 py-1 rounded-lg"
            >
              <FaMinus />
            </Button>
            <span className="mx-4 text-lg">{quantity}</span>
            <Button
              onClick={() => setQuantity(quantity + 1)}
              className="border border-gray-300 px-2 py-1 rounded-lg"
            >
              <FaPlus />
            </Button>
          </div>

          <div className="mt-4 flex gap-3 ">
            <button className="border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white py-2 px-4 rounded">
              BUY
            </button>

            <button className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded">
              ADD TO CART
            </button>
          </div>

          <div className="mt-6 flex items-center gap-3">
            <span className="text-gray-600">Share</span>
            <IconButton className="text-blue-600">
              <BsLinkedin />
            </IconButton>
            <IconButton className="text-blue-400">
              <BsTwitter />
            </IconButton>
            <IconButton className="text-blue-700">
              <BsFacebook />
            </IconButton>
            <IconButton className="text-green-500">
              <BsWhatsapp />
            </IconButton>
            <IconButton className="text-orange-500">
              <BsLink />
            </IconButton>
          </div>
        </div>
      </div>
      <div className="mt-10">
        <div className="container flex flex-col lg:flex-row ">
          <div className="bg-orange-500 text-white p-6 rounded-lg w-full lg:w-1/4">
            <h1 className="text-5xl font-bold">
              4.0 <span className="text-xl">/5</span>
            </h1>
            <div className="flex items-center my-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="text-yellow-400" fill="yellow" />
              ))}
            </div>
            <p className="text-lg">223 Reviews</p>
            <div className="mt-4 space-y-2">
              {[186, 18, 12, 5, 2].map((count, index) => (
                <div key={index} className="flex items-center">
                  <span className="mr-2">{5 - index} ★</span>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 bg-white rounded-full w-[${count}%]`}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex-1 p-6">
            <div className="flex border-b">
              {[
                'Description',
                'Specification',
                'Discussion',
                'Reviews (223)',
              ].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 text-lg font-medium ${activeTab === tab ? 'text-orange-500 border-b-2 border-orange-500' : 'text-gray-600'}`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="mt-4">
              {activeTab === 'Description' && (
                <>
                  <h2 className="text-2xl font-semibold">
                    See the best picture no matter where you sit
                  </h2>
                  <p className="text-gray-600 mt-2">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit...
                  </p>
                </>
              )}
              {activeTab === 'Specification' && (
                <p>Specification details here...</p>
              )}
              {activeTab === 'Discussion' && <p>Discussion forum here...</p>}
              {activeTab === 'Reviews (223)' && (
                <p>All customer reviews here...</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
