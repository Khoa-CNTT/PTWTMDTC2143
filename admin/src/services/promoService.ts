import axiosInstance from './axios.config';
import { authService } from './auth.service';

export interface Promotion {
  id: string;
  name?: string;
  description?: string;
  discount: number;
  discountValue?: number;
  startDate: string;
  endDate: string;
  status: 'ACTIVE' | 'INACTIVE' | 'EXPIRED';
  type: 'discount' | 'voucher';
  code?: string;
  minOrderValue?: number;
  minPrice?: number;
  maxDiscountValue?: number;
  maxDiscount?: number;
  usageLimit?: number;
  usedCount?: number;
  applyType?: 'ALL' | 'CATEGORY' | 'PRODUCT';
  categories?: string[];
  products?: string[];
  isPublic?: boolean;
}

export interface PromotionListResponse {
  promotions: Promotion[];
  total: number;
  nextCursor: string | null;
}

export interface Voucher {
  id: string;
  code: string;
  discount: number;
  type: 'PERCENTAGE' | 'FIXED';
  minSpend: number;
  maxDiscount?: number;
  startDate: string;
  endDate: string;
  status: 'ACTIVE' | 'INACTIVE';
  usageLimit: number;
  usedCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface Discount {
  id: string;
  name: string;
  description: string;
  discount: number;
  type: 'PERCENTAGE' | 'FIXED';
  minSpend: number;
  maxDiscount?: number;
  startDate: string;
  endDate: string;
  status: 'ACTIVE' | 'INACTIVE';
  createdAt: string;
  updatedAt: string;
  applyType: 'ALL' | 'CATEGORY' | 'PRODUCT';
  categories: string[];
  products: string[];
}

export interface VoucherResponse {
  vouchers: Voucher[];
  total: number;
  page: number;
  totalPages: number;
}

export interface DiscountResponse {
  discounts: Discount[];
  total: number;
  page: number;
  totalPages: number;
}

class PromoService {
  async getAllPromotions(
    limit: number = 10,
    cursor?: string,
    type?: 'discount' | 'voucher'
  ): Promise<PromotionListResponse> {
    if (!authService.isAuthenticated()) {
      throw new Error('User is not authenticated');
    }

    try {
      // Log the request parameters
      console.log('Fetching promotions with params:', { limit, cursor, type });

      // Fetch both vouchers and discounts
      const [vouchersResponse, discountsResponse] = await Promise.all([
        type === 'discount' ? { data: [] } : axiosInstance.get('/voucher'),
        type === 'voucher' ? { data: [] } : axiosInstance.get('/discounts'),
      ]);

      // Always treat .data as array
      const vouchersArr = Array.isArray(vouchersResponse.data)
        ? vouchersResponse.data
        : vouchersResponse.data?.vouchers || [];
      const discountsArr = Array.isArray(discountsResponse.data)
        ? discountsResponse.data
        : discountsResponse.data?.discounts || [];

      // Transform vouchers data
      const vouchers = vouchersArr.map((v: Voucher) => ({
        id: v.id || '',
        name: v.code || '',
        description: '', // Voucher không có description
        discount: v.discount ?? 0,
        discountValue: undefined, // Không có
        startDate: v.startDate || '',
        endDate: v.endDate || '',
        status: v.status || '',
        type: 'voucher',
        code: v.code || '',
        minOrderValue: v.minSpend ?? 0,
        minPrice: undefined, // Không có
        maxDiscountValue: v.maxDiscount ?? 0,
        maxDiscount: v.maxDiscount ?? 0,
        usageLimit: v.usageLimit ?? 0,
        usedCount: v.usedCount ?? 0,
        applyType: undefined, // Không có
        categories: [], // Không có
        products: [], // Không có
        isPublic: undefined, // Không có
      }));

      // Transform discounts data
      const discounts = discountsArr.map((d: Discount) => ({
        id: d.id || '',
        name: d.name || '',
        description: d.description || '',
        discount: d.discount ?? 0,
        discountValue: undefined, // Không có
        startDate: d.startDate || '',
        endDate: d.endDate || '',
        status: d.status || '',
        type: 'discount',
        code: undefined, // Không có
        minOrderValue: d.minSpend ?? 0,
        minPrice: undefined, // Không có
        maxDiscountValue: d.maxDiscount ?? 0,
        maxDiscount: d.maxDiscount ?? 0,
        usageLimit: undefined, // Không có
        usedCount: undefined, // Không có
        applyType: d.applyType || '',
        categories: d.categories || [],
        products: d.products || [],
        isPublic: undefined, // Không có
      }));

      // Log transformed data
      console.log('Transformed data:', {
        vouchers,
        discounts,
        totalVouchers: vouchers.length,
        totalDiscounts: discounts.length,
      });

      const allPromotions = [...vouchers, ...discounts];
      const total = vouchers.length + discounts.length;

      // Log final result
      console.log('Final result:', {
        allPromotions,
        total,
        promotionsCount: allPromotions.length,
      });

      return {
        promotions: allPromotions,
        total,
        nextCursor: null, // Since we're combining two different paginated results
      };
    } catch (error) {
      console.error('Error fetching promotions:', error);
      throw error;
    }
  }

