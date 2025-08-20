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
      const order = await this.orderRepository.create(orderData);

      await this.filmRepository.addTakenSeats(
        orderData.sessionId,
        orderData.seats,
      );

      return {
        success: true,
        message: 'Заказ успешно создан',
        orderId: order.id,
      };
    } catch (error) {
      console.error('Order creation error:', error);
      return {
        success: false,
        message: 'Ошибка при создании заказа: ' + error.message,
      };
    }
  }
}
