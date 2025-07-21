import { Controller, Get, Param } from '@nestjs/common';
import { FilmService } from './film.service';
import { FilmDto } from './dto/films.dto';
import { ScheduleDto } from './dto/schedule.dto';

@Controller('films')
export class FilmController {
  constructor(private readonly filmsService: FilmService) {}

  @Get()
  async getFilms(): Promise<{ total: number; items: FilmDto[] }> {
    return this.filmsService.getFilms();
  }

  @Get(':id')
  async getFilm(@Param('id') id: string): Promise<FilmDto> {
    return this.filmsService.getFilm(id);
  }

  @Get(':id/schedule')
  async getSchedule(
    @Param('id') id: string,
  ): Promise<{ total: number; items: ScheduleDto[] }> {
    return this.filmsService.getSchedule(id);
  }
}
