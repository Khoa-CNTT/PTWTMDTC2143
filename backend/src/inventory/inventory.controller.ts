import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { InventoryCreateDTO } from './dto/inventory-create.dto';
import { InventoryUpdateDTO } from './dto/inventory-update.dto';
import { CheckStockDTO } from './dto/check-stock.dto';
import { InventoryService } from './inventory.service';

@Controller('inventory')
export class InventoryController {
  constructor(private inventoryService: InventoryService) {}

  @Post()
  async addProductToWarehouse(@Body() inventoryCreateDTO: InventoryCreateDTO) {
    return await this.inventoryService.addProductToWarehouse(
      inventoryCreateDTO
    );
  }

  @Put()
  async updateInventoryQuantity(
    @Body() inventoryUpdateDTO: InventoryUpdateDTO
  ) {
    return await this.inventoryService.updateInventoryQuantity(
      inventoryUpdateDTO
    );
  }

  @Post('check-stock')
  async checkStockAvailability(@Body() checkStockDto: CheckStockDTO) {
    return await this.inventoryService.checkStockAvailability(checkStockDto);
  }

  @Get('variant/:variantId')
  async getInventoryByVariant(@Param('variantId') variantId: string) {
    return await this.inventoryService.getInventoryByVariant(variantId);
  }
}
