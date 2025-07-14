import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';
import * as path from 'node:path';

import { configProvider } from './app.config.provider';
import { FilmsModule } from './films/film.module';
import { OrderModule } from './order/order.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Film, FilmSchema } from './films/film.model';
import { ProxyController } from './app.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),
    MongooseModule.forRoot(
      process.env.MONGODB_URI || 'mongodb://localhost:27017/film-repository',
    ),
    MongooseModule.forFeature([{ name: Film.name, schema: FilmSchema }]),
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '..', 'public', 'content'),
      serveRoot: '/content',
      exclude: ['/api*'],
    }),
    FilmsModule,
    OrderModule,
  ],
  controllers: [ProxyController],
  providers: [configProvider],
})
export class AppModule {}
