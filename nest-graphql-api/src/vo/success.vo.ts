import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class SuccessVo {
  @Field(() => Int!, { description: '成功状态码' })
  code: number;

  @Field(() => String!, { description: '提示' })
  message: string;
}
