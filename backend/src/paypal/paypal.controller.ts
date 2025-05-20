// src/paypal/paypal.controller.ts
import { Controller, Post, Body, Param } from '@nestjs/common';
import { PaypalService } from './paypal.service';

@Controller('paypal')
export class PaypalController {
  constructor(private readonly paypalService: PaypalService) {}

  @Post('create-order')
  async create(@Body('amount') amount: string) {
    return this.paypalService.createOrder(amount);
  }

  @Post('capture-order/:orderId')
  async capture(@Param('orderId') orderId: string) {
    return this.paypalService.captureOrder(orderId);
  }
}
