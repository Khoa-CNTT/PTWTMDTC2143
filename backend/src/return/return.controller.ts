import {
  Controller,
  Post,
  Body,
  Param,
  Get,
  Patch,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ReturnService } from './return.service';
import { Request } from 'express';
import { ReturnStatus } from '@prisma/client'; // enum ReturnStatus
import { CreateReturnDTO } from './dto/create-return.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('returns')
export class ReturnController {
  constructor(private readonly returnService: ReturnService) {}

  @Post('order/:orderId')
  async createReturn(
    @Req() req: Request & { user: { id: string } },
    @Param('orderId') orderId: string,
    @Body() dto: CreateReturnDTO
  ) {
    const userId = req.user.id;
    return this.returnService.createReturn(userId, orderId, dto);
  }

  @Get()
  async getMyReturns(@Req() req: Request & { user: { id: string } }) {
    const userId = req.user.id;
    return this.returnService.getReturnsByUser(userId);
  }

  @Get(':id')
  async getReturn(
    @Req() req: Request & { user: { id: string } },
    @Param('id') id: string
  ) {
    const userId = req.user.id;
    return this.returnService.getReturnById(userId, id);
  }

  @Patch(':id/status')
  async updateStatus(
    @Param('id') id: string,
    @Body('status') status: ReturnStatus
  ) {
    return this.returnService.updateReturnStatus(id, status);
  }
}
