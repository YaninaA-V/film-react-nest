import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type FilmDocument = Film & Document;

@Schema()
export class ScheduleItem {
    @Prop({ required: true })
    data: Date;

     @Prop({ required: true })
  time: string;

  @Prop({ required: true })
  hall: string;

  @Prop({ type: [String], default: [] })
  takenSeats: string[];
}

@Schema()
export class Film {
  @Prop({ required: true, unique: true })
  id: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  director: string;

  @Prop({ required: true })
  rating: number;

  @Prop({ type: [String], required: true })
  tags: string[];

  @Prop({ required: true })
  image: string;

  @Prop({ required: true })
  cover: string;

  @Prop({ required: true })
  about: string;

  @Prop({ required: true })
  description: string;
  
  @Prop({ type: [ScheduleItem], required: true })
  schedule: ScheduleItem[];
}

export const FilmSchema = SchemaFactory.createForClass(Film);