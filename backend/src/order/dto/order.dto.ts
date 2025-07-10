export class CreateOrderDto {
  filmId: string;
  sessionId: string;
  daytime: Date;
  row: number;
  seat: number;
  price: number;
}

export class OrderResponseDto {
  id: string;
  filmId: string;
  sessionId: string;
  daytime: Date;
  row: number;
  seat: number;
  price: number;
  bookedAt: Date;  
}
