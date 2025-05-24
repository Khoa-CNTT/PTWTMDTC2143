import React, { useState } from 'react';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import Rating from '@mui/material/Rating';
import { Products } from '../../services/productsService';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';

interface ProductCardProps {
  product: Products;
  onAddToCart?: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const [wishlist, setWishlist] = useState<number[]>([]);

  const thumbnailImage =
    product.images?.find((img) => img.isThumbnail)?.imageUrl ||
    product.images?.[0]?.imageUrl ||
    '/placeholder-image.jpg';

  const toggleWishlist = (id: number) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
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
        <div className="flex items-center justify-between mt-3 mb-3">
          <h3 className="font-[700] text-lg text-orange-500">
            ${(product.price || 0).toFixed(2)}
          </h3>
          <Rating
            name="size-small"
            defaultValue={product.rating || 0}
            size="small"
            readOnly
          />
          <button
            onClick={() => toggleWishlist(product.id)}
            className="text-red-500 hover:text-red-600 transition-colors"
          >
            {wishlist.includes(product.id) ? (
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
