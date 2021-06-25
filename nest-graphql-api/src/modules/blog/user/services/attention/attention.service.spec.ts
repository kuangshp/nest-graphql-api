import { Test, TestingModule } from '@nestjs/testing';
import { AttentionService } from './attention.service';

describe('AttentionService', () => {
  let service: AttentionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AttentionService],
    }).compile();

    service = module.get<AttentionService>(AttentionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
