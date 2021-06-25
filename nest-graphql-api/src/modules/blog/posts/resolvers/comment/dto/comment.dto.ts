import { InputType, Field, Int } from '@nestjs/graphql';
import { IsNotEmpty, ValidateIf, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

@InputType()
export class CommentInputDto {
  @Field(() => Int, { nullable: false, description: '文章ID' })
  @IsNotEmpty({ message: '文章ID不能为空' })
  postId: number;

  @Field(() => Int, { nullable: true, description: '父评论ID' })
  @Type(() => Number)
  @ValidateIf((o) => o.parentId)
  @IsOptional()
  parentId: number;
}
