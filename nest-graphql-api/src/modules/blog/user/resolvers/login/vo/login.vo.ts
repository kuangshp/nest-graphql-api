import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class LoginVo {
  @Field(() => ID!, { description: '用户ID' })
  id: number;

  @Field(() => String!, { description: '用户名' })
  username: string;

  // 扩展一个字段
  @Field(() => String!, { nullable: true, description: '登录token' })
  token: string;
}
