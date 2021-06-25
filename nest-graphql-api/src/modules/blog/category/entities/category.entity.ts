import { Field, ObjectType } from '@nestjs/graphql';
import { SharedEntity } from 'src/modules/shared/entities/shared.entity';
import { Column, Entity, Index } from 'typeorm';
@ObjectType()
@Entity('category')
export class CategoryEntity extends SharedEntity {
  @Field({ description: '分类名称' })
  @Index('category_name_unique', { unique: true })
  @Column({
    type: 'varchar',
    length: 50,
    name: 'name',
    comment: '分类名称',
  })
  name: string;
}
