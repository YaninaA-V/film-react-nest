import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Film } from './film.entity';

@Entity()
export class Schedule {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: '2025-07-25' })
  date: string;

  @Column({ default: '01:00' })
  time: string;

  @Column({ default: '' })
  hall: string;

  @Column('simple-array', { default: '' })
  takenSeats: string[];

  @ManyToOne(() => Film, (film) => film.schedules)
  film: Film;
}
