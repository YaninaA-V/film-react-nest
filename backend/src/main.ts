import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors({
    origin: true,
    methods: ['GET,HEAD,PUT,PATCH,POST,DELETE, OPTIONS'],
    allowedHeaders: ['Content-Type,Authorization'],
  });
  app.useStaticAssets(join(__dirname, '..', 'public'), {
    prefix: '/public/',
    index: false,
  });
  await app.listen(3000);
}
bootstrap();
