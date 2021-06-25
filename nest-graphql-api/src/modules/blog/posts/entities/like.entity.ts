import { Field, ObjectType } from '@nestjs/graphql';
import { SharedEntity } from 'src/modules/shared/entities/shared.entity';
import { Column, Entity } from 'typeorm';
@ObjectType()
@Entity('like')
export class LikeEntity extends SharedEntity {
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
}
