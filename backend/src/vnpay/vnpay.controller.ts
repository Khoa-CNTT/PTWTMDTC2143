//
import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  Res,
  Ip,
  BadRequestException,
} from '@nestjs/common';
import { VnpayService } from './vnpay.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { ApiOperation, ApiTags, ApiResponse } from '@nestjs/swagger';
import { Response } from 'express';

@ApiTags('VNPay')
@Controller('payment/vnpay')
export class VnpayController {
  constructor(private readonly vnpayService: VnpayService) {}

  @Post('create_payment_url')
  @ApiOperation({ summary: 'Create VNPay Payment URL' })
  @ApiResponse({
    status: 201,
    description: 'Successfully created payment URL.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  createPaymentUrl(
    @Body() createPaymentDto: CreatePaymentDto,
    @Ip() ip: string,
    @Res() res: Response
  ) {
    const paymentUrl = this.vnpayService.createPaymentUrl(createPaymentDto, ip);
    return res.status(201).json({ paymentUrl });
  }

  @Get('return')
  @ApiOperation({ summary: 'Handle VNPay Return' })
  async handleVnpayReturn(
    @Query() query: Record<string, string>,
    @Res() res: Response
  ) {
    console.log('VNPay Return Query:', JSON.stringify(query, null, 2));

    const isValidSignature = this.vnpayService.verifyReturnUrl(query);
    if (!isValidSignature) {
      throw new BadRequestException('Invalid signature');
    }

    const vnp_ResponseCode = query.vnp_ResponseCode;
    const vnp_TxnRef = query.vnp_TxnRef;
    const vnp_TransactionNo = query.vnp_TransactionNo;
    const vnp_Amount = query.vnp_Amount;
    const vnp_BankCode = query.vnp_BankCode;
    const vnp_PayDate = query.vnp_PayDate;

    try {
      if (vnp_ResponseCode === '00') {
        console.log('Payment successful for order:', vnp_TxnRef);
        console.log('Transaction number:', vnp_TransactionNo);
        console.log('Amount:', vnp_Amount);
        console.log('Bank code:', vnp_BankCode);
        console.log('Payment date:', vnp_PayDate);

        return res.redirect(
          `http://localhost:3000/payment-success?orderId=${vnp_TxnRef}&transactionNo=${vnp_TransactionNo}`
        );
      } else {
        console.log('Payment failed for order:', vnp_TxnRef);
        console.log('Response code:', vnp_ResponseCode);

        return res.redirect(
          `http://localhost:3000/payment-failure?orderId=${vnp_TxnRef}&errorCode=${vnp_ResponseCode}`
        );
      }
    } catch (error) {
      console.error('Error processing payment return:', error);
      return res.redirect(
        `http://localhost:3000/payment-failure?orderId=${vnp_TxnRef}&error=processing`
      );
    }
  }
}
