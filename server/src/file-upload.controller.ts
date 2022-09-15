import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Request,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileService } from './file.service';
import { ResponseModel } from './response.model';

@Controller('file-upload')
export class FileUploadController {
  constructor(private readonly fileservice: FileService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Request() req,
  ): Promise<any> {
    const result = await this.fileservice.uploadPublicFile(
      file.buffer,
      file.originalname,
    );

    return new ResponseModel(result); 
  }
}
