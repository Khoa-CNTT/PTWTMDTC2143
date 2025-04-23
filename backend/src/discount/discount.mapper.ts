import { Prisma } from '@prisma/client';
import { DiscountResponseDTO } from './dto/discount-response.dto';

type DiscountWithRelations = Prisma.DiscountGetPayload<{
  include: {
    categories: {
      include: {
        category: true;
      };
    };
    products: {
      include: {
        product: true;
      };
    };
  };
}>;

export class DiscountMapper {
  static toDTO(discount: DiscountWithRelations): DiscountResponseDTO {
    return {
      id: discount.id,
      discount: discount.discount,
      type: discount.type,
      startDate: discount.startDate.toISOString(),
      endDate: discount.endDate.toISOString(),
      status: discount.status,
      applyType: discount.applyType,
      categories: discount.categories.map((c) => c.category.id),
      products: discount.products.map((p) => p.product.id),
    };
  }
}
