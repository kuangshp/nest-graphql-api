import { Field, ObjectType } from '@nestjs/graphql';
import { SharedEntity } from 'src/modules/shared/entities/shared.entity';
import { Column, Entity, Index } from 'typeorm';

@ObjectType()
@Entity('posts')
export class PostsEntity extends SharedEntity {
  @Field({ description: '文章标题' })
  @Index('posts_title_index')
  @Column({
    type: 'varchar',
    nullable: false,
    length: 45,
    name: 'title',
    comment: '标题',
  })
  title: string;

  @Field({ description: '文章封面图' })
  @Column({
    type: 'varchar',
    nullable: true,
    length: '200',
    name: 'img_url',
    comment: '文章封面图',
  })
  imgUrl: string;

  @Field({ description: '文章内容' })
  @Column({
    type: 'text',
    nullable: true,
    name: 'content',
    comment: '内容',
  })
  content: string;

  @Field({ description: '分类ID' })
  @Column({
    type: 'int',
    name: 'category_id',
    nullable: false,
    default: () => 0,
    comment: '分类ID',
  })
  categoryId: number;

  @Field({ description: '浏览数' })
  @Column({
    type: 'int',
    name: 'look_count',
    default: () => 0,
    comment: '浏览数',
  })
  lookCount: number;

  @Field({ description: '点赞数' })
  @Column({
    type: 'int',
    name: 'like_count',
    default: () => 0,
    comment: '点赞数',
  })
  likeCount: number;

  @Field({ description: '收藏数' })
  @Column({
    type: 'int',
    name: 'collect_count',
    default: () => 0,
    comment: '收藏数',
  })
  collectCount: number;

  @Field({ description: '用户ID' })
  @Column({
    type: 'int',
    name: 'user_id',
    comment: '用户id',
  })
  userId: number;
}
