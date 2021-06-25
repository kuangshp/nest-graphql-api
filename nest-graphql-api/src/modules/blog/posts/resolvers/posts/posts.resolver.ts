import { AuthGuard } from './../../../../../guard/auth.guard';
import { UseGuards, ParseIntPipe } from '@nestjs/common';
import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { CreatePostsInputDto } from './dto/create.posts.dto';
import { CurrentUser, ICurrentUserType } from 'src/decorators/current.user';
import { PostsService } from '../../services/posts/posts.service';
import { ModifyPostsInputDto } from './dto/modify.posts.dto';
import { PostsInputDto } from './dto/posts.dto';
import { PostListVo, PostItem } from './vo/posts.vo';
import { PostDetailInputDto } from './dto/post.detail.dto';

@Resolver()
export class PostsResolver {
  constructor(private readonly postsService: PostsService) {}

  @UseGuards(AuthGuard)
  @Mutation(() => String, { description: '创建文章' })
  async createPost(
    @CurrentUser() userInfo: ICurrentUserType,
    @Args('data') createPostsInputDto: CreatePostsInputDto,
  ): Promise<string> {
    return await this.postsService.createPost(userInfo, createPostsInputDto);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => String, { description: '根据id删除文章' })
  async deletePostById(
    @CurrentUser() userInfo: ICurrentUserType,
    @Args('id', new ParseIntPipe()) id: number,
  ): Promise<string> {
    return await this.postsService.deletePostById(id, userInfo);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => String, { description: '根据id修改文章' })
  async modifyPostById(
    @Args('id', new ParseIntPipe()) id: number,
    @Args('data') modifyPostsInputDto: ModifyPostsInputDto,
    @CurrentUser() userInfo: ICurrentUserType,
  ): Promise<string> {
    return await this.postsService.modifyPostById(id, modifyPostsInputDto, userInfo);
  }

  @Query(() => PostListVo, { description: '分页查询文章数据' })
  async postsList(
    @Args('data', { nullable: true }) postsInputDto?: PostsInputDto,
  ): Promise<PostListVo> {
    return await this.postsService.postsList(postsInputDto);
  }

  @Query(() => PostItem, { description: '根据文章ID获取文章详情' })
  async postDetail(@Args('data') postDetailInputDto: PostDetailInputDto): Promise<PostItem> {
    return await this.postsService.postDetail(postDetailInputDto);
  }
}
