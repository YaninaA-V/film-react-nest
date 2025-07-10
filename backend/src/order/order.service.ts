import { Injectable } from "@nestjs/common";
import { CreateOrderDto, OrderResponseDto } from "./dto/order.dto";

@Injectable()
export class OrderService {
    createOrder(orders: CreateOrderDto[]): { total: number; items: OrderResponseDto[] } {
        return { total: 0, items: [] };
    }
}