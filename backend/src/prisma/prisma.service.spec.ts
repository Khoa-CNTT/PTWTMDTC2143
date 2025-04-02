// filepath: d:\GraduationProject---DATN\backend\src\prisma\prisma.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from './prisma.service';

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
describe('PrismaService', () => {
  let service: PrismaService;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaService],
    }).compile();

    service = module.get<PrismaService>(PrismaService);
  });

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  it('should be defined', () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    expect(service).toBeDefined();
  });
});
