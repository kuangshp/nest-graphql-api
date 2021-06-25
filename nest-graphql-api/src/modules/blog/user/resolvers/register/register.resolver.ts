import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { RegisterService } from '../../services/register/register.service';
import { RegisterUserInputDto } from './dto/register.user.dto';

@Resolver()
export class RegisterResolver {
  constructor(private readonly registerService: RegisterService) {}
  @Mutation(() => String, { nullable: false, description: '用户注册' })
  async register(@Args('data') registerUserInputDto: RegisterUserInputDto): Promise<string> {
    console.log('提交的数据', registerUserInputDto);
    return await this.registerService.register(registerUserInputDto);
  }
}
