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
interface Review {
  id: number;
  name: string;
  avatar: string;
  email: string;
  content: string;
  rating: number;
}
const initialReviews: Review[] = [
  {
    id: 1,
    name: 'Rodriguez',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    email: 'rod@example.com',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
    rating: 4,
  },
  {
    id: 2,
    name: 'Marissa',
    avatar: 'https://randomuser.me/api/portraits/women/65.jpg',
    email: 'marissa@example.com',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
    rating: 4,
  },
  {
    id: 3,
    name: 'Julianto Mc. Daniel',
    avatar: 'https://randomuser.me/api/portraits/men/75.jpg',
    email: 'julianto@example.com',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
    rating: 3.5,
  },
];
const ProductDetail: React.FC = () => {
  const [selectedSize, setSelectedSize] = useState(product.sizes[1]);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState('Blue');
  const [selectedImage, setSelectedImage] = useState(product.colors['Blue'][0]);
  const [activeTab, setActiveTab] = useState('Description');

  const [reviews, setReviews] = useState(initialReviews);
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [content, setContent] = useState('');
  const [rating, setRating] = useState(4);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newReview: Review = {
      id: Date.now(),
      name: nickname,
      avatar: 'https://randomuser.me/api/portraits/lego/1.jpg',
      email,
      content,
      rating,
    };
    setReviews([newReview, ...reviews]);
    setNickname('');
    setEmail('');
    setContent('');
    setRating(4);
  };
  return (
    <>
      <div className="container mx-auto p-6 flex gap-10 border-1 rounded-[30px] bg-white">
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
        <div className="container flex flex-col lg:flex-row bg-white">
          <div className="bg-orange-500 text-white p-6 rounded-lg w-full h-min lg:w-1/4">
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
              {['Description', 'Reviews (223)'].map((tab) => (
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
                <div className="p-4">
                  <h2 className="text-2xl font-semibold">
                    See the best picture no matter where you sit
                  </h2>
                  <p className="text-gray-600 mt-2">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.
                  </p>

                  <div className="mt-4">
                    <img
                      src="https://via.placeholder.com/800x400"
                      alt="Product Description"
                      className="w-full rounded-lg"
                    />
                  </div>

                  <h3 className="text-xl font-semibold mt-6">
                    Powerful intelligence for perfection
                  </h3>
                  <p className="text-gray-600 mt-2">
                    Sed ut perspiciatis unde omnis iste natus error sit
                    voluptatem accusantium doloremque laudantium, totam rem
                    aperiam, eaque ipsa quae ab illo inventore veritatis et
                    quasi architecto beatae vitae dicta sunt explicabo. Nemo
                    enim ipsam voluptatem quia voluptas sit aspernatur aut odit
                    aut fugit, sed quia consequuntur magni dolores eos qui
                    ratione voluptatem sequi nesciunt.
                  </p>

                  <h3 className="text-xl font-semibold mt-6">
                    The power of less
                  </h3>
                  <p className="text-gray-600 mt-2">
                    At vero eos et accusamus et iusto odio dignissimos ducimus
                    qui blanditiis praesentium voluptatum deleniti atque
                    corrupti quos dolores et quas molestias excepturi sint
                    occaecati cupiditate non provident, similique sunt in culpa
                    qui officia deserunt mollitia animi, id est laborum et
                    dolorum fuga.
                  </p>
                </div>
              )}

              {activeTab === 'Reviews (223)' && (
                <div className="p-4">
                  <h2 className="text-xl font-semibold mb-2">
                    Submit Your Review
                  </h2>
                  <p className="text-gray-600 mb-4">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit...
                  </p>

                  <form
                    onSubmit={handleSubmit}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8"
                  >
                    <div>
                      <label className="block font-medium">Nickname</label>
                      <input
                        type="text"
                        className="w-full mt-1 border  px-4 py-2 rounded focus:outline-orange-500"
                        placeholder="Type your nickname here"
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <label className="block font-medium">Email Address</label>
                      <input
                        type="email"
                        className="w-full mt-1 border px-4 py-2 rounded focus:outline-orange-500"
                        placeholder="Type your email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <label className="block font-medium">Review</label>
                      <textarea
                        className="w-full mt-1 border px-4 py-2 rounded h-24 focus:outline-orange-500"
                        placeholder="Type your review here"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                      />
                    </div>

                    <div>
                      <label className="block font-medium">Rating</label>
                      <div className="flex mt-2 space-x-1">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <Star
                            key={i}
                            fill={i <= rating ? '#f97316' : 'none'}
                            stroke="#f97316"
                            className="w-6 h-6 cursor-pointer"
                            onClick={() => setRating(i)}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="md:col-span-2">
                      <button
                        type="submit"
                        className="bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600"
                      >
                        SUBMIT
                      </button>
                    </div>
                  </form>

                  <hr className="my-6" />

                  <div className="space-y-6">
                    {reviews.map((review) => (
                      <div key={review.id} className="flex gap-4">
                        <img
                          src={review.avatar}
                          alt={review.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex justify-between items-center">
                            <div>
                              <div className="font-semibold">{review.name}</div>
                              <div className="text-orange-500 text-sm font-medium flex items-center gap-1">
                                <span className="w-2 h-2 bg-orange-500 rounded-full" />
                                Verified Buyer
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-orange-500 font-bold text-xl">
                                {review.rating.toFixed(1)}
                              </div>
                              <div className="flex justify-end">
                                {[1, 2, 3, 4, 5].map((i) => (
                                  <Star
                                    key={i}
                                    fill={
                                      i <= Math.floor(review.rating)
                                        ? '#f97316'
                                        : i - review.rating <= 0.5
                                          ? '#f97316'
                                          : 'none'
                                    }
                                    stroke="#f97316"
                                    className="w-4 h-4"
                                  />
                                ))}
                              </div>
                            </div>
                          </div>
                          <p className="text-gray-600 text-sm mt-2">
                            {review.content}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
