import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, ValidateIf } from 'class-validator';
import { Type } from 'class-transformer';

@InputType()
export class PostsCommentInputDto {
  @Field(() => Int, { nullable: false, description: '文章ID' })
  @IsNotEmpty({ message: '文章ID不能为空' })
  postId: number;

  @Field(() => String, { description: '评论内容' })
  @IsNotEmpty({ message: '评论内容不能为空' })
  comment: string;

  @Field(() => Int, { nullable: true, description: '父评论ID' })
  @Type(() => Number)
  @ValidateIf((o) => o.parentId)
  @IsOptional()
  parentId: number;
}
