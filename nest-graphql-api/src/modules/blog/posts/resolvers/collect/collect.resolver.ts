import { CollectService } from './../../services/collect/collect.service';
import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/guard/auth.guard';
import { PostsCollectInputDto } from './dto/post.collect.dto';
import { CurrentUser, ICurrentUserType } from 'src/decorators/current.user';

@UseGuards(AuthGuard)
@Resolver()
export class CollectResolver {
  constructor(private readonly collectService: CollectService) {}
  @Mutation(() => String, { description: '收藏文章' })
  async postCollect(
    @Args('data') postsCollectInputDto: PostsCollectInputDto,
    @CurrentUser() userInfo: ICurrentUserType,
  ): Promise<string> {
    return await this.collectService.postCollect(userInfo, postsCollectInputDto);
  }
}
