export class CreateOrderDto {
  email: string;
  phone: string;
  tickets: Array<{
    film: string;
    session: string;
    day: string;
    daytime: string;
    price: number;
    row: number;
    seat: number;
    time: string;
  }>;
}

export class OrderResponseDto {
  total: number;
  items: Array<{
    film: string;
    session: string;
    time: string;
    day?: string;
    daytime?: string;
    price?: number;
    row?: number;
    seat?: number;
  }>;
}
