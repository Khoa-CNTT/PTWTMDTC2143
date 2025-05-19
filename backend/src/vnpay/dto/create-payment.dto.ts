import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class CreatePaymentDto {
  @ApiProperty({
    description: 'Payment amount',
    example: 10000,
  })
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  amount: number;

  @ApiProperty({
    description:
      'Bank code (optional). If not provided, user will select on VNPay page.',
    example: 'NCB',
    required: false,
  })
  @IsOptional()
  @IsString()
  bankCode?: string;

  @ApiProperty({
    description: 'Language for VNPay page (vn or en). Defaults to vn.',
    example: 'vn',
    required: false,
  })
  @IsOptional()
  @IsString()
  language?: string;

  @ApiProperty({
    description: 'Order description',
    example: 'Thanh toan don hang #123',
  })
  @IsNotEmpty()
  @IsString()
  orderDescription: string;

  @ApiProperty({
    description: 'Order type (e.g., billpayment, fashion). Defaults to other.',
    example: 'other',
    required: false,
  })
  @IsOptional()
  @IsString()
  orderType?: string;
}
