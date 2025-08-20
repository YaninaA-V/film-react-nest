export class CreateOrderDto {
  filmId: string;
  sessionId: string;
  seats: string[];
}

export class OrderResponseDto {
  success: boolean;
  message?: string;
  orderId?: string;
}
