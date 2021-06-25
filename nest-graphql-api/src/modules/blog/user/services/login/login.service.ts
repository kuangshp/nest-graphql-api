import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ToolService } from 'src/modules/shared/services/tool/tool.service';
import { Repository } from 'typeorm';
import { UserEntity } from '../../entities/user.entity';
import { UserTokenEntity } from '../../entities/user.token.entity';
import { LoginUserInputDto } from '../../resolvers/login/dto/login.user.dto';
import { LoginVo } from '../../resolvers/login/vo/login.vo';
import dayjs from 'dayjs';
import { ConfigService, InjectConfig } from 'nestjs-config';
import { RedisUtilsService } from 'src/modules/common/redis-utils/redis-utils.service';

@Injectable()
export class LoginService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(UserTokenEntity)
    private readonly userTokenRepository: Repository<UserTokenEntity>,
    private readonly toolService: ToolService,
    private readonly redisUtilsService: RedisUtilsService,
    @InjectConfig()
    private readonly configService: ConfigService,
  ) {}

  /**
   * @Author: 水痕
   * @Date: 2021-06-09 12:28:33
   * @LastEditors: 水痕
   * @Description: 根据账号和密码登录
   * @param {LoginUserInputDto} loginUserInputDto
   * @return {*}
   */
  async login(loginUserInputDto: LoginUserInputDto): Promise<LoginVo> {
    const { username, password } = loginUserInputDto;
    const userInfo: UserEntity | undefined = await this.userRepository.findOne({
      where: { username },
      select: ['id', 'username', 'password', 'mobile'],
    });
    await this.checkUserLock(userInfo.id);
    if (this.toolService.checkPassword(password, userInfo?.password)) {
      const { id, username, mobile } = userInfo;
      // 1.生成token
      const token: string = this.toolService.uuidToken;
      // 2.判断当前用户id是否在token表中
      const userToken: UserTokenEntity | undefined = await this.userTokenRepository.findOne({
        where: { id, platform: 'front' },
        select: ['id'],
      });
      const tokenTable = {
        userId: id,
        token,
        username,
        mobile,
        platform: 'front',
        expireTime: dayjs()
          .add(1, 'day')
          .format('YYYY-MM-DD HH:mm:ss'),
      };
      if (userToken) {
        // 可能用户修改了资料，这里就重新保存下
        await this.userTokenRepository.update(id, tokenTable);
      } else {
        const tokenSaveResult = this.userTokenRepository.create(tokenTable);
        await this.userTokenRepository.save(tokenSaveResult);
      }
      return {
        id,
        username,
        token,
      };
    } else {
      await this.loginError(userInfo.id);
      throw new BadRequestException('账号或密码错误');
    }
  }

  /**
   * @Author: 水痕
   * @Date: 2021-06-10 17:07:26
   * @LastEditors: 水痕
   * @Description: 用户登录错误的时候使用redis计数
   * @param {UserEntity} userInf
   * @return {*}
   */
  private async loginError(userId: number): Promise<void> {
    const [redisKey, loginLockTime] = this.redisLoginLockConfig(userId);
    const redisCount = await this.redisUtilsService.get(redisKey);
    if (redisCount) {
      await this.redisUtilsService.redisClient.incr(redisKey);
    } else {
      await this.redisUtilsService.set(redisKey, 1, loginLockTime);
    }
  }

  /**
   * @Author: 水痕
   * @Date: 2021-06-10 17:25:53
   * @LastEditors: 水痕
   * @Description: 校验redis的计数是否超过预算
   * @param {number} userId
   * @return {*}
   */

  private async checkUserLock(userId: number): Promise<void> {
    // loginLockTime这个变量,在这理没使用到，但是在tsconfig.json中配置了noUnusedParameters:true,就必须要用下
    // 如果不想使用可以noUnusedParameters:false，然后用 _来占位
    const [redisKey, loginLockTime, loginLockCount] = this.redisLoginLockConfig(userId);
    console.log(loginLockTime);
    const redisCount = await this.redisUtilsService.get(redisKey);
    if (redisCount >= loginLockCount) {
      throw new BadRequestException('你输入密码错误次数太多，请30分钟后再尝试');
    }
  }

  /**
   * @Author: 水痕
   * @Date: 2021-06-10 17:25:39
   * @LastEditors: 水痕
   * @Description: 定义redis的配置,这里也可以返回一个对象，仅仅是演示使用元祖
   * @param {number} userId
   * @return {*}
   */

  private redisLoginLockConfig(userId: number): [string, number, number] {
    const loginLockPrefix: string = this.configService.get('redis.loginLockPrefix');
    const loginLockTime: number = this.configService.get('redis.loginLockTime');
    const redisKey: string = `${loginLockPrefix}_${userId}`;
    const loginLockCount: number = this.configService.get('redis.loginLockCount');
    return [redisKey, loginLockTime, loginLockCount];
  }
}
