import { Test, TestingModule } from '@nestjs/testing';
import { StockDetailController } from './stockdetaildocument.controller';
import { StockDetailService } from './stockdetaildocument.service';

describe('StockdetaildocumentController', () => {
  let controller: StockDetailController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StockDetailController],
      providers: [StockDetailService],
    }).compile();

    controller = module.get<StockDetailController>(StockDetailController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
