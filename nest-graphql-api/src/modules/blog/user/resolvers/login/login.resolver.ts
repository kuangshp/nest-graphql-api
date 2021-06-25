import { Args, Query, Resolver } from '@nestjs/graphql';
import { LoginService } from '../../services/login/login.service';
import { LoginUserInputDto } from './dto/login.user.dto';
import { LoginVo } from './vo/login.vo';

@Resolver()
export class LoginResolver {
  constructor(private readonly loginService: LoginService) {}

  @Query(() => LoginVo, { description: '登录接口' })
  async login(@Args('data') loginUserInputDto: LoginUserInputDto): Promise<LoginVo> {
    return await this.loginService.login(loginUserInputDto);
  }
}
