import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { DiscountService } from './discount.service';
import { DiscountCreateDTO } from './dto/discount-create.dto';
import { DiscountUpdateDTO } from './dto/discount-update.dto';

@Controller('discounts')
export class DiscountController {
  constructor(private readonly discountService: DiscountService) {}

  @Post()
  create(@Body() dto: DiscountCreateDTO) {
    return this.discountService.create(dto);
  }

  @Get()
  findAll() {
    return this.discountService.findAll();
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
