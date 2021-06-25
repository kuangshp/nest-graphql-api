import { ObjectType, Field } from '@nestjs/graphql';
import { SharedEntity } from 'src/modules/shared/entities/shared.entity';
import { Entity, Column } from 'typeorm';

@ObjectType()
@Entity('user_attention')
export class UserAttentionEntity extends SharedEntity {
  @Field({ description: '作者用户id' })
  @Column({
    type: 'int',
    name: 'user_id',
    comment: '作者用户id',
  })
  userId: number;

  @Field({ description: '关注者用户ID' })
  @Column({
    type: 'int',
    name: 'attention_user_id',
    comment: '关注者用户ID',
  })
  attentionUserId: number;
}
