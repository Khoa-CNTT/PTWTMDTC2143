import { Injectable, InternalServerErrorException } from '@nestjs/common';
import axios from 'axios';
import { PaypalOrderResponse } from './dto/paypal.types';

@Injectable()
export class PaypalService {
  private clientId = process.env.PAYPAL_CLIENT_ID;
  private clientSecret = process.env.PAYPAL_CLIENT_SECRET;
  private baseUrl =
    process.env.PAYPAL_BASE_URL || 'https://api-m.sandbox.paypal.com'; // sandbox or live

  private async getAccessToken(): Promise<string> {
    const auth = Buffer.from(`${this.clientId}:${this.clientSecret}`).toString(
      'base64'
    );
    try {
      const res = await axios.post(
        `${this.baseUrl}/v1/oauth2/token`,
        'grant_type=client_credentials',
        {
          headers: {
            Authorization: `Basic ${auth}`,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );
      return res.data.access_token;
    } catch (err) {
      throw new InternalServerErrorException('Paypal getAccessToken failed');
    }
  }

  async createOrder(amount: string): Promise<PaypalOrderResponse> {
    const accessToken = await this.getAccessToken();
    const body = {
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: 'USD',
            value: amount,
          },
        },
      ],
      application_context: {
        return_url: 'http://localhost:5175',
        cancel_url: 'http://localhost:5175/shopping-cart',
        // return_url: process.env.PAYPAL_RETURN_URL, // ví dụ: https://yourdomain.com/paypal/success
        // cancel_url: process.env.PAYPAL_CANCEL_URL, // ví dụ: https://yourdomain.com/paypal/cancel
      },
    };

    try {
      const res = await axios.post(`${this.baseUrl}/v2/checkout/orders`, body, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });
      return res.data; // chứa id, links
    } catch (err) {
      throw new InternalServerErrorException('Paypal createOrder failed');
    }
  }

  async captureOrder(orderId: string): Promise<PaypalOrderResponse> {
    const accessToken = await this.getAccessToken();
    try {
      const res = await axios.post(
        `${this.baseUrl}/v2/checkout/orders/${orderId}/capture`,
        null,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      );
      return res.data;
    } catch (err) {
      throw new InternalServerErrorException('Paypal captureOrder failed');
    }
  }
}
