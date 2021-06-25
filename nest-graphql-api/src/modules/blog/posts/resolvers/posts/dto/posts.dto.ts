import { Field, InputType } from '@nestjs/graphql';
import { MaxLength, IsOptional, IsInt, ValidateIf } from 'class-validator';
import { Type } from 'class-transformer';

@InputType()
export class PostsInputDto {
  @Field({ nullable: true, description: '文章标题' })
  @MaxLength(45, { message: '文章标题字符长度限制为45字符' })
  @ValidateIf((o) => o.title)
  @IsOptional()
  title?: string;

  @Field({ nullable: true, description: '多少条数据' })
  @IsInt({ message: '一页多少条数据必须是整数' })
  @Type(() => Number)
  @ValidateIf((o) => o.pageSize)
  @IsOptional()
  pageSize?: number;

  @Field({ nullable: true, description: '当前是多少页' })
  @IsInt({ message: '当前是多少页必须是整数' })
  @Type(() => Number)
  @ValidateIf((o) => o.pageNumber)
  @IsOptional()
  pageNumber?: number;

  @Field({ nullable: true, description: '当前登录用户id' })
  @IsInt({ message: '当前登录用户id必须是整数' })
  @Type(() => Number)
  @ValidateIf((o) => o.userId)
  @IsOptional()
  userId?: number;
}
