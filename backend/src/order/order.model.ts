import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type OrderDocument = Order & Document;

@Schema()
export class Order {
  @Prop({ required: true })
  filmId: string;

  @Prop({ required: true })
  sessionId: string;

  @Prop({ required: true })
  daytime: Date;

  @Prop({ required: true })
  row: number;

  @Prop({ required: true })
  seat: number;

  @Prop({ required: true })
  price: number;

  @Prop({ default: Date.now })
  bookedAt: Date;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
