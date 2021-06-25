import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../../entities/user.entity';
import { RegisterUserInputDto } from '../../resolvers/register/dto/register.user.dto';

@Injectable()
export class RegisterService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}
  /**
   * @Author: 水痕
   * @Date: 2021-06-09 11:50:44
   * @LastEditors: 水痕
   * @Description: 用户注册
   * @param {RegisterUserInputDto} registerUserInputDto
   * @return {*}
   */
  async register(registerUserInputDto: RegisterUserInputDto): Promise<string> {
    const { username, password } = registerUserInputDto;
    const userInfo: UserEntity | undefined = await this.userRepository.findOne({
      where: { username },
      select: ['id'],
    });
    if (userInfo?.id) {
      throw new BadRequestException(`${username}已经存在不能重复创建`);
    }
    const user = this.userRepository.create({ username, password });
    await this.userRepository.save(user);
    return '注册成功';
  }
}
