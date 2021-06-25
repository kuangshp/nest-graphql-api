import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class AttentionListVo {
  @Field({ description: '作者用户id' })
  userId: number;

  @Field({ description: '作者用户名' })
  username: string;

  @Field({ description: '作者头像' })
  avatar: string;
}
