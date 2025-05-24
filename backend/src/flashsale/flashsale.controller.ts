// flashsale.controller.ts
import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  ParseIntPipe,
  BadRequestException,
  Query,
} from '@nestjs/common';
import { FlashSaleService } from './flashsale.service';
import { CreateFlashSaleDto } from './dto/create-flashsale.dto';

@Controller('flashsale')
export class FlashSaleController {
  constructor(private readonly flashSaleService: FlashSaleService) {}

  @Post()
  async createFlashSale(@Body() dto: CreateFlashSaleDto) {
    const flashSale = await this.flashSaleService.createFlashSale(dto);
    return flashSale;
  }

  @Get()
  async getFlashSales(
    @Query('limit') limit = '10',
    @Query('cursor') cursor?: string
  ) {
    return this.flashSaleService.getFlashSales(parseInt(limit), cursor);
  }

  // Endpoint gọi để khởi tạo cache flash sale khi flash sale mới hoặc cập nhật
  @Post('cache/:flashSaleId')
  async initCache(@Param('flashSaleId') flashSaleId: string) {
    await this.flashSaleService.setFlashSaleCache(flashSaleId);
    return { message: 'Cache flash sale được cập nhật' };
  }

  // Lấy giá flash sale (hoặc giá gốc nếu không có)
  @Get('price/:variantId')
  async getPrice(@Param('variantId') variantId: string) {
    const price = await this.flashSaleService.getEffectivePrice(variantId);
    return { variantId, price };
  }

  // Giảm tồn kho flash sale (ví dụ khi khách đặt hàng thành công)
  @Post('decrement-stock/:variantId')
  async decrementStock(
    @Param('variantId') variantId: string,
    @Body('quantity', ParseIntPipe) quantity: number
  ) {
    if (quantity <= 0) throw new BadRequestException('Số lượng phải lớn hơn 0');
    const result = await this.flashSaleService.decrementFlashSaleStock(
      variantId,
      quantity
    );
    if (!result)
      return { success: false, message: 'Không đủ tồn kho flash sale' };
    return { success: true, message: 'Giảm tồn kho thành công' };
  }
}
