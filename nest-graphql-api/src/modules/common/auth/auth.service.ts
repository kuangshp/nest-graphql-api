import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ICurrentUserType } from 'src/decorators/current.user';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  /**
   * @Author: 水痕
   * @Date: 2021-06-09 13:41:38
   * @LastEditors: 水痕
   * @Description: 生成token的方法
   * @param {object} payload
   * @return {*}
   */

  public generateToken(payload: ICurrentUserType): string {
    return this.jwtService.sign({ ...payload });
  }

  /**
   * @Author: 水痕
   * @Date: 2021-06-09 13:41:45
   * @LastEditors: 水痕
   * @Description: 从token中解密出来当前用户信息
   * @param {string} token
   * @return {*}
   */

  public verifyToken(token: string): ICurrentUserType {
    try {
      return this.jwtService.verify(token);
    } catch (e) {
      throw new BadRequestException('当前token无效');
    }
  }
}
