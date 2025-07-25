import { Injectable } from '@nestjs/common';
import { Order } from '../order/order.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateOrderDto } from '../order/dto/order.dto';

@Injectable()
export class OrderRepository {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async create(orderData: CreateOrderDto): Promise<Order> {
    const order = this.orderRepository.create({
      film: { id: orderData.filmId },
      schedule: { id: orderData.sessionId },
      seats: orderData.seats,
      bookedAt: new Date(),
      daytime: '',
    });
    return this.orderRepository.save(order);
  }
}
