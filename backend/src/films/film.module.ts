import { Module } from '@nestjs/common';
import { FilmController } from './film.controller';
import { FilmService } from './film.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Film, FilmSchema } from './film.model';
import { FilmRepository } from '../repository/films.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Film.name,
        schema: FilmSchema,
      },
    ]),
  ],
  controllers: [FilmController],
  providers: [FilmService, FilmRepository],
  exports: [FilmService, FilmRepository],
})
export class FilmsModule {}
