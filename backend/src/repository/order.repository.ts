import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order, OrderDocument } from '../order/order.model';

@Injectable()
export class OrderRepository {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
  ) {}

  async create(orderData: { filmId: string; seats: string[]; bookedAt: Date }) {
    const order = new this.orderModel({
      ...orderData,
      bookedAt: new Date(),
    });
    return order.save();
  }

  async createMany(ordersData: Partial<Order>[]): Promise<OrderDocument[]> {
    const ordersWithDates = ordersData.map((order) => ({
      ...order,
      bookedAt: order.bookedAt || new Date(),
    }));
    return this.orderModel.insertMany(ordersWithDates) as unknown as Promise<
      OrderDocument[]
    >;
  }
}
