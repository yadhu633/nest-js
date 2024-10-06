import { Test, TestingModule } from '@nestjs/testing';
import { ReguserService } from './reguser.service';

describe('ReguserService', () => {
  let service: ReguserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReguserService],
    }).compile();

    service = module.get<ReguserService>(ReguserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
