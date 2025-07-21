import { Injectable } from '@nestjs/common';
import { CreateOrderDto, OrderResponseDto } from './dto/order.dto';
import { OrderRepository } from '../repository/order.repository';
import { FilmRepository } from '../repository/films.repository';

@Injectable()
export class OrderService {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly filmRepository: FilmRepository,
  ) {}

  async createOrder(orderData: CreateOrderDto): Promise<OrderResponseDto> {
    try {
      await this.orderRepository.create({
        filmId: orderData.filmId,
        seats: orderData.seats,
        bookedAt: new Date(),
      });
      await this.filmRepository.addTakenSeats(
        orderData.filmId,
        orderData.sessionId,
        orderData.seats,
      );

      return {
        success: true,
        message: 'Заказ успешно создан',
      };
    } catch (error) {
      console.error('Order creation error:', error);
      return {
        success: false,
        message: 'Ошибка при формировании заказа',
      };
    }
  }
}
