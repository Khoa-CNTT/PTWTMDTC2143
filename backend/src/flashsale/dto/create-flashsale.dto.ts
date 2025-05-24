import { Type } from 'class-transformer';
import {
  IsArray,
  IsDate,
  IsInt,
  IsString,
  IsUUID,
  Min,
  ValidateNested,
} from 'class-validator';

class FlashSaleProductDto {
  @IsUUID()
  variantId: string;

  @IsInt()
  @Min(0)
  flashPrice: number;

  @IsInt()
  @Min(0)
  quantity: number;
}

export class CreateFlashSaleDto {
  @IsString()
  title: string;

  @IsDate()
  @Type(() => Date)
  startDate: Date;

  @IsDate()
  @Type(() => Date)
  endDate: Date;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FlashSaleProductDto)
  products: FlashSaleProductDto[];
}
