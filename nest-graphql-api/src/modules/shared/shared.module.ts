import { TypeOrmModule } from '@nestjs/typeorm';
import { Global, Module } from '@nestjs/common';
import { ToolService } from './services/tool/tool.service';
import { SmsService } from './services/sms/sms.service';
import { InitDbService } from './services/init-db/init-db.service';
import { CategoryEntity } from '../blog/category/entities/category.entity';
import { UploadResolver } from './upload/resolvers/upload/upload.resolver';
import { UploadService } from './upload/services/upload/upload.service';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([CategoryEntity])],
  providers: [ToolService, SmsService, InitDbService, UploadResolver, UploadService],
  exports: [ToolService, SmsService],
})
export class SharedModule {}
