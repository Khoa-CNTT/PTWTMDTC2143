import api from './api';
import { Variant } from '../services/productService';
export interface WishlistItem {
  id: string;
  variant: Variant; // Bạn có thể định nghĩa type Variant chi tiết hơn nếu muốn
}

export interface Wishlist {
  id: string;
  userId: string;
  products: WishlistItem[];
}

export const getWishlist = async (): Promise<Wishlist> => {
  const res = await api.get('/wishlist');
  return res.data;
};

export const addToWishlist = async (variantId: string) => {
  const res = await api.post('/wishlist', { variantId });
  return res.data;
};

export const removeFromWishlist = async (variantId: string) => {
  const res = await api.delete(`/wishlist/${variantId}`);
  return res.data;
};
