import { Injectable, NotFoundException } from '@nestjs/common';
import { FilmDto } from './dto/films.dto';
import { ScheduleDto } from './dto/schedule.dto';
import { FilmRepository } from '../repository/films.repository';
import { Film } from './film.entity';
import { Schedule } from './schedule.entity';

@Injectable()
export class FilmService {
  constructor(private readonly filmRepository: FilmRepository) {}

  async getFilms(): Promise<{ total: number; items: FilmDto[] }> {
    const films = await this.filmRepository.findAll();
    return {
      total: films.length,
      items: films.map((film) => this.toFilmDto(film)),
    };
  }

  async getFilm(id: string): Promise<FilmDto> {
    const film = await this.filmRepository.findByID(id);
    if (!film) {
      throw new NotFoundException('Фильм не найден');
    }
    return this.toFilmDto(film);
  }

  async getSchedule(
    id: string,
  ): Promise<{ total: number; items: ScheduleDto[] }> {
    const film = await this.filmRepository.findByID(id);
    if (!film) {
      throw new NotFoundException('Фильм не найден');
    }
    const schedules = await this.filmRepository.findSchedulesByFilmId(id);

    return {
      total: schedules.length,
      items: schedules.map((scheduleItem) => this.toScheduleDto(scheduleItem)),
    };
  }

  private toFilmDto(film: Film, schedules: Schedule[] = []): FilmDto {
    return {
      id: film.id,
      title: film.title,
      description: film.description,
      rating: film.rating,
      tags: film.tags,
      about: film.about,
      image: film.image,
      cover: film.cover,
      schedule: schedules.map((scheduleItem) =>
        this.toScheduleDto(scheduleItem),
      ),
    };
  }

  private toScheduleDto(scheduleItem: Schedule): ScheduleDto {
    return {
      id: scheduleItem.id,
      daytime: scheduleItem.daytime,
      hall: scheduleItem.hall,
      rows: scheduleItem.rows,
      seats: scheduleItem.seats,
      price: scheduleItem.price,
      taken: scheduleItem.taken,
    };
  }
}
