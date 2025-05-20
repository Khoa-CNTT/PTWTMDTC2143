import axiosInstance from './axios.config';

export interface OrderItem {
  variantId: string;
  quantity: number;
}

export interface CreateOrderDTO {
  fullName: string;
  phone: string;
  streetAddress: string;
  ward: string;
  district: string;
  city: string;
  province: string;
  country: string;
  voucherId?: string;
  items: OrderItem[];
}

export interface Order {
  id: string;
  fullName: string;
  phone: string;
  streetAddress: string;
  ward: string;
  district: string;
  city: string;
  province: string;
  country: string;
  status: string;
  payment: string;
  items: OrderItem[];
  createdAt: string;
  totalAmount: number;
  paymentMethod: string;
}

export interface UpdateOrderStatusDTO {
  status: string;
  payment?: string;
}

interface OrderResponse {
  id: string;
  fullName: string;
  phone: string;
  streetAddress: string;
  ward: string;
  district: string;
  city: string;
  province: string;
  country: string;
  status: string;
  payment?: string;
  items: OrderItem[];
  createdAt: string;
  totalAmount?: number;
  paymentMethod?: string;
}

class OrderService {
  async createOrder(data: CreateOrderDTO) {
    const res = await axiosInstance.post('/order', data);
    return res.data;
  }

  async getOrders() {
    const res = await axiosInstance.get('/order/admin/all');
    // Transform data to match frontend requirements
    return res.data.map((order: OrderResponse) => ({
      ...order,
      payment: order.payment || 'Pending',
      paymentMethod: order.paymentMethod || 'Cash',
      totalAmount: order.totalAmount || 0,
    }));
  }

  async getOrder(id: string) {
    const res = await axiosInstance.get(`/order/${id}`);
    return res.data;
  }

  async updateStatus(id: string, data: UpdateOrderStatusDTO) {
    const res = await axiosInstance.patch(`/order/${id}/status`, data);
    return res.data;
  }

  async deleteOrder(id: string) {
    const res = await axiosInstance.delete(`/order/${id}`);
    return res.data;
  }
}

export const orderService = new OrderService();
