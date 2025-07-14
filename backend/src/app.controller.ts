import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { FilmService } from './films/film.service';

@Controller('api/afisha')
export class ProxyController {
  constructor(private readonly filmService: FilmService) {}

  @Get('/films')
  async getFilms(@Res() res: Response) {
    try {
      const filmsData = await this.filmService.getFilms();
      return res.status(200).json(filmsData);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Ошибка доступа' });
    }
  }
  @Get(['/afisha/films/:id/schedule', '/films/:id/schedule'])
  async getFilmSchedule(@Param('id') id: string) {
    return this.filmService.getSchedule(id);
  }
}
