import { Module } from '@nestjs/common';
import { SharedModule } from './shared/shared.module';
import { CommonModule } from './common/common.module';
import { BlogModule } from './blog/blog.module';

@Module({
  imports: [SharedModule, CommonModule, BlogModule],
})
export class ModulesModule {}
