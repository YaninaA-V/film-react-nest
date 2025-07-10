import { Body, Controller, Post } from "@nestjs/common";
import { OrderService } from "./order.service";
import { CreateOrderDto, OrderResponseDto } from "./dto/order.dto";

@Controller('order') 
export class OrderController {
    constructor(private readonly orderService: OrderService) {}

    @Post()
    async createOrder(@Body() orders: CreateOrderDto[]): Promise<{ total: number; items: OrderResponseDto[] }> {
        return this.orderService.createOrder(orders);
    }
}