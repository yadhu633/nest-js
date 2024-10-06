import { Test, TestingModule } from '@nestjs/testing';
import { StockDetailService } from './stockdetaildocument.service';

describe('StockdetaildocumentService', () => {
  let service: StockDetailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StockDetailService],
    }).compile();

    service = module.get<StockDetailService>(StockDetailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
