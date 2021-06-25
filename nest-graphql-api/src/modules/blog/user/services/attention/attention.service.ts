import { UserEntity } from './../../entities/user.entity';
import { Repository, getConnection } from 'typeorm';
import { UserAttentionEntity } from './../../entities/user.attention.entity';
import { ICurrentUserType } from './../../../../../decorators/current.user';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AttentionListVo } from '../../resolvers/attention/vo/attention.vo';

@Injectable()
export class AttentionService {
  constructor(
    @InjectRepository(UserAttentionEntity)
    private readonly userAttentionRepository: Repository<UserAttentionEntity>,
  ) {}
  /**
   * @Author: 水痕
   * @Date: 2021-06-14 07:45:52
   * @LastEditors: 水痕
   * @Description: 关注作者
   * @param {*}
   * @return {*}
   */
  async attention(postId: number, userInfo: ICurrentUserType): Promise<string> {
    const { userId } = userInfo;
    const isAttention = await this.userAttentionRepository.findOne({
      where: { userId: postId, attentionUserId: userId },
      select: ['id'],
    });
    if (isAttention) {
      const {
        raw: { affectedRows },
      } = await this.userAttentionRepository.delete({ userId: postId, attentionUserId: userId });
      if (affectedRows) {
        return '取消关注';
      } else {
        return '取消关注失败';
      }
    } else {
      const result = this.userAttentionRepository.create({
        userId: postId,
        attentionUserId: userId,
      });
      await this.userAttentionRepository.save(result);
      return '关注成功';
    }
  }

  /**
   * @Author: 水痕
   * @Date: 2021-06-14 07:57:22
   * @LastEditors: 水痕
   * @Description: 获取作者的关注列表
   * @param {*}
   * @return {*}
   */

  async attentionListByUserId(userId: number): Promise<AttentionListVo[]> {
    return await getConnection()
      .createQueryBuilder(UserAttentionEntity, 'attention')
      .leftJoinAndMapOne(
        'xx',
        (qb) =>
          qb
            .select('id', 'userId')
            .addSelect('username', 'username')
            .addSelect('avatar', 'avatar')
            .from(UserEntity, 'user'),
        'user',
        'attention.attentionUserId = user.userId',
      )
      .where('(attention.userId = :userId)', { userId })
      .getRawMany();
  }
}
