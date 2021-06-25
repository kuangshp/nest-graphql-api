import { Injectable, BadRequestException } from '@nestjs/common';
import { RedisUtilsService } from 'src/modules/common/redis-utils/redis-utils.service';
import { InjectConfig, ConfigService } from 'nestjs-config';
import { getRandomNum } from 'src/utils';

@Injectable()
export class SmsService {
  constructor(
    private readonly redisUtilsService: RedisUtilsService,
    @InjectConfig()
    private readonly configService: ConfigService,
  ) {}
  /**
   * @Author: 水痕
   * @Date: 2021-06-12 09:18:57
   * @LastEditors: 水痕
   * @Description: 发送手机验证吗
   * @param {*}
   * @return {*}
   */

  async codeByMobile(mobile: string): Promise<string> {
    try {
      await this.smsLimit(mobile);
      // 模拟发送短信验证码，其实对接第三方的时候需要自己配置模板
      const code = getRandomNum();
      const smsTemplate: string = `【xx公司】:你提现短信验证码是:${code}，请在5分钟内使用`;
      this.redisUtilsService.set(`${mobile}_withdraw`, code, 5 * 60);
      // 调用第三方短信接口,自己处理
      console.log(smsTemplate);
      // 将本次验证吗存储到redis中
      return '短信发送成功';
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  /**
   * @Author: 水痕
   * @Date: 2021-06-12 09:26:38
   * @LastEditors: 水痕
   * @Description: 限制短信条数,防止盗刷短信
   * @param {*}
   * @return {*}
   */

  private async smsLimit(mobile: string): Promise<void> {
    // 短信白名单
    const whiteMobileList = this.configService.get('sms.whiteMobileList');
    // 一分钟发送的短信数量 2条
    const minuteSmsNumber = this.configService.get('sms.minuteSmsNumber');
    // 一小时发送的条数 5条
    const hourSmsNumber = this.configService.get('sms.hourSmsNumber');
    // 一天发送的条数 20条
    const daySmsNumber = this.configService.get('sms.daySmsNumber');
    // (现在限制是一分钟2条，一小时5条，一天二十条，同一个手机号)
    if (!whiteMobileList.includes(mobile)) {
      const minuteRedisKey = `${mobile}_redis_minute`;
      const hourRedisKey = `${mobile}_redis_hour`;
      const dayRedisKey = `${mobile}_redis_day`;
      const minuteRedisSmsNumber = await this.redisUtilsService.get(minuteRedisKey);
      const hourRedisSmsNumber = await this.redisUtilsService.get(hourRedisKey);
      const dayRedisSmsNumber = await this.redisUtilsService.get(dayRedisKey);
      console.log(minuteRedisSmsNumber, 'redis数据', minuteSmsNumber);
      if (minuteRedisSmsNumber && Number(minuteRedisSmsNumber) >= Number(minuteSmsNumber)) {
        throw new BadRequestException('一分钟只能发送2条短信');
      }
      if (hourRedisSmsNumber && Number(hourRedisSmsNumber) >= Number(hourSmsNumber)) {
        throw new BadRequestException('一个小时内只能发送5条短信');
      }
      if (dayRedisSmsNumber && Number(dayRedisSmsNumber) >= Number(daySmsNumber)) {
        throw new BadRequestException('一天内只能发送20条短信');
      }
      // 设置短信 +1
      if (minuteRedisSmsNumber) {
        // 如果已经存在就+1，不存在就设置
        await this.redisUtilsService.incr(minuteRedisKey);
      } else {
        await this.redisUtilsService.set(minuteRedisKey, 1, 60); // 一分钟
      }
      if (hourRedisSmsNumber) {
        await this.redisUtilsService.incr(hourRedisKey);
      } else {
        await this.redisUtilsService.set(hourRedisKey, 1, 60 * 60); // 一小时
      }
      if (dayRedisSmsNumber) {
        await this.redisUtilsService.incr(dayRedisKey);
      } else {
        await this.redisUtilsService.set(dayRedisKey, 1, 24 * 60 * 60); // 一天
      }
    }
  }
}
