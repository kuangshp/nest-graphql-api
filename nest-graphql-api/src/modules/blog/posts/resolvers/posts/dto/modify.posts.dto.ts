import { Field, InputType } from '@nestjs/graphql';
import { MaxLength, IsOptional } from 'class-validator';

@InputType()
export class ModifyPostsInputDto {
  @Field({ nullable: true, description: '文章标题' })
  @MaxLength(45, { message: '文章标题字符长度限制为45字符' })
  @IsOptional()
  title?: string;

  @Field({ description: '文章封面图' })
  @IsOptional()
  imgUrl: string;

  @Field({ nullable: true, description: '文章内容' })
  @IsOptional()
  content?: string;

  @Field({ nullable: true, description: '文章分类ID' })
  @IsOptional()
  categoryId: number;
}
