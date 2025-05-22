import {
  IsString,
  IsNotEmpty,
  IsPhoneNumber,
  IsOptional,
  IsArray,
  ValidateNested,
  IsUUID,
  IsInt,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateOrderItemDTO {
  @IsUUID()
  variantId: string;

  @IsInt()
  @Min(1)
  quantity: number;
}

export class CreateOrderDTO {
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @IsPhoneNumber('VN')
  phone: string;

  @IsString()
  @IsNotEmpty()
  streetAddress: string;

  @IsString() ward: string;
  @IsString() district: string;
  @IsString() city: string;
  @IsString() province: string;
  @IsString() country: string;

  @IsOptional()
  @IsUUID()
  voucherId?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemDTO)
  items: CreateOrderItemDTO[];
}

export interface CalculatedOrderData {
  dto: CreateOrderDTO;
  total: number;
  voucherDiscount: number;
  orderItemsData: {
    productId: string;
    variantId: string;
    quantity: number;
    price: number;
  }[];
}
