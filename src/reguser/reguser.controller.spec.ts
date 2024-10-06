import { Test, TestingModule } from '@nestjs/testing';
import { ReguserController } from './reguser.controller';
import { ReguserService } from './reguser.service';

describe('ReguserController', () => {
  let controller: ReguserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReguserController],
      providers: [ReguserService],
    }).compile();

    controller = module.get<ReguserController>(ReguserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
