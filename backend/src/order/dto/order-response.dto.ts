import { OrderStatus, PaymentMethod } from '@prisma/client';
import { OrderItemResponseDTO } from './order-item-response.dto';

export class OrderResponseDTO {
  id: string;
  userId: string;
  total: number;
  status: OrderStatus;
  voucherDiscount: number;
  fullName: string;
  phone: string;
  streetAddress: string;
  ward: string;
  district: string;
  city: string;
  province: string;
  country: string;
  items: OrderItemResponseDTO[];
  paymentMethod: PaymentMethod;
}
