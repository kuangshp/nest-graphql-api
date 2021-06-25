import { RedisUtilsService } from './../../../common/redis-utils/redis-utils.service';
import { Resolver, Query, Args } from '@nestjs/graphql';
import { SmsService } from 'src/modules/shared/services/sms/sms.service';
import { SmsInputDto, CheckoutSmsInputDto } from './dto/sms.dto';

@Resolver()
export class SmsResolver {
  constructor(
    private readonly smsService: SmsService,
    private readonly redisUtilsService: RedisUtilsService,
  ) {}

  @Query(() => String, { description: '根据手机号码获取短信验证码' })
  async codeByMobile(@Args('data') smsInputDto: SmsInputDto): Promise<string> {
    const { mobile } = smsInputDto;
    return this.smsService.codeByMobile(mobile);
  }

  @Query(() => String, { description: '验证短信验证码' })
  async checkoutCode(@Args('data') checkoutSmsInputDto: CheckoutSmsInputDto): Promise<string> {
    const { code, mobile } = checkoutSmsInputDto;
    const redisCode: string = await this.redisUtilsService.get(`${mobile}_withdraw`);
    if (Object.is(code, redisCode)) {
      return '验证码成功';
    } else {
      return '验证码错误';
    }
  }
}
