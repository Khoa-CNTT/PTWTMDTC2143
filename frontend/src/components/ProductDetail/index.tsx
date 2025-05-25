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
import { addToWishlist } from '../../services/wishlistService';
import { cartService } from '../../services/cartService';
import {
  reviewService,
  Review as APIReview,
} from '../../services/reviewService';
import { toast } from 'react-toastify';
import { useAuth } from '../../contexts/AuthContext';

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

// interface Review {
//   id: number;
//   name: string;
//   avatar: string;
//   email: string;
//   content: string;
//   rating: number;
//   replies?: Reply[];
//   images?: string[];
//   createdAt: Date;
// }

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
  const { user } = useAuth();
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
  const [replyingToId, setReplyingToId] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState('');
  const [reviews, setReviews] = useState<APIReview[]>([]);
  const [loadingReviews, setLoadingReviews] = useState(false);
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [content, setContent] = useState('');
  const [rating, setRating] = useState(4);
  const [reviewImages, setReviewImages] = useState<File[]>([]);
  const [viewingImage, setViewingImage] = useState<string | null>(null);
  const [addingToCart, setAddingToCart] = useState(false);

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

    const fetchReviews = async () => {
      try {
        setLoadingReviews(true);
        const fetchedReviews = await reviewService.getReviewsByProduct(
          productId!
        );
        setReviews(fetchedReviews);
      } catch (err) {
        if (loadingReviews) {
          console.error('Error fetching reviews:', err);
          toast.error('Không thể tải đánh giá. Vui lòng thử lại!');
        }
      } finally {
        setLoadingReviews(false);
      }
    };

    fetchProduct();
    fetchReviews();
  }, [productId]);

  useEffect(() => {
    if (
      !product.options ||
      product.options.length === 0 ||
      variants.length === 0
    )
      return;
    const selectedIds = Object.values(selectedOptionValues).map(String);
    console.log('variants:', variants);
    console.log('selectedOptionValues:', selectedOptionValues);
    const found = variants.find((variant) => {
      if (!variant.optionValues) return false;
      const variantValueIds = variant.optionValues.map((ov) =>
        String(ov.optionValueId)
      );
      console.log(
        'variantValueIds:',
        variantValueIds,
        'selectedIds:',
        selectedIds
      );
      // So sánh đủ số lượng và từng id phải khớp
      return (
        variantValueIds.length === selectedIds.length &&
        selectedIds.every((id) => variantValueIds.includes(id))
      );
    });
    setSelectedVariant(found || null);
    if (found && found.images && found.images.length > 0) {
      setSelectedImage(found.images[0].imageUrl);
    } else if (
      product.colors &&
      product.colors[Object.keys(product.colors)[0]]
    ) {
      setSelectedImage(product.colors[Object.keys(product.colors)[0]][0]);
    }
    console.log('selectedVariant:', found);
  }, [selectedOptionValues, product.options, variants]);

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

  const handleReplyClick = (id: string) => {
    if (replyingToId === id) {
      setReplyingToId(null);
    } else {
      setReplyingToId(id);
      setReplyContent('');
    }
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!user?.userId) {
        toast.error('Vui lòng đăng nhập để gửi đánh giá');
        return;
      }

      // Validate rating
      if (rating < 1 || rating > 5 || !Number.isInteger(rating)) {
        toast.error('Rating phải là số nguyên từ 1 đến 5');
        return;
      }

      const reviewData = {
        userId: user.userId,
        productId: productId!,
        rating: Math.round(rating),
        content,
        nickname,
        email,
      };

      const newReview = await reviewService.createReview(
        reviewData,
        reviewImages
      );
      setReviews([newReview, ...reviews]);
      toast.success('Đánh giá đã được gửi thành công!');

      // Reset form
      setNickname('');
      setEmail('');
      setContent('');
      setRating(4);
      setReviewImages([]);
    } catch (error) {
      console.error('Error submitting review:', error);
      toast.error('Không thể gửi đánh giá. Vui lòng thử lại!');
    }
  };

  const handleReplySubmit = async (reviewId: string) => {
    if (!user?.userId) {
      toast.error('Vui lòng đăng nhập để gửi phản hồi');
      return;
    }

    if (!replyContent.trim()) return;
    try {
      const reviewData = {
        userId: user.userId,
        productId: productId!,
        rating: 0, // Replies don't need rating
        content: replyContent.trim(),
        parentId: reviewId,
      };

      const newReply = await reviewService.createReview(reviewData);
      setReviews(
        reviews.map((review) =>
          review.id === reviewId
            ? { ...review, replies: [...(review.replies || []), newReply] }
            : review
        )
      );

      setReplyingToId(null);
      setReplyContent('');
      toast.success('Phản hồi đã được gửi thành công!');
    } catch (error) {
      console.error('Error submitting reply:', error);
      toast.error('Không thể gửi phản hồi. Vui lòng thử lại!');
    }
  };

  const handleAddToWishlist = async () => {
    if (!variants[0]) {
      alert('Không tìm thấy phiên bản sản phẩm để thêm vào wishlist!');
      return;
    }
    try {
      await addToWishlist(variants[0].id);
      alert('Đã thêm vào wishlist!');
    } catch (err) {
      alert('Thêm vào wishlist thất bại!');
    }
  };

  const handleAddToCart = async () => {
    console.log('selectedVariant:', selectedVariant);
    if (!selectedVariant) {
      toast.error('Vui lòng chọn phiên bản sản phẩm!');
      return;
    }

    if (selectedVariant.status === 'OUT_OF_STOCK') {
      toast.error('Sản phẩm đã hết hàng!');
      return;
    }

    try {
      setAddingToCart(true);
      await cartService.addToCart(selectedVariant.id, quantity);
      toast.success('Đã thêm vào giỏ hàng!');
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('Không thể thêm vào giỏ hàng. Vui lòng thử lại!');
    } finally {
      setAddingToCart(false);
    }
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
            <IconButton onClick={handleAddToWishlist}>
              <AiOutlineHeart className="text-gray-500" size={20} />
            </IconButton>
            <span
              className="text-orange-500 cursor-pointer"
              onClick={handleAddToWishlist}
            >
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
              className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded disabled:bg-gray-400 disabled:cursor-not-allowed"
              disabled={
                (selectedVariant &&
                  selectedVariant.status === 'OUT_OF_STOCK') ||
                addingToCart
              }
              onClick={handleAddToCart}
            >
              {addingToCart ? 'Đang thêm...' : 'ADD TO CART'}
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
              {['Description', `Reviews (${reviews.length})`].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 text-lg font-medium ${
                    activeTab === tab
                      ? 'text-orange-500 border-b-2 border-orange-500'
                      : 'text-gray-600'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            {activeTab === 'Description' && (
              <div className="mt-4">
                <h3 className="text-xl font-semibold mb-4">
                  Product Description
                </h3>
                <p className="text-gray-600 mb-4">
                  Experience the perfect blend of style and functionality with
                  our premium LED Monitor. This high-quality display offers
                  stunning visuals and exceptional performance for both work and
                  entertainment.
                </p>
                <h4 className="text-lg font-semibold mb-2">Key Features:</h4>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Direct Full Array backlighting for superior contrast</li>
                  <li>Quantum Dot Technology for vibrant colors</li>
                  <li>Ambient Mode for seamless room integration</li>
                  <li>One Remote Control for easy operation</li>
                  <li>Multiple size options to fit your space</li>
                </ul>
              </div>
            )}
            {activeTab === `Reviews (${reviews.length})` && (
              <div className="mt-4">
                <form onSubmit={handleSubmitReview} className="mb-8">
                  <h3 className="text-xl font-semibold mb-4">Write a Review</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nickname *
                      </label>
                      <input
                        type="text"
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email *
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Rating *
                    </label>
                    <Rating
                      value={rating}
                      onChange={(_, newValue) => {
                        setRating(newValue || 0);
                      }}
                      precision={0.5}
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Review *
                    </label>
                    <textarea
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      required
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Images (Optional)
                    </label>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageChange}
                      className="w-full"
                    />
                    {reviewImages.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {reviewImages.map((image, index) => (
                          <div key={index} className="relative">
                            <img
                              src={URL.createObjectURL(image)}
                              alt={`Preview ${index + 1}`}
                              className="w-20 h-20 object-cover rounded"
                            />
                            <button
                              type="button"
                              onClick={() =>
                                setReviewImages((prev) =>
                                  prev.filter((_, i) => i !== index)
                                )
                              }
                              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <button
                    type="submit"
                    className="bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600 transition-colors"
                  >
                    Submit Review
                  </button>
                </form>

                <div className="space-y-6">
                  {reviews.map((review) => (
                    <div key={review.id} className="border-b pb-6">
                      <div className="flex items-center gap-4 mb-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold">
                              {review.user?.name || 'Anonymous'}
                            </span>
                            <Rating
                              value={review.rating}
                              readOnly
                              size="small"
                            />
                          </div>
                          <p className="text-sm text-gray-500">
                            {new Date(review.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <p className="text-gray-700 mb-4">{review.content}</p>
                      {review.images && review.images.length > 0 && (
                        <div className="flex gap-2 mb-4">
                          {review.images.map((image, index) => (
                            <img
                              key={index}
                              src={viewingImage || image}
                              alt={`Review image ${index + 1}`}
                              className="w-20 h-20 object-cover rounded cursor-pointer"
                              onClick={() => setViewingImage(image)}
                            />
                          ))}
                        </div>
                      )}
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleReplyClick(review.id)}
                          className="text-orange-500 hover:text-orange-600"
                        >
                          Reply
                        </button>
                      </div>
                      {replyingToId === review.id && (
                        <div className="mt-4">
                          <textarea
                            value={replyContent}
                            onChange={(e) => setReplyContent(e.target.value)}
                            placeholder="Write your reply..."
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                            rows={3}
                          />
                          <div className="mt-2 flex gap-2">
                            <button
                              onClick={() => handleReplySubmit(review.id)}
                              className="bg-orange-500 text-white px-4 py-1 rounded hover:bg-orange-600"
                            >
                              Submit Reply
                            </button>
                            <button
                              onClick={() => {
                                setReplyingToId(null);
                                setReplyContent('');
                              }}
                              className="text-gray-500 hover:text-gray-600"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      )}
                      {review.replies && review.replies.length > 0 && (
                        <div className="ml-8 mt-4 space-y-4">
                          {review.replies.map((reply) => (
                            <div
                              key={reply.id}
                              className="border-l-2 border-gray-200 pl-4"
                            >
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-semibold">
                                  {reply.user?.name || 'Anonymous'}
                                </span>
                                <span className="text-sm text-gray-500">
                                  {new Date(
                                    reply.createdAt
                                  ).toLocaleDateString()}
                                </span>
                              </div>
                              <p className="text-gray-700">{reply.content}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
