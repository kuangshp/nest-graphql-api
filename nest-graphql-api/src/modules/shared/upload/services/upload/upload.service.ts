import { Injectable, BadRequestException } from '@nestjs/common';
import { FileUpload } from 'graphql-upload';
import { checksumFile } from 'src/utils';
import * as path from 'path';
import OSS from 'ali-oss';
import co from 'co';

@Injectable()
export class UploadService {
  async fileUpload(file: FileUpload): Promise<string> {
    console.log(file, '上传的文件');
    const { createReadStream, filename } = file;
    // 使用md5的方式处理图片
    const md5FileName = await checksumFile('md5', createReadStream);
    // 获取文件的扩展名
    const extname = path.extname(filename).toLocaleLowerCase();
    const client = new OSS({
      region: process.env.ALI_OSS_REGION,
      accessKeyId: process.env.ALI_OSS_ACCESS_KEY_ID,
      accessKeySecret: process.env.ALI_OSS_ACCESS_KEY_SECRET,
      bucket: process.env.ALI_OSS_BUCKET,
      secure: true, // 开启https
    });
    return await co(function*() {
      client.useBucket(process.env.ALI_OSS_BUCKET); //自定义项
      const result: any = yield client.put(`uploads/${md5FileName}${extname}`, createReadStream());
      return result.url;
    }).catch((err: BadRequestException) => {
      throw new BadRequestException(err);
    });
  }
}
