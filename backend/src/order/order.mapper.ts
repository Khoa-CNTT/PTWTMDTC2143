import { Order, OrderItem } from '@prisma/client';
import { OrderItemResponseDTO } from './dto/order-item-response.dto';
import { OrderResponseDTO } from './dto/order-response.dto';

export class OrderMapper {
  static toItemDTO(item: OrderItem): OrderItemResponseDTO {
    return {
      id: item.id,
      variantId: item.variantId,
      quantity: item.quantity,
      unitPrice: item.unitPrice,
      price: item.price,
      discount: item.discount,
    };
  }

  static toOrderDTO(order: Order & { items: OrderItem[] }): OrderResponseDTO {
    return {
      id: order.id,
      userId: order.userId,
      total: order.total,
      status: order.status,
      voucherDiscount: order.voucherDiscount,
      fullName: order.fullName,
      phone: order.phone,
      streetAddress: order.streetAddress,
      ward: order.ward,
      district: order.district,
      city: order.city,
      province: order.province,
      country: order.country,
      paymentMethod: order.paymentMethod,
      items: order.items.map((item) => this.toItemDTO(item)),
    };
  }
}
