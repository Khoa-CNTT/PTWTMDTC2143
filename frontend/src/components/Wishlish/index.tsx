import React, { useEffect, useState } from 'react';
import { FaStar, FaTrash, FaShareAlt, FaCartPlus } from 'react-icons/fa';
import {
  getWishlist,
  removeFromWishlist,
} from '../../services/wishlistService';
import {
  getProductById,
  Variant,
  Products,
} from '../../services/productsService';
import { useNavigate } from 'react-router-dom';
import { useWishlist } from '../../contexts/WishlistContext';

interface WishlistItem {
  id: string;
  variant: Variant;
  product: Products;
}

const Wishlist: React.FC = () => {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { forceSync } = useWishlist();

  const fetchWishlist = async () => {
    setLoading(true);
    try {
      const wishlistData = await getWishlist();
      // Fetch product detail for each variant to get up-to-date price and product info
      const items: WishlistItem[] = await Promise.all(
        wishlistData.products.map(async (item) => {
          // Access productId on variant, fallback to empty string if not present
          const productId = (item.variant as { productId?: string }).productId;
          if (!productId) throw new Error('Missing productId in variant');
          const product = await getProductById(productId);
          const variant =
            product.variants.find((v: Variant) => v.id === item.variant.id) ||
            item.variant;
          return { id: item.id, variant, product };
        })
      );
      setWishlist(items);
    } catch (e) {
      setWishlist([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
    // Sync context count with API on mount/F5
    forceSync();
    // eslint-disable-next-line
  }, []);

  const handleRemove = async (variantId: string) => {
    try {
      await removeFromWishlist(variantId);
      setWishlist((prev) =>
        prev.filter((item) => item.variant.id !== variantId)
      );
      await forceSync();
    } catch (error) {
      const err = error as Error & { message?: string };
      alert(err.message || 'Có lỗi xảy ra khi xóa khỏi wishlist');
    }
  };

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="p-6 space-y-6 bg-gray-100">
      <div className="bg-white mx-auto p-4 rounded-lg shadow-md w-[1200px]">
        <h1 className="text-2xl font-semibold mb-4">Your Wishlist</h1>
        {wishlist.length === 0 ? (
          <p className="text-gray-600">
            You have no products in your wishlist.
          </p>
        ) : (
          wishlist.map((item) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row gap-4 border rounded-lg p-4 mb-4"
            >
              <img
                src={
                  item.variant.images?.[0]?.imageUrl || '/placeholder-image.jpg'
                }
                alt={item.product.title}
                className="w-36 h-36 object-contain self-center sm:self-start cursor-pointer"
                onClick={() => navigate(`/product/${item.product.id}`)}
              />

              <div className="flex-1">
                <h2
                  className="text-lg font-semibold text-blue-700 hover:underline cursor-pointer"
                  onClick={() => navigate(`/product/${item.product.id}`)}
                >
                  {item.product.title}
                </h2>
                <div className="text-xs text-gray-500 mb-1">
                  SKU: {item.variant.sku}
                  {item.variant.optionValues &&
                    item.variant.optionValues.length > 0 && (
                      <>
                        {' | '}
                        {item.variant.optionValues
                          .map(
                            (opt: {
                              id: string;
                              value: string;
                              optionId: string;
                              optionName: string;
                            }) => `${opt.optionName}: ${opt.value}`
                          )
                          .join(', ')}
                      </>
                    )}
                </div>
                <div className="flex items-center gap-1 text-orange-500 mt-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <FaStar
                      key={i}
                      className={
                        i < (item.product.rating || 0)
                          ? 'text-orange-400'
                          : 'text-gray-300'
                      }
                    />
                  ))}
                  {item.product.rating && (
                    <span className="text-sm text-gray-600 ml-2">
                      {item.product.rating.toLocaleString()}
                    </span>
                  )}
                </div>
                <div className="text-lg font-bold mt-2 text-gray-800 flex items-center gap-2">
                  {item.variant.price?.toLocaleString()} USD
                  {item.variant.compareAtPrice &&
                    item.variant.compareAtPrice > item.variant.price && (
                      <span className="text-sm text-gray-500 line-through">
                        {item.variant.compareAtPrice.toLocaleString()} USD
                      </span>
                    )}
                </div>
                <div className="flex flex-wrap gap-2 mt-4">
                  <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-1 rounded flex items-center gap-2">
                    <FaCartPlus /> Add to Cart
                  </button>
                  <button className="bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded">
                    <FaShareAlt />
                  </button>
                  <button
                    className="bg-gray-100 hover:bg-red-100 px-3 py-1 rounded text-red-500"
                    onClick={() => handleRemove(item.variant.id)}
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Wishlist;
