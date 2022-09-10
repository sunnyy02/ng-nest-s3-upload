import { Module } from '@nestjs/common';
import { FileUploadController } from './file-upload.controller';
import { FileService } from './file.service';

@Module({
  imports: [],
  controllers: [FileUploadController],
  providers: [FileService],
})
export class AppModule {}
