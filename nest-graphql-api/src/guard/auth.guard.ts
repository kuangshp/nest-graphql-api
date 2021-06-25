import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { UserTokenEntity } from 'src/modules/blog/user/entities/user.token.entity';
import dayjs from 'dayjs';

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const token = ctx.getContext().req.headers.token;
    if (token) {
      try {
        // 1.从数据库查询是否存在记录
        const userInfo = await UserTokenEntity.findOne({
          where: { token },
          select: ['userId', 'username', 'mobile', 'expireTime', 'platform'],
        });
        // 2.判断当前token是否失效
        const isExpire = dayjs().diff(userInfo?.expireTime) <= 0 ? false : true;
        console.log(userInfo?.expireTime, isExpire, '===>', dayjs().diff(userInfo?.expireTime));
        if (userInfo || isExpire) {
          // 3.将数据挂载到请求头上
          ctx.getContext().req.user = userInfo;
          return true;
        } else {
          throw new UnauthorizedException(JSON.stringify({ code: 1024, message: '请重新登录' }));
        }
      } catch (e) {
        throw new UnauthorizedException(e);
      }
    } else {
      throw new UnauthorizedException(JSON.stringify({ code: 1024, message: '你无权方法该接口' }));
    }
  }
}
