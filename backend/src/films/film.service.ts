import { Injectable, NotFoundException } from "@nestjs/common";
import { FilmDto } from "./dto/films.dto";
import { ScheduleDto } from "./dto/schedule.dto";
import { FilmRepository } from "../repository/films.repository";
import { FilmDocument } from "./film.model";

@Injectable()
export class FilmService {
    constructor(private readonly filmRepository: FilmRepository) {}

    async getFilms(): Promise<{total: number; items: FilmDto[]}> {
        const films = await this.filmRepository.findAll();
        return { total: films.length, items: films.map(film => this.toFilmDto(film)) };
    }

    async getFilm(id: string): Promise<FilmDto> {
        const film = await this.filmRepository.findByID(id);
        if(!film) {
            throw new NotFoundException('Фильм не найден');
        }
        return this.toFilmDto(film);
    }

    async getSchedule(id: string): Promise<{total: number; items: ScheduleDto[]}> {
        const film = await this.filmRepository.findByID(id);
        if(!film) {
            throw new NotFoundException('Фильм не найден');
        }
        
        return {
            total: film.schedule.length,
            items: film.schedule.map(scheduleItem => this.toScheduleDto(scheduleItem))
        };
    }

private toFilmDto(film: FilmDocument): FilmDto {
        return {
            id: film._id.toString(),
            title: film.title,
            description: film.description,
            rating: film.rating,
            tags: film.tags,
            about: film.about,
            image: film.image,
            cover: film.cover,
            schedule: film.schedule.map(scheduleItem => this.toScheduleDto(scheduleItem))
        };
    }

    private toScheduleDto(scheduleItem: any): ScheduleDto {
        return {
            date: scheduleItem.date,
            time: scheduleItem.time,
            hall: scheduleItem.hall,
            takenSeats: scheduleItem.takenSeats || []
        };
    }
}
