import { ScheduleDto } from './schedule.dto';

export class FilmDto {
  id: string;
  title: string;
  description: string;
  rating: number;
  tags: string[];
  about: string;
  image: string;
  cover: string;
  schedule: ScheduleDto[];
}
