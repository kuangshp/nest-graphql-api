import { Field, ID, ObjectType, Int } from '@nestjs/graphql';

@ObjectType()
export class UserDetailVo {
  @Field(() => ID!, { description: '用户ID' })
  id: number;

  @Field(() => String!, { description: '用户名' })
  username: string;

  @Field({ description: '创建时间' })
  createdAt: Date;

  @Field({ description: '更新时间' })
  updatedAt: Date;

  @Field(() => Int, { description: '文章数量' })
  postCount: number;

  @Field(() => Int, { description: '点赞数量' })
  likeCount: number;

  @Field(() => Int, { description: '收藏数量' })
  collectCount: number;

  @Field(() => Int, { description: '关注数量' })
  attentionCount: number;
}
