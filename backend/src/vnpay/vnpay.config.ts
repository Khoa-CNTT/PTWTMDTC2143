export const vnpayConfig = {
  vnp_TmnCode: process.env.VNPAY_TMN_CODE || 'YOUR_VNP_TMNCODE', // Using your .env key VNPAY_TMN_CODE
  vnp_HashSecret: process.env.VNPAY_HASH_SECRET || 'YOUR_VNP_HASHSECRET', // Using your .env key VNPAY_HASH_SECRET
  vnp_Url:
    process.env.VNPAY_URL ||
    'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html', // Using your .env key VNPAY_URL
  vnp_Api:
    process.env.VNP_API ||
    'https://sandbox.vnpayment.vn/merchant_webapi/api/transaction', // VNPay API for query/refund (not used in this example)
  vnp_ReturnUrl:
    process.env.VNPAY_RETURN_URL ||
    'http://localhost:3000/payment/vnpay_return', // Using VNPAY_RETURN_URL from .env
};
