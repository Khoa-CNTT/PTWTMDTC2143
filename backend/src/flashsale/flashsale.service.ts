import {
  Injectable,
  Inject,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { PrismaService } from 'src/prisma/prisma.service';
import type { Cache } from 'cache-manager';

@Injectable()
export class FlashSaleService {
  private readonly logger = new Logger(FlashSaleService.name);
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private prisma: PrismaService
  ) {}

  async createFlashSale(data: {
    title: string;
    startDate: Date;
    endDate: Date;
    products: { variantId: string; flashPrice: number; quantity: number }[];
  }) {
    if (data.endDate <= data.startDate) {
      throw new BadRequestException('End date phải lớn hơn start date');
    }

    // Tạo flash sale mới
    const flashSale = await this.prisma.flashSale.create({
      data: {
        title: data.title,
        startDate: data.startDate,
        endDate: data.endDate,
        status: 'ACTIVE',
        products: {
          create: data.products.map((p) => ({
            variantId: p.variantId,
            flashPrice: p.flashPrice,
            quantity: p.quantity,
          })),
        },
      },
      include: {
        products: true,
      },
    });

    // Cập nhật cache flash sale
    await this.setFlashSaleCache(flashSale.id);

    return flashSale;
  }

  // Tạo hoặc cập nhật flash sale cache (giá và tồn kho) dưới dạng 1 object chung
  async setFlashSaleCache(flashSaleId: string) {
    // Lấy tất cả product trong flash sale từ DB
    const flashSaleProducts = await this.prisma.flashSaleProduct.findMany({
      where: { flashSaleId },
      select: {
        variantId: true,
        flashPrice: true,
        quantity: true,
      },
    });

    // Lấy thông tin flash sale để tính ttl
    const flashSale = await this.prisma.flashSale.findUnique({
      where: { id: flashSaleId },
      select: { endDate: true },
    });

    if (!flashSale) throw new BadRequestException('Flash sale không tồn tại');

    const endDate = new Date(flashSale.endDate);
    const ttl = Math.floor((endDate.getTime() - Date.now()) / 1000);
    this.logger.log(
      `flashSale.endDate: ${endDate.toISOString()}, now: ${new Date().toISOString()}, TTL tính được: ${ttl}s`
    );

    // Lưu giá flash sale và tồn kho vào Redis dưới key chung dạng object với TTL
    for (const p of flashSaleProducts) {
      await this.cacheManager.set(
        `flashSale:${p.variantId}`,
        {
          flashPrice: p.flashPrice,
          quantity: p.quantity,
        },
        ttl * 1000
      );

      this.logger.log(`Set cache flashSale:${p.variantId} với TTL: ${ttl}s`);
    }
  }

  // Lấy giá flash sale từ cache, nếu không có trả null
  async getFlashSalePrice(variantId: string): Promise<number | null> {
    const data = await this.cacheManager.get<{
      flashPrice: number;
      quantity: number;
    }>(`flashSale:${variantId}`);
    if (!data) return null;
    return data.flashPrice ?? null;
  }

  // Lấy tồn kho flash sale còn lại từ cache, nếu không có trả null
  async getFlashSaleStock(variantId: string): Promise<number | null> {
    const data = await this.cacheManager.get<{
      flashPrice: number;
      quantity: number;
    }>(`flashSale:${variantId}`);
    if (!data) return null;
    return data.quantity ?? null;
  }

  // Giảm tồn kho flash sale atomic
  async decrementFlashSaleStock(
    variantId: string,
    quantity: number
  ): Promise<boolean> {
    // Lấy tồn kho hiện tại từ cache
    const data = await this.cacheManager.get<{
      flashPrice: number;
      quantity: number;
    }>(`flashSale:${variantId}`);
    if (!data || data.quantity < quantity) {
      return false;
    }
    // Cập nhật lại quantity sau khi giảm
    const newQuantity = data.quantity - quantity;
    await this.cacheManager.set(`flashSale:${variantId}`, {
      flashPrice: data.flashPrice,
      quantity: newQuantity,
    });
    return true;
  }

  // Lấy giá bán thực tế: ưu tiên flash sale nếu có, không thì giá variant gốc
  async getEffectivePrice(variantId: string): Promise<number> {
    const flashPrice = await this.getFlashSalePrice(variantId);
    if (flashPrice !== null) return flashPrice;

    // Lấy giá variant gốc
    const variant = await this.prisma.variant.findUnique({
      where: { id: variantId },
      select: { price: true },
    });
    return variant?.price ?? 0;
  }

  async getFlashSales(limit: number, cursor?: string) {
    const take = limit + 1; // lấy dư 1 bản ghi để xác định nextCursor

    const flashSales = await this.prisma.flashSale.findMany({
      take,
      ...(cursor && {
        skip: 1,
        cursor: { id: cursor },
      }),
      select: {
        id: true,
        title: true,
        startDate: true,
        endDate: true,
        products: {
          select: {
            variantId: true,
            flashPrice: true,
            quantity: true,
            variant: {
              // include đầy đủ variant info
              select: {
                id: true,
                sku: true,
                price: true,
                compareAtPrice: true,
                weight: true,
                weightUnit: true,
                dimensions: true,
                description: true,
                status: true,
                createdAt: true,
                updatedAt: true,
                productId: true,
                images: {
                  select: {
                    id: true,
                    imageUrl: true,
                  },
                },
                optionValues: {
                  select: {
                    id: true,
                    optionValueId: true,
                    optionValue: {
                      select: {
                        id: true,
                        value: true,
                        option: {
                          select: {
                            id: true,
                            name: true,
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      orderBy: { id: 'asc' },
    });

    let nextCursor: string | null = null;
    if (flashSales.length > limit) {
      const next = flashSales.pop();
      nextCursor = next?.id || null;
    }

    return {
      data: flashSales,
      nextCursor,
    };
  }
}
