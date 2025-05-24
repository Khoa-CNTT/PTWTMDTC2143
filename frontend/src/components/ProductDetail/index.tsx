import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  getProductById,
  Products as APIProduct,
} from '../../services/productsService';
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
import { Variant } from '../../services/productsService';

interface OptionValue {
  id: number | string;
  value: string;
}

interface Option {
  id: number | string;
  name: string;
  values: OptionValue[];
}

interface Product {
  id: number | string;
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
  options?: Option[];
}

interface Review {
  id: number;
  name: string;
  avatar: string;
  email: string;
  content: string;
  rating: number;
  replies?: Reply[];
  images?: string[];
  createdAt: Date;
}

interface Reply {
  id: number;
  name: string;
  content: string;
  avatar: string;
  createdAt: Date;
}

const initialReviews: Review[] = [
  {
    id: 1,
    name: 'Rodriguez',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    email: 'rod@example.com',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
    rating: 4,
    replies: [],
    createdAt: new Date('2024-05-01T10:30:00'),
  },
  {
    id: 2,
    name: 'Marissa',
    avatar: 'https://randomuser.me/api/portraits/women/65.jpg',
    email: 'marissa@example.com',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
    rating: 4,
    createdAt: new Date('2024-05-05T14:45:00'),
  },
  {
    id: 3,
    name: 'Julianto Mc. Daniel',
    avatar: 'https://randomuser.me/api/portraits/men/75.jpg',
    email: 'julianto@example.com',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
    rating: 3.5,
    createdAt: new Date('2024-05-10T08:15:00'),
  },
];

