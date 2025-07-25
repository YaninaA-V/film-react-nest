import { Film } from '../films/film.entity';
import { Schedule } from '../films/schedule.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Film)
  film: Film;

  @ManyToOne(() => Schedule)
  schedule: Schedule;

  @Column()
  daytime: string;

  @Column('text', { array: true })
  seats: string[];

  @Column('float')
  price: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  bookedAt: Date;
}
