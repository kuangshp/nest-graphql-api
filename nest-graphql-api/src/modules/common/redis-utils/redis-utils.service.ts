import { Injectable } from '@nestjs/common';
import { RedisService } from 'nestjs-redis';
import { Redis } from 'ioredis';

@Injectable()
export class RedisUtilsService {
  public client: Redis;
  constructor(private redisService: RedisService) {}

  onModuleInit() {
    this.getClient();
  }

  public getClient() {
    this.client = this.redisService.getClient();
  }

  /**
   * @Author: 水痕
   * @Date: 2021-03-08 17:47:30
   * @LastEditors: 水痕
   * @Description: 定义一个给外界用的redis句柄
   * @param {*}
   * @return {*}
   */
  public get redisClient(): Redis {
    return this.redisService.getClient();
  }

  /**
   * @Author: 水痕
   * @Date: 2020-01-17 14:53:37
   * @LastEditors: 水痕
   * @Description: 封装设置redis缓存的方法
   * @param key {String} key值
   * @param value {String} key的值
   * @param second {Number} 过期时间秒
   * @return: Promise<any>
   */
  public async set(key: string, value: any, second?: number): Promise<any> {
    value = JSON.stringify(value);
    if (!second) {
      await this.client.set(key, value);
    } else {
      await this.client.set(key, value, 'EX', second);
    }
  }

  /**
   * @description: 设置自动 +1
   * @param {string} key
   * @return {*}
   */
  public async incr(key: string): Promise<any> {
    await this.client.incr(key);
  }

  /**
   * @Author: 水痕
   * @Date: 2020-01-17 14:55:14
   * @LastEditors: 水痕
   * @Description: 设置获取redis缓存中的值
   * @param key {String}
   */
  public async get(key: string): Promise<any> {
    const data = await this.client.get(key);
    if (data) {
      return JSON.parse(data);
    } else {
      return null;
    }
  }

  /**
   * @Author: 水痕
   * @Date: 2020-01-17 14:58:12
   * @LastEditors: 水痕
   * @Description: 根据key删除redis缓存数据
   * @param key {String}
   * @return:
   */
  public async del(key: string): Promise<any> {
    await this.client.del(key);
  }

  /**
   * @Author: 水痕
   * @Date: 2020-01-17 15:49:34
   * @LastEditors: 水痕
   * @Description: 清空redis的缓存
   * @param {type}
   * @return:
   */
  public async flushall(): Promise<any> {
    await this.client.flushall();
  }
}
