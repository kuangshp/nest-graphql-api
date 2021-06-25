import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, MinLength } from 'class-validator';

@InputType()
export class LoginUserInputDto {
  // nullable默认是false，不写也可以
  @Field({ nullable: false, description: '用户名' })
  @MinLength(3, { message: '用户名最小长度3字符' })
  @IsNotEmpty({ message: '用户名不能为空' })
  username: string;

  @Field({ nullable: false, description: '密码' })
  @MinLength(3, { message: '密码最小长度3字符' })
  @IsNotEmpty({ message: '密码不能为空' })
  password: string;
}
