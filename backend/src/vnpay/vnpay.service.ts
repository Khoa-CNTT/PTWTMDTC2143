import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import moment from 'moment';
import { vnpayConfig } from './vnpay.config';
import { CreatePaymentDto } from './dto/create-payment.dto';

@Injectable()
export class VnpayService {
  constructor() {}

  createPaymentUrl(createPaymentDto: CreatePaymentDto, ipAddr: string): string {
    const { amount, bankCode, language, orderDescription, orderType } =
      createPaymentDto;

    const tmnCode = vnpayConfig.vnp_TmnCode;
    const secretKey = vnpayConfig.vnp_HashSecret;
    let vnpUrl = vnpayConfig.vnp_Url;
    const returnUrl = vnpayConfig.vnp_ReturnUrl;

    const date = new Date();
    const createDate = moment(date).format('YYYYMMDDHHmmss');
    const orderId = moment(date).format('DDHHmmss');
    const locale = language || 'vn';
    const currCode = 'VND';
    const vnp_Params: Record<string, string | number> = {};

    vnp_Params['vnp_Version'] = '2.1.0';
    vnp_Params['vnp_Command'] = 'pay';
    vnp_Params['vnp_TmnCode'] = tmnCode;
    vnp_Params['vnp_Locale'] = locale;
    vnp_Params['vnp_CurrCode'] = currCode;
    vnp_Params['vnp_TxnRef'] = orderId;
    vnp_Params['vnp_OrderInfo'] = orderDescription;
    vnp_Params['vnp_OrderType'] = orderType || 'other';
    vnp_Params['vnp_Amount'] = amount * 100;
    vnp_Params['vnp_ReturnUrl'] = returnUrl;
    vnp_Params['vnp_IpAddr'] = ipAddr;
    vnp_Params['vnp_CreateDate'] = createDate;
    if (bankCode && bankCode !== '' && bankCode !== null) {
      vnp_Params['vnp_BankCode'] = bankCode;
    }

    const expireDate = moment(date).add(15, 'minutes').format('YYYYMMDDHHmmss');
    vnp_Params['vnp_ExpireDate'] = expireDate;

    const sortedParams = this.sortObject(vnp_Params);
    const signData = new URLSearchParams(sortedParams).toString();
    const hmac = crypto.createHmac('sha512', secretKey);
    const signed = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex');
    sortedParams['vnp_SecureHash'] = signed;

    vnpUrl += '?' + new URLSearchParams(sortedParams).toString();

    return vnpUrl;
  }

  private sortObject(
    obj: Record<string, string | number>
  ): Record<string, string> {
    const sorted: Record<string, string> = {};
    const keys = Object.keys(obj).map((k) => encodeURIComponent(k));
    keys.sort();

    keys.forEach((key) => {
      const originalKey = decodeURIComponent(key);
      const value = obj[originalKey];
      sorted[key] = encodeURIComponent(String(value)).replace(/%20/g, '+');
    });

    return sorted;
  }

  verifyReturnUrl(query: Record<string, string>): boolean {
    const vnp_Params = { ...query };
    const secureHash = vnp_Params['vnp_SecureHash'];
    delete vnp_Params['vnp_SecureHash'];
    delete vnp_Params['vnp_SecureHashType'];

    const signData = this.sortObject(vnp_Params);
    const signDataString = this.createQueryString(signData);

    const hmac = crypto.createHmac('sha512', vnpayConfig.vnp_HashSecret);
    const signed = hmac
      .update(Buffer.from(signDataString, 'utf-8'))
      .digest('hex');

    console.log('--- VNPay Verify Debug ---');
    console.log('signDataString:', signDataString);
    console.log('secureHash (from VNPay):', secureHash);
    console.log('signed (your backend):', signed);
    console.log('--------------------------');

    return secureHash === signed;
  }

  private createQueryString(obj: Record<string, string>): string {
    const str: string[] = [];
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        str.push(`${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`);
      }
    }
    return str.join('&');
  }
}
