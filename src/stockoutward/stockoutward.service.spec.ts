import { Test, TestingModule } from '@nestjs/testing';
import { StockoutwardService } from './stockoutward.service';

describe('StockoutwardService', () => {
  let service: StockoutwardService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StockoutwardService],
    }).compile();

    service = module.get<StockoutwardService>(StockoutwardService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
