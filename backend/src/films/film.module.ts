import { Module } from '@nestjs/common';
import { FilmController } from './film.controller';
import { FilmService } from './film.service';
import { FilmRepository } from '../repository/films.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Film } from './film.entity';
import { Schedule } from './schedule.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Film, Schedule])],
  controllers: [FilmController],
  providers: [FilmService, FilmRepository],
  exports: [FilmService, FilmRepository],
})
export class FilmsModule {}
