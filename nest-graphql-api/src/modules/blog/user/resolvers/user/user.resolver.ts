import { Query, Resolver, Args } from '@nestjs/graphql';
import { UserEntity } from '../../entities/user.entity';
import { UserService } from '../../services/user/user.service';
import { AuthGuard } from 'src/guard/auth.guard';
import { UseGuards, ParseIntPipe } from '@nestjs/common';
import { CurrentUser, ICurrentUserType } from 'src/decorators/current.user';
import { UserDetailVo } from './vo/user.detail.vo';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard)
  @Query(() => [UserEntity!]!, { description: '查询用户列表' })
  async userList(@CurrentUser() userInfo: ICurrentUserType): Promise<UserEntity[]> {
    console.log(userInfo, '当用户信息');
    return await this.userService.userList();
  }

  @Query(() => UserDetailVo, { description: '根据用户id查询用户信息' })
  async userDetailById(@Args('id', new ParseIntPipe()) id: number): Promise<UserDetailVo> {
    return await this.userService.userDetailById(id);
  }
}
