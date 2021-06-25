import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class PostsLikeInputDto {
  @Field({ nullable: false, description: '文章ID' })
  @IsNotEmpty({ message: '文章ID不能为空' })
  postId: number;
}
