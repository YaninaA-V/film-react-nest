import {
  Controller,
  Get,
  Header,
  Param,
  InternalServerErrorException,
} from '@nestjs/common';
import { FilmService } from './film.service';
import { FilmDto } from './dto/films.dto';

@Controller()
export class FilmController {
  constructor(private readonly filmsService: FilmService) {}

  @Get(['/api/afisha/films', '/films'])
  async getFilms() {
    try {
      return await this.filmsService.getFilms();
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Ошибка доступа');
    }
  }

  @Get(['/afisha/films/:id/schedule', '/films/:id/schedule'])
  async getFilmSchedule(@Param('id') id: string) {
    return this.filmsService.getSchedule(id);
  }

  @Get(':id')
  @Header('Content-Type', 'application/json')
  async getFilm(@Param('id') id: string): Promise<FilmDto> {
    return this.filmsService.getFilm(id);
  }
}
