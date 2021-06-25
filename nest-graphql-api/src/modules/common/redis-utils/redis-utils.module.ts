import { Global, Module } from '@nestjs/common';
import { RedisModule } from 'nestjs-redis';
import { RedisUtilsService } from './redis-utils.service';

@Global()
@Module({
  imports: [
    RedisModule.register({
      port: 6379,
      host: 'localhost',
      password: '123456',
      db: 0,
    }),
  ],
  providers: [RedisUtilsService],
  exports: [RedisUtilsService],
})
export class RedisUtilsModule {}
