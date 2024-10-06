import { Test, TestingModule } from '@nestjs/testing';
import { StockinwardService } from './stockinward.service';

describe('StockinwardService', () => {
  let service: StockinwardService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StockinwardService],
    }).compile();

    service = module.get<StockinwardService>(StockinwardService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
