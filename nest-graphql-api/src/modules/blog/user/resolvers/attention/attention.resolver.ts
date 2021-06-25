import { ICurrentUserType } from './../../../../../decorators/current.user';
import { UseGuards, ParseIntPipe } from '@nestjs/common';
import { AttentionService } from './../../services/attention/attention.service';
import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthGuard } from 'src/guard/auth.guard';
import { CurrentUser } from 'src/decorators/current.user';
import { AttentionListVo } from './vo/attention.vo';

@Resolver()
export class AttentionResolver {
  constructor(private readonly attentionService: AttentionService) {}

  @UseGuards(AuthGuard)
  @Mutation(() => String, { description: '关注作者' })
  async attention(
    @Args('postId', new ParseIntPipe()) postId: number,
    @CurrentUser() userInfo: ICurrentUserType,
  ): Promise<string> {
    return await this.attentionService.attention(postId, userInfo);
  }

  @Mutation(() => [AttentionListVo!]!, { description: '获取作者的关注列表' })
  async attentionListByUserId(
    @Args('userId', new ParseIntPipe()) userId: number,
  ): Promise<AttentionListVo[]> {
    return await this.attentionService.attentionListByUserId(userId);
  }
}
