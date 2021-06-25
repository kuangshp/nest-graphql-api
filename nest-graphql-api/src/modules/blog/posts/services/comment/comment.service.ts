import { UserEntity } from './../../../user/entities/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentEntity } from '../../entities/comment.entity';
import { Repository, getConnection } from 'typeorm';
import { ICurrentUserType } from 'src/decorators/current.user';
import { PostsCommentInputDto } from '../../resolvers/comment/dto/post.comment.dto';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentEntity)
    private readonly commentRepository: Repository<CommentEntity>,
  ) {}
  /**
   * @Author: 水痕
   * @Date: 2021-06-13 12:33:17
   * @LastEditors: 水痕
   * @Description: 文章的评论
   * @param {*}
   * @return {*}
   */

  async postComment(
    userInfo: ICurrentUserType,
    postsCommentInputDto: PostsCommentInputDto,
  ): Promise<string> {
    console.log(userInfo, postsCommentInputDto);
    const result = this.commentRepository.create({
      ...postsCommentInputDto,
      userId: userInfo.userId,
    });
    await this.commentRepository.save(result);
    return '评论成功';
  }

  /**
   * @Author: 水痕
   * @Date: 2021-06-13 19:26:58
   * @LastEditors: 水痕
   * @Description: 获取评论列表
   * @param {*}
   * @return {*}
   */
  async commentList(
    commentInputDto: Omit<PostsCommentInputDto, 'comment'>,
  ): Promise<CommentEntity[]> {
    const { postId, parentId } = commentInputDto;
    const result = await getConnection()
      .createQueryBuilder(CommentEntity, 'comment')
      .select('comment.id', 'id')
      .addSelect('comment.userId', 'userId')
      .addSelect('comment.postId', 'postId')
      .addSelect('comment.comment', 'comment')
      .addSelect('comment.parentId', 'parentId')
      .addSelect('comment.createdAt', 'createdAt')
      .addSelect('comment.updatedAt', 'updatedAt')
      .leftJoinAndMapOne(
        'xx',
        (qb) => qb.select(['username', 'avatar', 'id']).from(UserEntity, 'user'),
        'user',
        'user.id = comment.userId',
      )
      .where('(comment.postId =:postId and comment.parentId =:parentId)', { postId, parentId })
      .getRawMany();
    return result;
  }
}
