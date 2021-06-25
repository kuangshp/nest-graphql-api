import { UserAttentionEntity } from './../../entities/user.attention.entity';
import { CollectEntity } from './../../../posts/entities/collect.entity';
import { LikeEntity } from './../../../posts/entities/like.entity';
import { PostsEntity } from './../../../posts/entities/posts.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getConnection } from 'typeorm';
import { UserEntity } from '../../entities/user.entity';
import { UserDetailVo } from '../../resolvers/user/vo/user.detail.vo';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(UserAttentionEntity)
    private readonly userAttentionRepository: Repository<UserAttentionEntity>,
  ) {}

  /**
   * @Author: 水痕
   * @Date: 2021-06-09 14:19:22
   * @LastEditors: 水痕
   * @Description: 查询用户列表
   * @param {*}
   * @return {*}
   */
  async userList(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }

  /**
   * @Author: 水痕
   * @Date: 2021-06-13 19:55:45
   * @LastEditors: 水痕
   * @Description: 根据用户id查询用户数据
   * @param {*}
   * @return {*}
   */
  async userDetailById(id: number): Promise<UserDetailVo> {
    // 1.查询用户基本信息、文章总数、点赞总数、收藏总数、关注总数
    const userInfo = await this.userRepository.findOne({
      where: { id },
      select: ['id', 'username', 'createdAt', 'updatedAt'],
    });
    const postCount = await getConnection()
      .createQueryBuilder(PostsEntity, 'post')
      .where('(post.userId =:userId)')
      .setParameter('userId', id) // 另外一种传递参数的方式
      .getCount();
    const likeCount = await getConnection()
      .createQueryBuilder(LikeEntity, 'like')
      .where('like.userId =:userId')
      .setParameters({ userId: id }) // 又是一种传递参数的方式
      .getCount();
    const collectCount = await getConnection()
      .createQueryBuilder(CollectEntity, 'collect')
      .where('collect.userId =:userId', { userId: id })
      .getCount();
    const attentionCount = await this.userAttentionRepository.count({ where: { userId: id } });
    return {
      ...userInfo,
      postCount,
      likeCount,
      collectCount,
      attentionCount,
    };
  }
}
