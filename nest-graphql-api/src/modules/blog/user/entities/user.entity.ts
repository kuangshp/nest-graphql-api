import { Field, ObjectType } from '@nestjs/graphql';
import { SharedEntity } from 'src/modules/shared/entities/shared.entity';
import { BeforeInsert, BeforeUpdate, Column, Entity, Index } from 'typeorm';
import { Exclude } from 'class-transformer';
import NodeAuth from 'simp-node-auth';
@ObjectType()
@Entity('user')
export class UserEntity extends SharedEntity {
  @Exclude()
  private nodeAuth: NodeAuth;
  constructor() {
    super();
    this.nodeAuth = new NodeAuth();
  }

  @Field({ description: '用户名' })
  @Index('username_unique', { unique: true })
  @Column({
    type: 'varchar',
    nullable: false,
    length: 45,
    unique: true,
    name: 'username',
    comment: '用户名',
  })
  username: string;

  @Column({
    type: 'varchar',
    nullable: false,
    length: 100,
    name: 'password',
    comment: '密码',
  })
  password: string;

  @Field({ nullable: false, description: '手机号码' })
  @Index('mobile_unique', { unique: true })
  @Column({
    type: 'varchar',
    nullable: true,
    length: 11,
    unique: true,
    name: 'mobile',
    comment: '手机号码',
  })
  mobile: string;

  @Field({ description: '用户头像' })
  @Column({
    type: 'varchar',
    length: 200,
    nullable: true,
    name: 'avatar',
    comment: '用户头像',
  })
  avatar: string;

  @BeforeInsert()
  @BeforeUpdate()
  makePassword() {
    if (this.password) {
      this.password = this.nodeAuth.makePassword(this.password);
    }
  }
}