  async getPromotionById(
    id: string,
    type: 'discount' | 'voucher'
  ): Promise<Promotion> {
    if (!authService.isAuthenticated()) {
      throw new Error('User is not authenticated');
    }

    try {
      const endpoint = type === 'voucher' ? '/voucher' : '/discount';
      const response = await axiosInstance.get(`${endpoint}/${id}`);
      return {
        ...response.data,
        type,
      };
    } catch (error) {
      console.error('Error fetching promotion:', error);
      throw error;
    }
  }

  async createPromotion(promotion: Omit<Promotion, 'id'>): Promise<Promotion> {
    if (!authService.isAuthenticated()) {
      throw new Error('User is not authenticated');
    }

    try {
      const endpoint = promotion.type === 'voucher' ? '/voucher' : '/discount';
      const response = await axiosInstance.post(endpoint, promotion);
      return {
        ...response.data,
        type: promotion.type,
      };
    } catch (error) {
      console.error('Error creating promotion:', error);
      throw error;
    }
  }

  async updatePromotion(
    id: string,
    promotion: Partial<Promotion>
  ): Promise<Promotion> {
    if (!authService.isAuthenticated()) {
      throw new Error('User is not authenticated');
    }

    try {
      const endpoint = promotion.type === 'voucher' ? '/voucher' : '/discount';
      const response = await axiosInstance.put(`${endpoint}/${id}`, promotion);
      return {
        ...response.data,
        type: promotion.type,
      };
    } catch (error) {
      console.error('Error updating promotion:', error);
      throw error;
    }
  }

  async deletePromotion(
    id: string,
    type: 'discount' | 'voucher'
  ): Promise<void> {
    if (!authService.isAuthenticated()) {
      throw new Error('User is not authenticated');
    }

    try {
      const endpoint = type === 'voucher' ? '/voucher' : '/discount';
      await axiosInstance.delete(`${endpoint}/${id}`);
    } catch (error) {
      console.error('Error deleting promotion:', error);
      throw error;
    }
  }

  async updatePromotionStatus(
    id: string,
    status: 'ACTIVE' | 'INACTIVE',
    type: 'discount' | 'voucher'
  ): Promise<Promotion> {
    if (!authService.isAuthenticated()) {
      throw new Error('User is not authenticated');
    }

    try {
      const endpoint = type === 'voucher' ? '/voucher' : '/discount';
      const response = await axiosInstance.patch(`${endpoint}/${id}/status`, {
        status,
      });
      return {
        ...response.data,
        type,
      };
    } catch (error) {
      console.error('Error updating promotion status:', error);
      throw error;
    }
  }

  async getAllVouchers(
    page: number = 1,
    pageSize: number = 10
  ): Promise<VoucherResponse> {
    const response = await axiosInstance.get('/voucher', {
      params: { page, pageSize },
    });
    return response.data;
  }

  async getVoucherById(id: string): Promise<Voucher> {
    const response = await axiosInstance.get(`/voucher/${id}`);
    return response.data;
  }

  async createVoucher(
    data: Omit<Voucher, 'id' | 'createdAt' | 'updatedAt' | 'usedCount'>
  ): Promise<Voucher> {
    const response = await axiosInstance.post('/voucher', data);
    return response.data;
  }

