import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import Rating from '@mui/material/Rating';
import {
  Products,
  Variant,
  getProductById,
} from '../../services/productsService';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { addToWishlist } from '../../services/wishlistService';
import { useWishlist } from '../../contexts/WishlistContext';

interface ProductCardProps {
  product: Products;
  variant?: Variant;
  onAddToCart?: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  variant,
  onAddToCart,
}) => {
  const [firstVariantPrice, setFirstVariantPrice] = useState<number | null>(
    null
  );
  const [isAnimating, setIsAnimating] = useState(false);
  const { optimisticAdd, forceSync, wishlistIds } = useWishlist();

  useEffect(() => {
    // Nếu không truyền variant, tự fetch product detail để lấy giá variant đầu tiên
    if (!variant && product.id) {
      getProductById(product.id)
        .then((fullProduct) => {
          if (fullProduct.variants && fullProduct.variants.length > 0) {
            setFirstVariantPrice(fullProduct.variants[0].price);
          } else {
            setFirstVariantPrice(null);
          }
        })
        .catch(() => setFirstVariantPrice(null));
    }
  }, [product.id, variant]);

  // Ưu tiên ảnh từ variant nếu có, fallback về product
  const thumbnailImage =
    variant?.images?.find((img) => img.isThumbnail)?.imageUrl ||
    variant?.images?.[0]?.imageUrl ||
    product.images?.find((img) => img.isThumbnail)?.imageUrl ||
    product.images?.[0]?.imageUrl ||
    '/placeholder-image.jpg';

  // Nếu có variant thì lấy giá từ variant, nếu không thì lấy từ firstVariantPrice (đã fetch từ API)
  const price = variant?.price ?? firstVariantPrice ?? 0;
  // Ưu tiên rating từ product (vì variant thường không có rating riêng)
  const rating = product.rating || 0;

  const variantId = variant?.id || product.id;

  const isWishlisted = wishlistIds?.includes(variantId);

  const handleAddToWishlist = async () => {
    alert('Đang thêm vào wishlist...');
    try {
      if (!variant && product.variants && product.variants.length > 0) {
        await addToWishlist(product.variants[0].id);
      } else if (variant) {
        await addToWishlist(variant.id);
      }
      optimisticAdd(variantId);
      await forceSync(); // Sync with API after add
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 800); // Kết thúc hiệu ứng sau 0.8s
    } catch (e) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const error = e as Error & { message?: string };
      if (error.message?.includes('đăng nhập')) {
        window.location.href = '/login';
      } else {
        alert(error.message || 'Có lỗi xảy ra khi thêm vào wishlist');
      }
    }
  };

  return (
    <div className="productItem border-2 border-[rgba(0,0,0,0.1)] rounded-[20px] bg-[#f1f1f1] shadow-lg flex flex-col items-center">
      <div className="imgWrapper w-full h-[270px] overflow-hidden rounded-[20px] flex items-center justify-center">
        <img
          className="w-full h-full object-cover"
          src={thumbnailImage}
          alt={product.title}
        />
      </div>
      <div className="info flex flex-col justify-center gap-1 mt-4 px-4 w-full">
        <h3 className="text-[16px] font-[1000] text-[rgba(0,0,0,0.9)]">
          <Link to={`/product/${product.id}`} className="link transition-all">
            {product.title}
          </Link>
        </h3>
        {/* Hiển thị thông tin variant nếu có */}
        {variant && (
          <div className="text-xs text-gray-500 mb-1">
            SKU: {variant.sku}
            {variant.optionValues && variant.optionValues.length > 0 && (
              <>
                {' | '}
                {variant.optionValues
                  .map((opt) => `${opt.optionName}: ${opt.value}`)
                  .join(', ')}
              </>
            )}
          </div>
        )}
        <div className="flex items-center justify-between mt-3 mb-3">
          <h3 className="font-[700] text-lg text-orange-500">
            ${price.toFixed(2)}
          </h3>
          <Rating
            name="size-small"
            defaultValue={rating}
            size="small"
            readOnly
          />
          <button
            onClick={handleAddToWishlist}
            className={`text-red-500 hover:text-red-600 transition-colors relative ${isAnimating ? 'wishlist-fly' : ''}`}
          >
            {isWishlisted ? (
              <AiFillHeart className="text-2xl" />
            ) : (
              <AiOutlineHeart className="text-2xl" />
            )}
          </button>
        </div>
        <div className="mb-6">
          <Button
            variant="outlined"
            onClick={onAddToCart}
            sx={{
              borderColor: 'orange',
              color: 'orange',
              width: '100%',
              minWidth: '200px',
              padding: '4px 0',
              fontSize: '16px',
              '&:hover': {
                borderColor: 'darkorange',
                backgroundColor: 'rgba(255,165,0,0.1)',
              },
            }}
          >
            Add to cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

// Thêm CSS hiệu ứng bay lên wishlist
// Thêm vào file ProductCard.module.css hoặc index.css nếu dùng global
/*
.wishlist-fly {
  animation: flyToWishlist 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}
@keyframes flyToWishlist {
  0% {
    transform: scale(1) translateY(0) translateX(0);
    opacity: 1;
  }
  60% {
    transform: scale(1.5) translateY(-40px) translateX(40px);
    opacity: 0.7;
  }
  100% {
    transform: scale(0.5) translateY(-80px) translateX(120px);
    opacity: 0;
  }
}
*/
