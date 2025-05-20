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
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RoleEnum } from '@prisma/client';

@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  createOrder(
    @Req() req: { user: { id: string } },
    @Body() dto: CreateOrderDTO
  ) {
    return this.orderService.create(req.user.id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  getOrders(
    @Req() req: { user: { id: string } },
    @Query('limit') limit: number = 10,
    @Query('cursor') cursor?: string
  ) {
    return this.orderService.getAll(req.user.id, limit, cursor);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleEnum.ADMIN)
  @Get('admin/all')
  getAllOrders() {
    return this.orderService.getAllOrders();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getOrder(@Req() req: { user: { id: string } }, @Param('id') id: string) {
    return this.orderService.getById(req.user.id, id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id/status')
  updateStatus(@Param('id') id: string, @Body() dto: UpdateOrderStatusDTO) {
    return this.orderService.updateStatus(id, dto);
  }
}
