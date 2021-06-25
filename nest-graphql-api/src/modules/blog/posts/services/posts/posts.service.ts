import { LikeEntity } from './../../entities/like.entity';
import { UserEntity } from './../../../user/entities/user.entity';
import { CategoryEntity } from './../../../category/entities/category.entity';
import { mapToObj } from './../../../../../utils/map';
import { ICurrentUserType } from './../../../../../decorators/current.user';
import { PostsEntity } from './../../entities/posts.entity';
import { Injectable, BadRequestException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getConnection, SelectQueryBuilder, ILike, Equal } from 'typeorm';
import { CreatePostsInputDto } from '../../resolvers/posts/dto/create.posts.dto';
import { ModifyPostsInputDto } from '../../resolvers/posts/dto/modify.posts.dto';
import { PostsInputDto } from '../../resolvers/posts/dto/posts.dto';
import { PostListVo, PostItem } from '../../resolvers/posts/vo/posts.vo';
import { CollectEntity } from '../../entities/collect.entity';
import { PostDetailInputDto } from '../../resolvers/posts/dto/post.detail.dto';

@Injectable()
export class PostsService {
  private readonly logger = new Logger(PostsService.name);
  constructor(
    @InjectRepository(PostsEntity)
    private readonly postsRepository: Repository<PostsEntity>,
  ) {}

  /**
   * @Author: 水痕
   * @Date: 2021-06-12 10:24:23
   * @LastEditors: 水痕
   * @Description: 创建文章
   * @param {*}
   * @return {*}
   */
  async createPost(
    userInfo: ICurrentUserType,
    createPostsInputDto: CreatePostsInputDto,
  ): Promise<string> {
    try {
      console.log(userInfo, '当前用户');
      const { userId } = userInfo;
      const posts = this.postsRepository.create({ ...createPostsInputDto, userId });
      await this.postsRepository.save(posts);
      return '创建成功';
    } catch (e) {
      console.log(e);
      throw new BadRequestException('创建文章失败');
    }
  }

  /**
   * @Author: 水痕
   * @Date: 2021-06-12 10:33:20
   * @LastEditors: 水痕
   * @Description: 根据id删除文章
   * @param {*}
   * @return {*}
   */
  async deletePostById(id: number, userInfo: ICurrentUserType): Promise<string> {
    // 先判断下你登录的不能去删除别人的文章
    const { userId } = userInfo;
    const isCurrentUserPost = await this.postsRepository.findOne({
      where: { id, userId },
      select: ['id'],
    });
    if (!isCurrentUserPost) {
      throw new BadRequestException('当前文章你无权删除');
    }
    // 这里使用软删除
    const {
      raw: { affectedRows },
    } = await this.postsRepository.softDelete(id);
    if (affectedRows) {
      return '删除成功';
    } else {
      return '删除失败';
    }
  }

  /**
   * @Author: 水痕
   * @Date: 2021-06-12 10:38:44
   * @LastEditors: 水痕
   * @Description: 根据id修改文字数据
   * @param {*}
   * @return {*}
   */

  async modifyPostById(
    id: number,
    modifyPostsInputDto: ModifyPostsInputDto,
    userInfo: ICurrentUserType,
  ): Promise<string> {
    const { userId } = userInfo;
    const isCurrentUserPost = await this.postsRepository.findOne({
      where: { id, userId },
      select: ['id'],
    });
    if (!isCurrentUserPost) {
      throw new BadRequestException('当前文章你无权修改');
    }
    const {
      raw: { affectedRows },
    } = await this.postsRepository.update(id, { ...modifyPostsInputDto });
    if (affectedRows) {
      return '修改成功';
    } else {
      return '修改失败';
    }
  }

  /**
   * @Author: 水痕
   * @Date: 2021-06-12 11:49:58
   * @LastEditors: 水痕
   * @Description: 分页查询文章数据
   * @param {*}
   * @return {*}
   */
  async postsList(postsInputDto: PostsInputDto): Promise<PostListVo> {
    const { pageSize = 10, pageNumber = 1, title, userId } = postsInputDto || {};
    const query = new Map();
    if (title) {
      query.set('title', ILike(`%${title}%`));
    }
    if (userId) {
      query.set('userId', Equal(userId));
    }
    const queryBuilder = this.queryPostBuilder(userId);
    const data = await queryBuilder
      .where(mapToObj(query))
      .skip((pageNumber - 1) * pageSize)
      .take(pageSize)
      .printSql()
      .getRawMany();
    const total = await getConnection()
      .createQueryBuilder(PostsEntity, 'posts')
      .where(mapToObj(query))
      .getCount();
    this.logger.log(JSON.stringify(data));
    return {
      data,
      total,
    };
  }

  /**
   * @Author: 水痕
   * @Date: 2021-06-13 12:51:40
   * @LastEditors: 水痕
   * @Description: 根据文章id获取文章列表
   * @param {*}
   * @return {*}
   */
  async postDetail(postDetailInputDto: PostDetailInputDto): Promise<PostItem> {
    const { postId, userId } = postDetailInputDto;
    const queryBuilder = this.queryPostBuilder(userId);
    return await queryBuilder
      .where('(posts.id = :id)', { id: postId })
      .printSql()
      .getRawOne();
  }

  /**
   * @Author: 水痕
   * @Date: 2021-06-13 13:50:02
   * @LastEditors: 水痕
   * @Description: 抽取公共查询部分
   * @param {*}
   * @return {*}
   */
  private queryPostBuilder(userId: number): SelectQueryBuilder<PostsEntity> {
    return (
      getConnection()
        .createQueryBuilder(PostsEntity, 'posts')
        .select('posts.id', 'id')
        .addSelect('posts.title', 'title')
        .addSelect('posts.imgUrl', 'imgUrl')
        .addSelect('posts.content', 'content')
        .addSelect('posts.categoryId', 'categoryId')
        .addSelect('posts.lookCount', 'lookCount')
        .addSelect('posts.likeCount', 'likeCount')
        .addSelect('posts.collectCount', 'collectCount')
        .addSelect('posts.createdAt', 'createdAt')
        .addSelect('posts.updatedAt', 'updatedAt')
        .addSelect(
          (qb) =>
            qb
              .select('name')
              .from(CategoryEntity, 'category')
              .where('posts.categoryId = category.id'),
          'categoryName',
        )
        .addSelect(
          (qb) =>
            qb
              .select('username')
              .from(UserEntity, 'user')
              .where('posts.userId = user.id'),
          'userName',
        )
        // 判断当前用户是否点赞，不返回null就表示当前用户点赞了
        .addSelect(
          (qb) =>
            qb
              .select('id')
              .from(LikeEntity, 'like')
              .where('like.userId =:userId and like.postId = posts.id', { userId }),
          'isLike',
        )
        .addSelect(
          (qb) =>
            qb
              .select('id')
              .from(CollectEntity, 'collect')
              .where('collect.userId =:userId and collect.postId = posts.id', { userId }),
          'isCollect',
        )
    );
  }
}
