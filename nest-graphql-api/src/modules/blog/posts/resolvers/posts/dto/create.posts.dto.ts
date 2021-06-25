import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, MaxLength } from 'class-validator';

@InputType()
export class CreatePostsInputDto {
  @Field({ nullable: false, description: '文章标题' })
  @MaxLength(45, { message: '文章标题字符长度限制为45字符' })
  @IsNotEmpty({ message: '文章标题不能为空' })
  title: string;

  @Field({ description: '文章封面图' })
  @IsNotEmpty({ message: '文章封面图不能为空' })
  imgUrl: string;

  @Field({ nullable: false, description: '文章内容' })
  @IsNotEmpty({ message: '文章内容不能为空' })
  content: string;

  @Field({ nullable: false, description: '文章分类ID' })
  @IsNotEmpty({ message: '文章分类不能为空' })
  categoryId: number;
}
