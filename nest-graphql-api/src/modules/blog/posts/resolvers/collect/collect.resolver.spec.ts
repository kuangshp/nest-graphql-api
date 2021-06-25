import { Test, TestingModule } from '@nestjs/testing';
import { CollectResolver } from './collect.resolver';

describe('CollectResolver', () => {
  let resolver: CollectResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CollectResolver],
    }).compile();

    resolver = module.get<CollectResolver>(CollectResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
