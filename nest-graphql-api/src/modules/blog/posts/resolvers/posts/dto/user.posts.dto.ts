import { PostsInputDto } from './posts.dto';
import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class UserPostsInputDto extends PostsInputDto {
  @Field({ nullable: false, description: '用户ID' })
  @IsNotEmpty({ message: '用户ID不能为空' })
  userId: number;
}
