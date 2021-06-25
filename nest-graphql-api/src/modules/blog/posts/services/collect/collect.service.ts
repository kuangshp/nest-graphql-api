import { Injectable, HttpException } from '@nestjs/common';
import { ICurrentUserType } from 'src/decorators/current.user';
import { PostsCollectInputDto } from '../../resolvers/collect/dto/post.collect.dto';
import { getManager, EntityManager, Repository } from 'typeorm';
import { CollectEntity } from '../../entities/collect.entity';
import { PostsEntity } from '../../entities/posts.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CollectService {
  constructor(
    @InjectRepository(CollectEntity)
    private readonly collectRepository: Repository<CollectEntity>,
  ) {}
  /**
   * @Author: 水痕
   * @Date: 2021-06-13 10:36:14
   * @LastEditors: 水痕
   * @Description: 文章的收藏
   * @param {*}
   * @return {*}
   */

  async postCollect(
    userInfo: ICurrentUserType,
    postsCollectInputDto: PostsCollectInputDto,
  ): Promise<string> {
    const { userId } = userInfo;
    const { postId } = postsCollectInputDto;
    // 1、用户点赞的时候要给文章收藏+1
    // 2.在要collect表中记录下
    return getManager()
      .transaction(async (entityManager: EntityManager) => {
        const userCollect = await this.collectRepository.findOne({ where: { userId, postId } });
        if (userCollect) {
          // 如果是存在就取消收藏
          await entityManager.delete<CollectEntity>(CollectEntity, { userId, postId });
          await entityManager.decrement<PostsEntity>(
            PostsEntity,
            { id: postId },
            'collectCount',
            1,
          );
          return '取消收藏';
        } else {
          // 如果不存在就收藏
          const userCollect = entityManager.create<CollectEntity>(CollectEntity, {
            userId,
            postId,
          });
          await entityManager.save(CollectEntity, userCollect);
          await entityManager.increment<PostsEntity>(
            PostsEntity,
            { id: postId },
            'collectCount',
            1,
          );
          return '收藏成功';
        }
      })
      .then((result: string) => {
        return result;
      })
      .catch((e: HttpException) => {
        console.log(e);
        return '收藏失败';
      });
  }
}
