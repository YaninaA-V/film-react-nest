import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/order.dto';
import { FilmRepository } from '../repository/films.repository';

@Injectable()
export class OrderService {
  constructor(private readonly filmRepository: FilmRepository) {}

  async createOrder(orderData: CreateOrderDto): Promise<any> {
    try {
      for (const ticket of orderData.tickets) {
        await this.filmRepository.addTakenSeats(ticket.session, [
          `${ticket.row}:${ticket.seat}`,
        ]);
      }

      return {
        total: orderData.tickets.length,
        items: orderData.tickets.map((ticket) => ({
          film: ticket.film,
          session: ticket.session,
          time: ticket.time,
          day: ticket.day,
          daytime: ticket.daytime,
          price: ticket.price,
          row: ticket.row,
          seat: ticket.seat,
        })),
      };
    } catch (error) {
      return {
        success: false,
        message: 'Ошибка при создании заказа: ' + error.message,
      };
    }
  }
}
