import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../../services/productsService';
import {
  Products,
  ProductImage,
  Variant,
} from '../../services/productsService';
import { Button, IconButton, Typography } from '@mui/material';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

const ProductDetail: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Products | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isWishlist, setIsWishlist] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        const apiProduct = await getProductById(productId!);
        setProduct(apiProduct);
        if (apiProduct.variants && apiProduct.variants.length > 0) {
          setSelectedVariant(apiProduct.variants[0]);
        } else {
          setSelectedVariant(null);
        }
      } catch (err) {
        setError('Failed to fetch product details');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productId]);

  const handleWishlistClick = () => {
    setIsWishlist(!isWishlist);
  };

  const handleAddToCart = () => {
    console.log('Add to cart:', {
      productId: product?.id,
      variantId: selectedVariant?.id,
      quantity: quantity,
    });
  };

  const handleQuantityChange = (delta: number) => {
    const newQuantity = quantity + delta;
    if (newQuantity >= 1 && newQuantity <= 10) {
      // Giới hạn cứng là 10
      setQuantity(newQuantity);
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

  // Ảnh chính và thumbnail sẽ lấy theo selectedVariant nếu có, nếu không thì lấy ảnh sản phẩm
  const mainImage =
    selectedVariant?.images?.find((img: ProductImage) => img.isThumbnail)
      ?.imageUrl ||
    selectedVariant?.images?.[0]?.imageUrl ||
    product.images?.find((img: ProductImage) => img.isThumbnail)?.imageUrl ||
    product.images?.[0]?.imageUrl;

  const thumbnails =
    selectedVariant?.images?.length && selectedVariant.images.length > 0
      ? selectedVariant.images
      : product.images || [];

  return (
    <div className="container mx-auto p-6 flex gap-10 border-1 rounded-[30px] bg-white">
      <div className="flex flex-col">
        <img
          src={mainImage}
          alt={product.title}
          className="w-[400px] h-[300px] object-cover rounded-lg"
        />
        <div className="flex mt-3 space-x-2">
          {thumbnails.map((img: ProductImage, index: number) => (
            <img
              key={img.id}
              src={img.imageUrl}
              alt={`Thumbnail ${index}`}
              className="w-16 h-16 object-cover rounded-lg cursor-pointer border-2 border-transparent"
            />
          ))}
        </div>
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-start">
          <div>
            <span className="text-gray-500 text-sm">ID: {product.id}</span>
            <h2 className="text-2xl font-bold mt-2">{product.title}</h2>
            <div className="mb-2 text-gray-500">
              {product.category?.name} | {product.brand?.name}
            </div>
          </div>
          <IconButton onClick={handleWishlistClick} className="text-2xl">
            {isWishlist ? (
              <FaHeart className="text-red-500" />
            ) : (
              <FaRegHeart className="text-gray-600" />
            )}
          </IconButton>
        </div>
        {selectedVariant && (
          <div className="flex items-center mt-3 gap-3">
            <div>
              <span className="block text-xs text-gray-400">Giá bán</span>
              <span className="text-orange-500 text-3xl font-bold">
                ${selectedVariant.price.toLocaleString()}
              </span>
            </div>
            {selectedVariant.compareAtPrice && (
              <div>
                <span className="block text-xs text-gray-400">Giá gốc</span>
                <span className="text-gray-400 line-through text-xl ml-1">
                  ${selectedVariant.compareAtPrice.toLocaleString()}
                </span>
              </div>
            )}
            {selectedVariant.compareAtPrice &&
              selectedVariant.compareAtPrice > selectedVariant.price && (
                <span className="bg-green-200 text-green-800 text-sm font-semibold px-2 py-1 rounded ml-3">
                  Tiết kiệm{' '}
                  {Math.round(
                    (100 *
                      (selectedVariant.compareAtPrice -
                        selectedVariant.price)) /
                      selectedVariant.compareAtPrice
                  )}
                  %
                </span>
              )}
          </div>
        )}
        <p className="text-gray-600 text-sm mt-3">{product.description}</p>
        {product.options && product.options.length > 0 && (
          <div className="mb-4 mt-4">
            <h3 className="font-semibold mb-1">Options:</h3>
            {product.options.map((opt) => (
              <div key={opt.id} className="mb-2">
                <span className="font-medium">{opt.name}: </span>
                {opt.values.map((val) => (
                  <span
                    key={val.id}
                    className="inline-block bg-gray-100 px-2 py-1 rounded mr-2 text-sm"
                  >
                    {val.value}
                  </span>
                ))}
              </div>
            ))}
          </div>
        )}
        {/* Variants dưới phần thông tin */}
        {product.variants && product.variants.length > 0 && (
          <div className="mb-4 mt-4">
            <h3 className="font-semibold mb-1">Chọn biến thể:</h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {product.variants.map((variant) => (
                <button
                  key={variant.id}
                  className={`px-4 py-2 rounded border transition font-medium ${
                    selectedVariant && selectedVariant.id === variant.id
                      ? 'bg-orange-500 text-white border-orange-500'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-orange-100'
                  }`}
                  onClick={() => setSelectedVariant(variant)}
                >
                  {variant.sku || variant.description || 'Variant'}
                </button>
              ))}
            </div>
          </div>
        )}
        <div className="mt-6 flex flex-col items-start gap-3">
          {/* Quantity controls */}
          <div className="flex items-center justify-center mb-2">
            <Button
              onClick={() => handleQuantityChange(-1)}
              className="min-w-0 px-4 py-2"
              style={{ color: '#3b82f6', fontWeight: 700, fontSize: 20 }}
              disabled={quantity <= 1}
            >
              -
            </Button>
            <Typography
              className="px-6"
              style={{ minWidth: 24, textAlign: 'center', fontWeight: 600 }}
            >
              {quantity}
            </Typography>
            <Button
              onClick={() => handleQuantityChange(1)}
              className="min-w-0 px-4 py-2"
              style={{ color: '#3b82f6', fontWeight: 700, fontSize: 20 }}
              disabled={quantity >= 10}
            >
              +
            </Button>
          </div>

          {/* Action buttons */}
          <div className="flex flex-row gap-2 w-full justify-start">
            <Button
              variant="outlined"
              size="large"
              style={{
                borderColor: '#fb923c',
                color: '#fb923c',
                background: '#fff',
                borderRadius: 8,
                fontWeight: 600,
                minWidth: 100,
                height: 44,
              }}
              onClick={() => alert('Buy now!')}
            >
              BUY
            </Button>
            <Button
              variant="contained"
              size="large"
              style={{
                background: '#fb923c',
                color: '#fff',
                borderRadius: 8,
                fontWeight: 600,
                minWidth: 140,
                height: 44,
                boxShadow: 'none',
              }}
              onClick={handleAddToCart}
              disabled={!selectedVariant}
            >
              ADD TO CART
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
