import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'aws-sdk';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
   config.update({
        accessKeyId: '[your S3 Access key]',
        secretAccessKey: '[your S3 secret]',
        region: '[your S3 region]',
      });
  await app.listen(3000);
}
bootstrap();