const fallbackProduct: Product = {
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
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product>(fallbackProduct);
  const [variants, setVariants] = useState<Variant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedOptionValues, setSelectedOptionValues] = useState<{
    [optionIndex: number]: string;
  }>({});
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(
    fallbackProduct.colors['Blue'][0]
  );
  const [activeTab, setActiveTab] = useState('Description');
  const [replyingToId, setReplyingToId] = useState<number | null>(null);
  const [replyContent, setReplyContent] = useState('');
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [content, setContent] = useState('');
  const [rating, setRating] = useState(4);
  const [reviewImages, setReviewImages] = useState<File[]>([]);
  const [viewingImage, setViewingImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        const apiProduct: APIProduct = await getProductById(productId!);
        let price = fallbackProduct.price;
        let oldPrice = fallbackProduct.oldPrice;
        let discount = fallbackProduct.discount;
        if (apiProduct.variants && apiProduct.variants.length > 0) {
          price = apiProduct.variants[0].price || price;
          oldPrice = apiProduct.variants[0].compareAtPrice || oldPrice;
          if (oldPrice > price) {
            discount = Math.round((100 * (oldPrice - price)) / oldPrice);
          } else {
            discount = 0;
          }
        }
        let colors = fallbackProduct.colors;
        let defaultImage = fallbackProduct.colors['Blue'][0];
        if (apiProduct.images && apiProduct.images.length > 0) {
          const urls = apiProduct.images.map((img) => img.imageUrl);
          colors = { Default: urls };
          defaultImage = urls[0];
        }
        setVariants(apiProduct.variants || []);
        const mapped: Product = {
          id: apiProduct.id || fallbackProduct.id,
          name: apiProduct.title || fallbackProduct.name,
          description: apiProduct.description || fallbackProduct.description,
          features: fallbackProduct.features,
          price,
          oldPrice,
          discount,
          rating: apiProduct.rating || fallbackProduct.rating,
          reviews: fallbackProduct.reviews,
          sold: fallbackProduct.sold,
          viewed: fallbackProduct.viewed,
          store: fallbackProduct.store,
          colors,
          sizes: fallbackProduct.sizes,
          options: apiProduct.options || [],
        };
        setProduct(mapped);
        setSelectedImage(defaultImage);
        if (apiProduct.options && apiProduct.options.length > 0) {
          const initial: { [optionIndex: number]: string } = {};
          apiProduct.options.forEach((opt: Option, idx: number) => {
            if (opt.values && opt.values.length > 0) {
              initial[idx] = String(opt.values[0].id);
            }
          });
          setSelectedOptionValues(initial);
        }
      } catch (err) {
        setError('Failed to fetch product details');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
    // eslint-disable-next-line
  }, [productId]);

  useEffect(() => {
    if (
      !product.options ||
      product.options.length === 0 ||
      variants.length === 0
    )
      return;
    const selectedIds = Object.values(selectedOptionValues);
    const found = variants.find((variant) => {
      if (!variant.optionValues) return false;
      const variantValueIds = variant.optionValues.map(
        (ov) => ov.optionValueId || ov.optionValue?.id
      );
      return selectedIds.every((id) => variantValueIds.includes(id));
    });
    setSelectedVariant(found || null);
    if (found && found.images && found.images.length > 0) {
      setSelectedImage(found.images[0].imageUrl);
    } else if (product.images && product.images.length > 0) {
      setSelectedImage(product.images[0].imageUrl);
    } else if (
      product.colors &&
      product.colors[Object.keys(product.colors)[0]]
    ) {
      setSelectedImage(product.colors[Object.keys(product.colors)[0]][0]);
    }
  }, [selectedOptionValues, product.options, variants, product.images]);

  const displayPrice =
    selectedVariant && selectedVariant.price
      ? selectedVariant.price
      : product.price;
  const displayOldPrice =
    selectedVariant && selectedVariant.compareAtPrice
      ? selectedVariant.compareAtPrice
      : product.oldPrice;
  const displayDiscount =
    displayOldPrice > displayPrice
      ? Math.round((100 * (displayOldPrice - displayPrice)) / displayOldPrice)
      : 0;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setReviewImages((prev) => [...prev, ...newFiles]);
    }
  };

  const handleReplyClick = (id: number) => {
    if (replyingToId === id) {
      setReplyingToId(null);
    } else {
      setReplyingToId(id);
      setReplyContent('');
    }
  };

  const handleReplySubmit = (reviewId: number) => {
    if (!replyContent.trim()) return;
    setReviews((prev) =>
      prev.map((review) =>
        review.id === reviewId
          ? {
              ...review,
              replies: [
                ...(review.replies || []),
                {
                  id: Date.now(),
                  name: 'Admin',
                  content: replyContent.trim(),
                  avatar: 'https://randomuser.me/api/portraits/lego/2.jpg',
                  createdAt: new Date(),
                },
              ],
            }
          : review
      )
    );
    setReplyingToId(null);
    setReplyContent('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newReview: Review = {
      id: Date.now(),
      name: nickname,
      avatar: 'https://randomuser.me/api/portraits/lego/1.jpg',
      email,
      content,
      rating,
      replies: [],
      images: reviewImages.map((file) => URL.createObjectURL(file)),
      createdAt: new Date(),
    };
    setReviews([newReview, ...reviews]);
    setNickname('');
    setEmail('');
    setContent('');
    setRating(4);
    setReviewImages([]);
  };

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-center">Loading product details...</div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-center text-red-500">
          {error || 'Product not found'}
        </div>
      </div>
    );
  }

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
            {product.colors[Object.keys(product.colors)[0]].map(
              (img, index) => (
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
              )
            )}
          </div>
        </div>
        <div className="flex-1">
          <span className="text-gray-500 text-sm">SKU {product.id}</span>
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
          <div className="flex items-center mt-3 gap-3">
            <div>
              <span className="block text-xs text-gray-400">
                Giá khuyến mãi
              </span>
              <span className="text-orange-500 text-3xl font-bold">
                ${displayPrice.toFixed(2)}
              </span>
            </div>
            <div>
              <span className="block text-xs text-gray-400">Giá gốc</span>
              <span className="text-gray-400 line-through text-xl ml-1">
                ${displayOldPrice.toFixed(2)}
              </span>
            </div>
            {displayDiscount > 0 && (
              <span className="bg-green-200 text-green-800 text-sm font-semibold px-2 py-1 rounded ml-3">
                Tiết kiệm {displayDiscount}%
              </span>
            )}
          </div>
          <p className="text-gray-600 text-sm mt-3">{product.description}</p>
          <ul className="mt-3 text-sm text-gray-700 list-disc list-inside">
            {product.features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
          {product.options && product.options.length > 0 && (
            <>
              {product.options[0] && (
                <div className="mt-4">
                  <span className="text-lg font-semibold">
                    {product.options[0].name}
                  </span>
                  <div className="flex gap-3 mt-2">
                    {product.options[0].values.map((value) => (
                      <button
                        key={value.id}
                        onClick={() =>
                          setSelectedOptionValues((prev) => ({
                            ...prev,
                            0: String(value.id),
                          }))
                        }
                        className={`px-4 py-2 border rounded-lg transition-all ${selectedOptionValues[0] === String(value.id) ? 'bg-orange-200 text-orange-700 border-orange-400' : 'bg-white text-gray-800 border-gray-300 hover:bg-gray-100'}`}
                      >
                        {value.value}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {product.options[1] && (
                <div className="mt-4">
                  <span className="text-lg font-semibold">
                    {product.options[1].name}
                  </span>
                  <div className="flex gap-3 mt-2">
                    {product.options[1].values.map((value) => (
                      <button
                        key={value.id}
                        onClick={() =>
                          setSelectedOptionValues((prev) => ({
                            ...prev,
                            1: String(value.id),
                          }))
                        }
                        className={`px-4 py-2 border rounded-lg transition-all ${selectedOptionValues[1] === String(value.id) ? 'bg-orange-200 text-orange-700 border-orange-400' : 'bg-white text-gray-800 border-gray-300 hover:bg-gray-100'}`}
                      >
                        {value.value}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
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
            <button
              className="border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white py-2 px-4 rounded"
              disabled={
                selectedVariant && selectedVariant.status === 'OUT_OF_STOCK'
              }
            >
              BUY
            </button>
            <button
              className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded"
              disabled={
                selectedVariant && selectedVariant.status === 'OUT_OF_STOCK'
              }
            >
              ADD TO CART
            </button>
            {selectedVariant && selectedVariant.status === 'OUT_OF_STOCK' && (
              <span className="text-red-500 font-semibold ml-2">Hết hàng</span>
            )}
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
              {product.rating} <span className="text-xl">/5</span>
            </h1>
            <div className="flex items-center my-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="text-yellow-400" fill="yellow" />
              ))}
            </div>
            <p className="text-lg">{product.reviews} Reviews</p>
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
              {['Description', `Reviews (${product.reviews})`].map((tab) => (
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
              {activeTab === `Reviews (${product.reviews})` && (
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
                    <div className="mb-4">
                      <label className="block text-gray-700 font-medium mb-2">
                        Tải ảnh lên (tùy chọn):
                      </label>
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageChange}
                        className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4
                                  file:rounded-full file:border-0 file:text-sm file:font-semibold
                                  file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100"
                      />
                      {reviewImages.length > 0 && (
                        <div className="flex gap-4 flex-wrap mt-2">
                          {reviewImages.map((image, idx) => (
                            <div key={idx} className="relative group">
                              <img
                                src={URL.createObjectURL(image)}
                                alt={`uploaded-${idx}`}
                                className="w-24 h-24 object-cover rounded border"
                              />
                              <button
                                type="button"
                                className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 text-xs hidden group-hover:block"
                                onClick={() => {
                                  setReviewImages((prev) =>
                                    prev.filter((_, i) => i !== idx)
                                  );
                                }}
                              >
                                ×
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
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
                      <div key={review.id} className="flex gap-4 flex-col">
                        <div className="flex gap-4">
                          <img
                            src={review.avatar}
                            alt={review.name}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                          <div className="flex-1">
                            <div className="text-xs text-gray-400 mt-1">
                              {new Date(review.createdAt).toLocaleString()}
                            </div>
                            <div className="flex justify-between items-center">
                              <div>
                                <div className="font-semibold mb-5">
                                  {review.name}
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
                            <p className="text-gray-600 text-sm">
                              {review.content}
                            </p>
                            {Array.isArray(review.images) &&
                              review.images.length > 0 && (
                                <div className="mt-2 flex gap-2 flex-wrap">
                                  {review.images.map((img, idx) => (
                                    <img
                                      key={idx}
                                      src={img}
                                      alt={`review-${idx}`}
                                      className="w-24 h-24 rounded object-cover border cursor-pointer"
                                      onClick={() => setViewingImage(img)}
                                    />
                                  ))}
                                </div>
                              )}
                            {viewingImage && (
                              <div
                                className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-70"
                                onClick={() => setViewingImage(null)}
                              >
                                <img
                                  src={viewingImage}
                                  alt="Enlarged"
                                  className="max-w-full max-h-full rounded shadow-lg"
                                  onClick={(e) => e.stopPropagation()}
                                />
                              </div>
                            )}
                            <button
                              onClick={() => handleReplyClick(review.id)}
                              className="text-sm text-orange-500 mt-2 hover:underline"
                            >
                              {replyingToId === review.id ? 'Cancel' : 'Reply'}
                            </button>
                            {replyingToId === review.id && (
                              <div className="mt-2">
                                <textarea
                                  rows={2}
                                  placeholder="Write a reply..."
                                  className="w-full border rounded px-3 py-2 mt-2 focus:outline-orange-500"
                                  value={replyContent}
                                  onChange={(e) =>
                                    setReplyContent(e.target.value)
                                  }
                                />
                                <button
                                  onClick={() => handleReplySubmit(review.id)}
                                  className="mt-2 px-4 py-1 bg-orange-500 text-white rounded hover:bg-orange-600"
                                >
                                  Submit Reply
                                </button>
                              </div>
                            )}
                            {review.replies && review.replies.length > 0 && (
                              <div className="mt-4 pl-6 border-l border-orange-200 space-y-2">
                                {review.replies.map((reply) => (
                                  <div key={reply.id}>
                                    <p className="text-xs text-gray-400">
                                      {new Date(
                                        reply.createdAt
                                      ).toLocaleString()}
                                    </p>
                                    <div className="flex ">
                                      <img
                                        src={reply.avatar}
                                        alt={reply.name}
                                        className="w-8 h-8 rounded-full object-cover"
                                      />
                                      <p className="text-sm text-gray-800 font-semibold ms-3">
                                        {reply.name}:
                                      </p>
                                      <p className="text-sm text-gray-700 ms-1">
                                        {reply.content}
                                      </p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
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
