import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CreateOrderDTO } from './dto/order-create.dto';
import { OrderService } from './order.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UpdateOrderStatusDTO } from './dto/order-update-status.dto';

@UseGuards(JwtAuthGuard)
@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}

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

  @Post('create-order')
  async createOrder(@Req() req, @Body() dto: CreateOrderDTO) {
    const userId = req.user.id;
    return this.orderService.createOrderAndPaypalOrder(userId, dto);
  }

  @Post('confirm-payment')
  async confirmPayment(
    @Req() req,
    @Body() body: { orderId: string; paypalOrderId: string }
  ) {
    const userId = req.user.id;
    return this.orderService.confirmPaypalPayment(
      userId,
      body.orderId,
      body.paypalOrderId
    );
  }
}
