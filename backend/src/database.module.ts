import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Film } from './films/film.entity';
import { Schedule } from './films/schedule.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: process.env.DATABASE_HOST || 'db',
        port: parseInt(process.env.DATABASE_PORT || '5432', 10),
        username: process.env.DATABASE_USERNAME || 'user_for_film',
        password: process.env.DATABASE_PASSWORD || 'filmnest',
        database: process.env.DATABASE_NAME || 'film_nest_db',
        entities: [Film, Schedule],
        synchronize: true,
        logging: true,
        retryDelay: 5000,
        retryAttempts: 10,
        extra: {
          connectionLimit: 5,
          poolSize: 30,
        },
      }),
    }),
  ],
})
export class DatabaseModule {}