  async updateVoucher(id: string, data: Partial<Voucher>): Promise<Voucher> {
    const response = await axiosInstance.put(`/voucher/${id}`, data);
    return response.data;
  }

  async deleteVoucher(id: string): Promise<void> {
    await axiosInstance.delete(`/voucher/${id}`);
  }

  async getAllDiscounts(
    page: number = 1,
    pageSize: number = 10
  ): Promise<DiscountResponse> {
    const response = await axiosInstance.get('/discounts', {
      params: { page, pageSize },
    });
    return response.data;
  }

  async getDiscountById(id: string): Promise<Discount> {
    const response = await axiosInstance.get(`/discounts/${id}`);
    return response.data;
  }

  async createDiscount(
    data: Omit<Discount, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<Discount> {
    const response = await axiosInstance.post('/discounts', data);
    return response.data;
  }

  async updateDiscount(id: string, data: Partial<Discount>): Promise<Discount> {
    const response = await axiosInstance.put(`/discounts/${id}`, data);
    return response.data;
  }

  async deleteDiscount(id: string): Promise<void> {
    await axiosInstance.delete(`/discounts/${id}`);
  }

  // Lấy tất cả voucher, map về Promotion[]
  async getAllVouchersMapped(
    limit: number = 10,
    cursor?: string
  ): Promise<PromotionListResponse> {
    if (!authService.isAuthenticated()) {
      throw new Error('User is not authenticated');
    }
    try {
      const response = await axiosInstance.get('/voucher', {
        params: { limit, cursor },
      });
      const vouchersArr = Array.isArray(response.data)
        ? response.data
        : response.data?.vouchers || [];
      const promotions: Promotion[] = vouchersArr.map((v: Voucher) => ({
        id: v.id || '',
        name: v.code || '',
        description: '',
        discount: v.discount ?? 0,
        discountValue: undefined,
        startDate: v.startDate || '',
        endDate: v.endDate || '',
        status: v.status || '',
        type: 'voucher',
        code: v.code || '',
        minOrderValue: v.minSpend ?? 0,
        minPrice: undefined,
        maxDiscountValue: v.maxDiscount ?? 0,
        maxDiscount: v.maxDiscount ?? 0,
        usageLimit: v.usageLimit ?? 0,
        usedCount: v.usedCount ?? 0,
        applyType: undefined,
        categories: [],
        products: [],
        isPublic: undefined,
      }));
      return {
        promotions,
        total: response.data?.total ?? promotions.length,
        nextCursor: null,
      };
    } catch (error) {
      console.error('Error fetching vouchers:', error);
      throw error;
    }
  }

  // Lấy tất cả discount, map về Promotion[]
  async getAllDiscountsMapped(
    limit: number = 10,
    cursor?: string
  ): Promise<PromotionListResponse> {
    if (!authService.isAuthenticated()) {
      throw new Error('User is not authenticated');
    }
    try {
      const response = await axiosInstance.get('/discounts', {
        params: { limit, cursor },
      });
      const discountsArr = Array.isArray(response.data)
        ? response.data
        : response.data?.discounts || [];
      const promotions: Promotion[] = discountsArr.map((d: Discount) => ({
        id: d.id || '',
        name: d.name || '',
        description: d.description || '',
        discount: d.discount ?? 0,
        discountValue: undefined,
        startDate: d.startDate || '',
        endDate: d.endDate || '',
        status: d.status || '',
        type: 'discount',
        code: undefined,
        minOrderValue: d.minSpend ?? 0,
        minPrice: undefined,
        maxDiscountValue: d.maxDiscount ?? 0,
        maxDiscount: d.maxDiscount ?? 0,
        usageLimit: undefined,
        usedCount: undefined,
        applyType: d.applyType || '',
        categories: d.categories || [],
        products: d.products || [],
        isPublic: undefined,
      }));
      return {
        promotions,
        total: response.data?.total ?? promotions.length,
        nextCursor: null,
      };
    } catch (error) {
      console.error('Error fetching discounts:', error);
      throw error;
    }
  }
}

export const promoService = new PromoService();
