import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsMobilePhone, MinLength, MaxLength } from 'class-validator';

@InputType()
export class SmsInputDto {
  @Field({ nullable: false, description: '手机号码' })
  @IsMobilePhone('zh-CN', {}, { message: '手机号码格式错误' })
  @IsNotEmpty({ message: '手机号码不能为空' })
  mobile: string;
}

@InputType()
export class CheckoutSmsInputDto {
  @Field({ nullable: false, description: '手机号码' })
  @IsMobilePhone('zh-CN', {}, { message: '手机号码格式错误' })
  @IsNotEmpty({ message: '手机号码不能为空' })
  mobile: string;

  @Field({ nullable: false, description: '短信验证码' })
  @MaxLength(4, { message: '短信验证码长度最大为4位' })
  @MinLength(4, { message: '短信验证码长度最小为4位' })
  @IsNotEmpty({ message: '短信验证码不能为空' })
  code: string;
}
