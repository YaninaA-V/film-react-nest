import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Film } from '../films/film.entity';
import { Order } from './order.entity';
import { Schedule } from '../films/schedule.entity';
import { OrderRepository } from '../repository/order.repository';
import { FilmRepository } from '../repository/films.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Order, Film, Schedule])],
  controllers: [OrderController],
  providers: [OrderService, OrderRepository, FilmRepository],
})
export class OrderModule {}
