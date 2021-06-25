import { Test, TestingModule } from '@nestjs/testing';
import { UploadResolver } from './upload.resolver';

describe('UploadResolver', () => {
  let resolver: UploadResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UploadResolver],
    }).compile();

    resolver = module.get<UploadResolver>(UploadResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
