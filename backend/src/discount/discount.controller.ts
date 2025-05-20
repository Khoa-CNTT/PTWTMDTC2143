import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  Query,
} from '@nestjs/common';
import { DiscountService } from './discount.service';
import { DiscountCreateDTO } from './dto/discount-create.dto';
import { DiscountUpdateDTO } from './dto/discount-update.dto';
import { DiscountResponseDTO } from './dto/discount-response.dto';

@Controller('discounts')
export class DiscountController {
  constructor(private readonly discountService: DiscountService) {}

  @Post()
  create(@Body() dto: DiscountCreateDTO) {
    return this.discountService.create(dto);
  }

  @Get()
  async findAll(
    @Query('limit') limit: number = 10,
    @Query('cursor') cursor?: string
  ): Promise<{ data: DiscountResponseDTO[]; nextCursor: string | null }> {
    return this.discountService.findAll(limit, cursor);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.discountService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: DiscountUpdateDTO) {
    return this.discountService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.discountService.remove(id);
  }
}
