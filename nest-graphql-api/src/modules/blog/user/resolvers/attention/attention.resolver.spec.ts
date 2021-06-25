import { Test, TestingModule } from '@nestjs/testing';
import { AttentionResolver } from './attention.resolver';

describe('AttentionResolver', () => {
  let resolver: AttentionResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AttentionResolver],
    }).compile();

    resolver = module.get<AttentionResolver>(AttentionResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
