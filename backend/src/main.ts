import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import { TskvLogger } from './logger/tskv.logger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bufferLogs: true,
  });
  app.enableCors({
    origin: true,
    methods: ['GET,HEAD,PUT,PATCH,POST,DELETE, OPTIONS'],
    allowedHeaders: ['Content-Type,Authorization'],
  });
  app.useStaticAssets(join(__dirname, '..', 'public'), {
    prefix: '/public/',
    index: false,
  });
  app.setGlobalPrefix('api/afisha');
  app.useLogger(new TskvLogger());
  await app.listen(3000);
}
bootstrap();
