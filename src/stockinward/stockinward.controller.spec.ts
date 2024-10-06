import { Test, TestingModule } from '@nestjs/testing';
import { StockinwardController } from './stockinward.controller';
import { StockinwardService } from './stockinward.service';

describe('StockinwardController', () => {
  let controller: StockinwardController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StockinwardController],
      providers: [StockinwardService],
    }).compile();

    controller = module.get<StockinwardController>(StockinwardController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
