import { Injectable } from '@nestjs/common';
import { Film } from '../films/film.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Schedule } from '../films/schedule.entity';

@Injectable()
export class FilmRepository {
  constructor(
    @InjectRepository(Film)
    private filmRepository: Repository<Film>,
    @InjectRepository(Schedule)
    private scheduleRepository: Repository<Schedule>,
  ) {}

  async findAll(): Promise<Film[]> {
    return this.filmRepository.find({ relations: ['schedules'] });
  }

  async findByID(id: string): Promise<Film | null> {
    return this.filmRepository.findOne({
      where: { id },
      relations: ['schedules'],
    });
  }

  async create(filmData: Partial<Film>): Promise<Film> {
    const film = this.filmRepository.create(filmData);
    return this.filmRepository.save(film);
  }

  async update(id: string, filmData: Partial<Film>): Promise<Film | null> {
    await this.filmRepository.update(id, filmData);
    return this.findByID(id);
  }

  async delete(id: string): Promise<void> {
    await this.filmRepository.delete(id);
  }

  async addScheduleItem(
    filmId: string,
    scheduleItem: any,
  ): Promise<Film | null> {
    const film = await this.findByID(filmId);
    if (!film) return null;

    const newSchedule = this.scheduleRepository.create({
      ...scheduleItem,
      film,
    });
    await this.scheduleRepository.save(newSchedule);

    return this.findByID(filmId);
  }

  async updateScheduleItem(
    scheduleId: string,
    updateData: Partial<Schedule>,
  ): Promise<Schedule | null> {
    await this.scheduleRepository.update(scheduleId, updateData);
    return this.scheduleRepository.findOneBy({ id: scheduleId });
  }

  async addTakenSeats(scheduleId: string, seats: string[]): Promise<void> {
    const schedule = await this.scheduleRepository.findOne({
      where: { id: scheduleId },
    });
    if (!schedule) {
      throw new Error('Расписание не найдено');
    }
    schedule.takenSeats = [...(schedule.takenSeats || []), ...seats];
    await this.scheduleRepository.save(schedule);
  }

  async removeTakenSeats(
    scheduleId: string,
    seatKeys: string[],
  ): Promise<Schedule | null> {
    const schedule = await this.scheduleRepository.findOneBy({
      id: scheduleId,
    });
    if (!schedule) return null;

    schedule.takenSeats = schedule.takenSeats.filter(
      (seat) => !seatKeys.includes(seat),
    );
    return this.scheduleRepository.save(schedule);
  }
}
