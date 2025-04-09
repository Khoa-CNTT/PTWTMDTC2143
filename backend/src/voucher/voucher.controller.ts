import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { VoucherService } from './voucher.service';
import { VoucherCreateDTO } from './dto/voucher-create.dto';
import { VoucherUpdateDTO } from './dto/voucher-update.dto';

@Controller('voucher')
export class VoucherController {
  constructor(private readonly voucherService: VoucherService) {}

  @Post()
  create(@Body() voucherCreateDTO: VoucherCreateDTO) {
    return this.voucherService.create(voucherCreateDTO);
  }

  @Get()
  findAll() {
    return this.voucherService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.voucherService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() voucherUpdateDTO: VoucherUpdateDTO) {
    return this.voucherService.update(id, voucherUpdateDTO);
  }

  @Patch(':id/toggle-status')
  toggle(@Param('id') id: string) {
    return this.voucherService.toggleStatus(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.voucherService.delete(id);
  }
}
