import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, IsInt, ValidateIf, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

@InputType()
export class PostDetailInputDto {
  @Field({ nullable: true, description: '文章id' })
  @IsInt({ message: '文章id必须是整数' })
  @Type(() => Number)
  @ValidateIf((o) => o.postId)
  @IsNotEmpty({ message: '文章id不能为空' })
  postId: number;

  @Field({ nullable: true, description: '当前登录用户id' })
  @IsInt({ message: '当前登录用户id必须是整数' })
  @Type(() => Number)
  @ValidateIf((o) => o.userId)
  @IsOptional()
  userId?: number;
}
