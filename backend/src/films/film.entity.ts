import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Schedule } from './schedule.entity';

@Entity()
export class Film {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  director: string;

  @Column('float')
  rating: number;

  @Column('simple-array')
  tags: string[];

  @Column()
  image: string;

  @Column()
  cover: string;

  @Column()
  about: string;

  @Column()
  description: string;

  @OneToMany(() => Schedule, (schedule) => schedule.film, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  schedules: Schedule[];
}
