import { Test, TestingModule } from '@nestjs/testing';
import { SmsResolver } from './sms.resolver';

describe('SmsResolver', () => {
  let resolver: SmsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SmsResolver],
    }).compile();

    resolver = module.get<SmsResolver>(SmsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
