import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { getWishlist } from '../services/wishlistService';
import { useAuth } from './AuthContext';

interface WishlistContextType {
  count: number;
  refresh: () => Promise<void>;
  optimisticAdd: () => void;
  optimisticRemove: () => void;
  forceSync: () => Promise<void>;
}

const WishlistContext = createContext<WishlistContextType | undefined>(
  undefined
);

export const WishlistProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { isAuthenticated } = useAuth();
  const [count, setCount] = useState(0);

  const refresh = async () => {
    if (!isAuthenticated) {
      setCount(0);
      return;
    }
    try {
      const wishlist = await getWishlist();
      setCount(wishlist.products.length);
    } catch {
      setCount(0);
    }
  };

  // Force sync from API (for F5 or after add/remove)
  const forceSync = async () => {
    await refresh();
  };

  // For instant UI update
  const optimisticAdd = () => setCount((c) => c + 1);
  const optimisticRemove = () => setCount((c) => Math.max(0, c - 1));

  useEffect(() => {
    refresh();
    // eslint-disable-next-line
  }, [isAuthenticated]);

  return (
    <WishlistContext.Provider
      value={{ count, refresh, optimisticAdd, optimisticRemove, forceSync }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error('useWishlist must be used within WishlistProvider');
  return ctx;
};
