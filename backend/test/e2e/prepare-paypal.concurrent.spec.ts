import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, HttpStatus } from '@nestjs/common';
import request from 'supertest';
import { PaypalService } from '../../src/paypal/paypal.service';
import { AppModule } from '../../src/app.module';
describe('Order Paypal E2E - 4 users spam confirm', () => {
  let app: INestApplication;

  // Mock PaypalService
  const mockPaypalService = {
    captureOrder: async (orderId: string) => ({
      id: orderId,
      status: 'COMPLETED',
      payer: {
        email_address: 'test-user@example.com',
        payer_id: 'TESTPAYER123',
      },
      purchase_units: [
        {
          payments: {
            captures: [
              {
                id: 'FAKE_CAPTURE_ID',
                status: 'COMPLETED',
                amount: {
                  currency_code: 'USD',
                  value: '100.00',
                },
              },
            ],
          },
        },
      ],
    }),
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(PaypalService)
      .useValue(mockPaypalService)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  // 4 user token khác nhau, chỉnh theo token của bạn
  const userTokens = [
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImY5ODQ1MzNmLWZiYzMtNGU1NC05ODc3LWIzYzdmMTMyYTM5ZiIsIm5hbWUiOiJhbmh0aG8iLCJyb2xlcyI6WyJVU0VSIl0sImlhdCI6MTc0Nzk5MDk1OSwiZXhwIjoxNzQ4NTk1NzU5fQ.fB9vqKkGiIk0HZF5Ucl_QnbPpa0MCtKKzVXB7V62tjE',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNhOWFkODczLTk5MWQtNGZiZS1iNDMwLWE2ZDg1ZTU2NzQ3MyIsIm5hbWUiOiJhbmh0aG8iLCJyb2xlcyI6WyJVU0VSIl0sImlhdCI6MTc0Nzk5MTAyMywiZXhwIjoxNzQ4NTk1ODIzfQ.o4ukIHveIl4uiyylLjLJWunJT4e5jGfxfeAvYt7yofw',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImQ0ZTU5NzdjLTVmMDgtNGE2YS04MmZhLWVkZDMwM2RkYTQ1MCIsIm5hbWUiOiJhbmh0aG8iLCJyb2xlcyI6WyJVU0VSIl0sImlhdCI6MTc0Nzk5MTA0NiwiZXhwIjoxNzQ4NTk1ODQ2fQ.UAIWeB_tlbaBznO41KFxzmqBw4DqtxtAj4DWq13w1Ws',
  ];

  const testVariantId = '9d6b3d0f-b62c-4c7e-a1df-3263a303df43';

  const createOrderPayload = {
    fullName: 'Nguyen Van A',
    phone: '+84987654321',
    streetAddress: '123 Đường ABC',
    ward: 'Phường 1',
    district: 'Quận 1',
    city: 'Hồ Chí Minh',
    province: 'Hồ Chí Minh',
    country: 'Vietnam',
    items: [
      {
        variantId: testVariantId,
        quantity: 1,
      },
    ],
  };

  it('should allow each user to confirm once, other attempts fail', async () => {
    // Lưu kết quả toàn bộ user
    const allUserResults = [];

    for (const userToken of userTokens) {
      // 1. Prepare Paypal order cho từng user
      const prepareRes = await request(app.getHttpServer())
        .post('/order/prepare-paypal')
        .set('Authorization', `Bearer ${userToken}`)
        .send(createOrderPayload)
        .expect(HttpStatus.CREATED);

      expect(prepareRes.body).toHaveProperty('paypalOrderId');
      const paypalOrderId = prepareRes.body.paypalOrderId;

      // 2. Gửi đồng thời 5 request confirm cho user đó
      const confirmRequests = Array(5)
        .fill(null)
        .map(() =>
          request(app.getHttpServer())
            .post('/order/confirm-paypal')
            .set('Authorization', `Bearer ${userToken}`)
            .send({ paypalOrderId })
        );

      const results = await Promise.all(confirmRequests);

      allUserResults.push({ userToken, results });
    }

    // 3. Kiểm tra kết quả từng user
    for (const { userToken, results } of allUserResults) {
      const successCount = results.filter(
        (r) => r.status === HttpStatus.CREATED
      ).length;
      const failCount = results.length - successCount;

      console.log(
        `User ${userToken}: success=${successCount}, fail=${failCount}`
      );

      expect(successCount).toBe(1);
      expect(failCount).toBe(4);
    }
  }, 60000);
});
