import { CommentEntity } from './../../entities/comment.entity';
import { CommentService } from './../../services/comment/comment.service';
import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/guard/auth.guard';
import { PostsCommentInputDto } from './dto/post.comment.dto';
import { CurrentUser, ICurrentUserType } from 'src/decorators/current.user';
import { CommentInputDto } from './dto/comment.dto';

@Resolver()
export class CommentResolver {
  constructor(private readonly commentService: CommentService) {}

  @UseGuards(AuthGuard)
  @Mutation(() => String, { description: '文章的评论' })
  async postComment(
    @Args('data') postsCommentInputDto: PostsCommentInputDto,
    @CurrentUser() userInfo: ICurrentUserType,
  ): Promise<string> {
    return await this.commentService.postComment(userInfo, postsCommentInputDto);
  }

  @Query(() => [CommentEntity!]!, { description: '根据文章id和父评论来获取子评论' })
  async commentList(
    @Args('data') commentInputDto: CommentInputDto, //Omit<PostsCommentInputDto, 'comment'>
  ): Promise<CommentEntity[]> {
    return await this.commentService.commentList(commentInputDto);
  }
}
