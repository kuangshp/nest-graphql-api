import { Injectable, HttpException } from '@nestjs/common';
import { ICurrentUserType } from 'src/decorators/current.user';
import { PostsLikeInputDto } from '../../resolvers/like/dto/post.like.dto';
import { getManager, EntityManager, Repository } from 'typeorm';
import { LikeEntity } from '../../entities/like.entity';
import { PostsEntity } from '../../entities/posts.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class LikeService {
  constructor(
    @InjectRepository(LikeEntity)
    private readonly likeRepository: Repository<LikeEntity>,
  ) {}
  /**
   * @Author: 水痕
   * @Date: 2021-06-12 21:12:57
   * @LastEditors: 水痕
   * @Description: 用户给文章点赞
   * @param {*}
   * @return {*}
   */
  async postLike(
    userInfo: ICurrentUserType,
    postsLikeInputDto: PostsLikeInputDto,
  ): Promise<string> {
    const { userId } = userInfo;
    const { postId } = postsLikeInputDto;
    // 1、用户点赞的时候要给文章点赞数+1
    // 2.在要like表中记录下
    return getManager()
      .transaction(async (entityManager: EntityManager) => {
        const userLike = await this.likeRepository.findOne({ where: { userId, postId } });
        if (userLike) {
          // 如果是存在就取消点赞
          await entityManager.delete<LikeEntity>(LikeEntity, { userId, postId });
          await entityManager.decrement<PostsEntity>(PostsEntity, { id: postId }, 'likeCount', 1);
          return '取消点赞';
        } else {
          // 如果不存在就点赞
          const userLike = entityManager.create<LikeEntity>(LikeEntity, { userId, postId });
          await entityManager.save(LikeEntity, userLike);
          await entityManager.increment<PostsEntity>(PostsEntity, { id: postId }, 'likeCount', 1);
          return '点赞成功';
        }
      })
      .then((result: string) => {
        return result;
      })
      .catch((e: HttpException) => {
        console.log(e);
        return '点赞失败';
      });
  }
}
