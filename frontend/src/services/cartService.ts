import api from './api';

export interface CartItem {
  variantId: string;
  quantity: number;
  originalPrice: number;
  discountedPrice: number;
  totalPrice: number;
  savedAmount: number;
  variant: {
    id: string;
    sku: string;
    price: number;
    compareAtPrice: number | null;
    description: string;
    product: {
      title: string;
    };
    images: {
      url: string;
    }[];
  };
}

export interface Cart {
  items: CartItem[];
  totalCartPrice: number;
  totalSavedAmount: number;
}

export interface AddToCartDTO {
  variantId: string;
  quantity: number;
}

export interface UpdateQuantityDTO {
  cartItemId: string;
  quantity: number;
}

export interface SelectItemDTO {
  cartItemId: string;
  isSelected: boolean;
}

class CartService {
  async getCart(): Promise<Cart> {
    const response = await api.get('/cart');
    return response.data;
  }

  async addToCart(variantId: string, quantity: number): Promise<CartItem> {
    const response = await api.post(
      '/cart',
      { variantId, quantity },
      { timeout: 20000 }
    );
    return response.data;
  }

  async updateQuantity(
    cartItemId: string,
    quantity: number
  ): Promise<CartItem> {
    const response = await api.patch('/cart/update-quantity', {
      cartItemId,
      quantity,
    });
    return response.data;
  }

  async selectItem(
    cartItemId: string,
    isSelected: boolean
  ): Promise<{ success: boolean }> {
    const response = await api.patch('/cart/select-item', {
      cartItemId,
      isSelected,
    });
    return response.data;
  }

  async getSelectedItems(): Promise<CartItem[]> {
    const response = await api.get('/cart/selected-items');
    return response.data;
  }

  async removeItem(cartItemId: string): Promise<void> {
    await api.delete(`/cart/item/${cartItemId}`);
  }

  async clearCart(): Promise<void> {
    await api.delete('/cart/clear');
  }
}

export const cartService = new CartService();
