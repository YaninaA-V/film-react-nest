import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Film } from './films/film.entity';
import { Schedule } from './films/schedule.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: configService.get<'postgres'>('DATABASE_DRIVER'),
        host: configService.get<string>('DATABASE_HOST'),
        port: configService.get<number>('DATABASE_PORT'),
        username: configService.get<string>('DATABASE_USERNAME'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        database: configService.get<string>('DATABASE_NAME'),
        entities: [Film, Schedule],
        synchronize: true,
        logging: true,
        extra: {
          trustServerCertificate: true,
        },
      }),
    }),
  ],
})
export class DatabaseModule {}
