import api from './api';

export interface FlashSaleProduct {
  variantId: string;
  flashPrice: number;
  quantity: number;
  variant: {
    id: string;
    sku: string;
    price: number;
    compareAtPrice: number | null;
    weight: number;
    weightUnit: string;
    dimensions: string;
    description: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    productId: string;
    images: {
      id: string;
      imageUrl: string;
    }[];
    optionValues: {
      id: string;
      optionValueId: string;
      optionValue: {
        id: string;
        value: string;
        option: {
          id: string;
          name: string;
        };
      };
    }[];
  };
}

export interface FlashSale {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  products: FlashSaleProduct[];
}

export interface FlashSaleResponse {
  data: FlashSale[];
  nextCursor: string | null;
}

export interface PriceResponse {
  variantId: string;
  price: number;
}

class FlashSaleService {
  async getFlashSales(
    limit: number = 10,
    cursor?: string
  ): Promise<FlashSaleResponse> {
    const params = new URLSearchParams();
    params.append('limit', limit.toString());
    if (cursor) {
      params.append('cursor', cursor);
    }

    const response = await api.get(`/flashsale?${params.toString()}`);
    console.log('API Response:', response);
    console.log('API Response Data:', response.data);
    return response.data;
  }

  async getFlashSalePrice(variantId: string): Promise<PriceResponse> {
    const response = await api.get(`/flashsale/price/${variantId}`);
    return response.data;
  }

  async decrementStock(
    variantId: string,
    quantity: number
  ): Promise<{ success: boolean; message: string }> {
    const response = await api.post(`/flashsale/decrement-stock/${variantId}`, {
      quantity,
    });
    return response.data;
  }
}

export const flashSaleService = new FlashSaleService();
