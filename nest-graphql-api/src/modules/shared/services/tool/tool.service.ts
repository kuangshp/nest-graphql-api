import { Injectable } from '@nestjs/common';
import NodeAuth from 'simp-node-auth';
import * as uuidv4 from 'uuid';
@Injectable()
export class ToolService {
  private nodeAuth: NodeAuth;
  constructor() {
    this.nodeAuth = new NodeAuth();
  }

  /**
   * @Author: 水痕
   * @Date: 2021-06-10 12:58:57
   * @LastEditors: 水痕
   * @Description: 使用uuid生成token
   * @param {*}
   * @return {*}
   */

  public get uuidToken(): string {
    return uuidv4.v4().replace(/-/g, '');
  }

  /**
   * @Author: 水痕
   * @Date: 2021-06-09 11:41:47
   * @LastEditors: 水痕
   * @Description: 密码加密的方法
   * @param {string} password
   * @return {*}
   */
  makePassword(password: string): string {
    return this.nodeAuth.makePassword(password);
  }

  /**
   * @Author: 水痕
   * @Date: 2021-06-09 12:58:27
   * @LastEditors: 水痕
   * @Description: 校验密码
   * @param {string} password 未加密的密码
   * @param {string} sqlPassword 加密后的密码
   * @return {*}
   */
  checkPassword(password: string, sqlPassword: string): boolean {
    return this.nodeAuth.checkPassword(password, sqlPassword);
  }
}
