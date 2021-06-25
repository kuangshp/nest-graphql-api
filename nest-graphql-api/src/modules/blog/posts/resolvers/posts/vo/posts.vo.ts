import { ObjectType, Field } from '@nestjs/graphql';

/**文章 */
@ObjectType()
export class PostItem {
  @Field({ description: '主键ID' })
  id: number;

  @Field({ description: '创建时间' })
  createdAt: Date;

  @Field({ description: '更新时间' })
  updatedAt: Date;

  @Field({ description: '标题' })
  title: string;

  @Field({ description: '文章封面图' })
  imgUrl: string;

  @Field({ description: '文章内容' })
  content: string;

  @Field({ description: '分类ID' })
  categoryId: number;

  @Field({ description: '分类' })
  categoryName: string;

  @Field({ description: '浏览数' })
  lookCount: number;

  @Field({ description: '点赞数' })
  likeCount: number;

  @Field({ description: '收藏数' })
  collectCount: number;

  @Field({ description: '用户' })
  userName: string;

  @Field({ nullable: true, description: '是否点赞，如果返回数字就表示已经点赞' })
  isLike: number | null | undefined;

  @Field({ nullable: true, description: '是否收藏，如果返回数字就表示已经收藏' })
  isCollect: number | null | undefined;
}

/**文章列表 */
@ObjectType()
export class PostListVo {
  @Field(() => [PostItem!]!, { description: '返回的数据' })
  data: PostItem[];

  @Field(() => Number, { description: '总共多少条数' })
  total: number;
}
