import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { RedisUtilsModule } from './redis-utils/redis-utils.module';

@Module({
  imports: [AuthModule, RedisUtilsModule],
})
export class CommonModule {}
