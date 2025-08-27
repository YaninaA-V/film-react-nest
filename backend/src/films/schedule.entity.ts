import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Film } from './film.entity';

@Entity('schedule')
export class Schedule {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'filmId' })
  filmId: string;

  @Column({ name: 'daytime', type: 'timestamptz' })
  daytime: string;

  @Column({ name: 'hall' })
  hall: number;

  @Column({ name: 'rows' })
  rows: number;

  @Column({ name: 'seats' })
  seats: number;

  @Column({ name: 'price' })
  price: string;

  @Column({ name: 'taken', type: 'text', array: true, default: [] })
  taken: string[];

  @ManyToOne(() => Film, (film) => film.schedules)
  film: Film;
}
