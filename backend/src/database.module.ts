import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Film } from './films/film.entity';
import { Schedule } from './films/schedule.entity';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'user_for_film',
      password: 'filmnest',
      database: 'film_nest_db',
      entities: [Film, Schedule],
      synchronize: true,
      logging: true,
      extra: {
        trustServerCertificate: true,
      },
    }),
  ],
})
export class DatabaseModule {}
