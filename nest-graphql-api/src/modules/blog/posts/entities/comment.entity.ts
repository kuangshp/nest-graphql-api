import { Field, ObjectType } from '@nestjs/graphql';
import { SharedEntity } from 'src/modules/shared/entities/shared.entity';
import { Column, Entity } from 'typeorm';

@ObjectType()
@Entity('comment')
export class CommentEntity extends SharedEntity {
  @Field({ description: '用户ID' })
  @Column({
    type: 'int',
    name: 'user_id',
    comment: '用户id',
  })
  userId: number;

  @Field({ description: '文章ID' })
  @Column({
    type: 'int',
    name: 'post_id',
    comment: '文章id',
  })
  postId: number;

  @Field({ description: '评论内容' })
  @Column({
    type: 'varchar',
    length: 500,
    name: 'comment',
    comment: '评论内容',
  })
  comment: string;

  @Field({ description: '父评论ID' })
  @Column({
    type: 'int',
    name: 'parent_id',
    default: () => 0,
    comment: '父评论ID',
  })
  parentId: number;

  @Field({ description: '评论的用户名' })
  username: string;

  @Field({ description: '评论的用户头像' })
  avatar: string;
}
