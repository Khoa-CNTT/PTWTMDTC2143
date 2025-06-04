import api from './api';
import { Variant } from './productsService';
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
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  if (!user.id) throw new Error('Bạn cần đăng nhập để sử dụng wishlist');
  const res = await api.get(`/wishlist?userId=${user.id}`);
  return res.data;
};

export const addToWishlist = async (variantId: string) => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  if (!user.id) throw new Error('Bạn cần đăng nhập để sử dụng wishlist');
  const res = await api.post('/wishlist', { variantId, userId: user.id });
  return res.data;
};

export const removeFromWishlist = async (variantId: string) => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  if (!user.id) throw new Error('Bạn cần đăng nhập để sử dụng wishlist');
  const res = await api.delete(`/wishlist/${variantId}?userId=${user.id}`);
  return res.data;
};
