import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const CurrentUser = createParamDecorator((data: string, context: ExecutionContext) => {
  const ctx = GqlExecutionContext.create(context);
  const request = ctx.getContext().req;
  if (data && request.user) {
    return request.user[data];
  } else {
    return request.user;
  }
});

/**
 * 定义当前用户的数据类型
 */
export interface ICurrentUserType {
  /**主键id */
  userId: number;
  /**用户名 */
  username?: string;
  /**当前表名 */
  table: string;
  /**redis key */
  redisTokenKey?: string;
}
