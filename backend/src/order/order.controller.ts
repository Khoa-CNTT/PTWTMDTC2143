import {
  BadRequestException,
  Body,
  Controller,
  ForbiddenException,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CalculatedOrderData, CreateOrderDTO } from './dto/order-create.dto';
import { OrderService } from './order.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UpdateOrderStatusDTO } from './dto/order-update-status.dto';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';

@UseGuards(JwtAuthGuard)
@Controller('order')
export class OrderController {
  constructor(
    private orderService: OrderService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) {}

  @Get()
  getOrders(
    @Req() req: { user: { id: string } },
    @Query('limit') limit: number = 10,
    @Query('cursor') cursor?: string
  ) {
    return this.orderService.getAll(req.user.id, limit, cursor);
  }

  @Get('admin/all')
  getAllOrders() {
    return this.orderService.getAllOrders();
  }

  @Get(':id')
  getOrder(@Req() req: { user: { id: string } }, @Param('id') id: string) {
    return this.orderService.getById(req.user.id, id);
  }

  @Patch(':id/status')
  updateStatus(@Param('id') id: string, @Body() dto: UpdateOrderStatusDTO) {
    return this.orderService.updateStatus(id, dto);
  }

  @Post('prepare-paypal')
  async preparePaypalOrder(@Req() req, @Body() dto: CreateOrderDTO) {
    console.log('preparePaypalOrder', dto);
    const userId = req.user.id;
    const { approvalUrl, paypalOrderId, calculatedData } =
      await this.orderService.preparePaypalOrder(userId, dto);

    await this.cacheManager.set(
      `paypal_order:${paypalOrderId}`,
      { ...calculatedData, userId },
      0
    );
    ``;

    return {
      approvalUrl,
      paypalOrderId,
    };
  }

  @Post('confirm-paypal')
  async confirmPaypal(@Req() req, @Body() body: { paypalOrderId: string }) {
    const userId = req.user.id;
    const { paypalOrderId } = body;

    const calculatedData = await this.cacheManager.get<
      CalculatedOrderData & { userId: string }
    >(`paypal_order:${paypalOrderId}`);
    if (!calculatedData) {
      throw new BadRequestException(
        'Dữ liệu thanh toán đã hết hạn hoặc không tồn tại'
      );
    }

    if (calculatedData.userId !== userId) {
      throw new ForbiddenException('Bạn không có quyền xác nhận đơn hàng này');
    }

    const order = await this.orderService.confirmPaypalAndCreateOrder(
      userId,
      paypalOrderId,
      calculatedData
    );

    await this.cacheManager.del(`paypal_order:${paypalOrderId}`);

    return order;
  }
}
