import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { UploadService } from '../../services/upload/upload.service';
import { GraphQLUpload, FileUpload } from 'graphql-upload';

@Resolver()
export class UploadResolver {
  constructor(private readonly uploadService: UploadService) {}

  @Mutation(() => String, { description: '上传图片' })
  async fileUpload(
    @Args({ name: 'file', type: () => GraphQLUpload }) file: FileUpload,
  ): Promise<string> {
    return await this.uploadService.fileUpload(file);
  }
}
