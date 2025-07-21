import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Film, FilmDocument } from '../films/film.model';

@Injectable()
export class FilmRepository {
  constructor(@InjectModel(Film.name) private filmModel: Model<FilmDocument>) {}

  async findAll(): Promise<FilmDocument[]> {
    return this.filmModel.find().exec();
  }

  async findByID(id: string): Promise<FilmDocument | null> {
    return this.filmModel.findById(id).exec();
  }

  async create(filmData: Partial<Film>): Promise<FilmDocument> {
    const createdFilm = new this.filmModel(filmData);
    return createdFilm.save();
  }

  async update(
    id: string,
    filmData: Partial<Film>,
  ): Promise<FilmDocument | null> {
    return this.filmModel.findByIdAndUpdate(id, filmData, { new: true }).exec();
  }

  async delete(id: string): Promise<void> {
    await this.filmModel.findByIdAndDelete(id).exec();
  }

  async addScheduleItem(
    filmId: string,
    scheduleItem: any,
  ): Promise<FilmDocument | null> {
    return this.filmModel
      .findByIdAndUpdate(
        { id: filmId },
        { $push: { schedule: scheduleItem } },
        { new: true },
      )
      .exec();
  }

  async updateScheduleItem(
    filmId: string,
    scheduleItemId: string,
    updateData: any,
  ): Promise<FilmDocument | null> {
    return this.filmModel
      .findOneAndUpdate(
        { id: filmId, 'schedule._id': scheduleItemId },
        { $set: { 'schedule.$': updateData } },
        { new: true },
      )
      .exec();
  }

  async addTakenSeats(
    filmId: string,
    scheduleId: string,
    seatKeys: string[],
  ): Promise<FilmDocument | null> {
    return this.filmModel
      .findByIdAndUpdate(
        filmId,
        {
          $addToSet: {
            'schedule.$[elem].takenSeats': { $each: seatKeys },
          },
        },
        {
          arrayFilters: [{ 'elem._id': new Types.ObjectId(scheduleId) }],
          new: true,
        },
      )
      .exec();
  }

  async removeTakenSeats(
    filmId: string,
    scheduleId: string,
    seatKeys: string[],
  ): Promise<FilmDocument | null> {
    return this.filmModel
      .findByIdAndUpdate(
        filmId,
        {
          $pull: {
            'schedule.$[elem].takenSeats': { $in: seatKeys },
          },
        },
        {
          arrayFilters: [{ 'elem._id': new Types.ObjectId(scheduleId) }],
          new: true,
        },
      )
      .exec();
  }
}
