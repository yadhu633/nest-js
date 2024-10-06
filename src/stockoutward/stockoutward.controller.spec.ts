import { Test, TestingModule } from '@nestjs/testing';
import { StockoutwardController } from './stockoutward.controller';
import { StockoutwardService } from './stockoutward.service';

describe('StockoutwardController', () => {
  let controller: StockoutwardController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StockoutwardController],
      providers: [StockoutwardService],
    }).compile();

    controller = module.get<StockoutwardController>(StockoutwardController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
