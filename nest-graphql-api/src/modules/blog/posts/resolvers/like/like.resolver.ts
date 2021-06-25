import { LikeService } from './../../services/like/like.service';
import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/guard/auth.guard';
import { PostsLikeInputDto } from './dto/post.like.dto';
import { CurrentUser, ICurrentUserType } from 'src/decorators/current.user';

@UseGuards(AuthGuard)
@Resolver()
export class LikeResolver {
  constructor(private readonly likeService: LikeService) {}

  @Mutation(() => String, { description: '给文章点赞' })
  async postLike(
    @Args('data') postsLikeInputDto: PostsLikeInputDto,
    @CurrentUser() userInfo: ICurrentUserType,
  ): Promise<string> {
    return await this.likeService.postLike(userInfo, postsLikeInputDto);
  }
}
