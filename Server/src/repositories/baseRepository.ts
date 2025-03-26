import { Model, Document } from 'mongoose';

export interface IBaseRepository<T> {
  create(data: T): Promise<T>;
  findById(id: string): Promise<T | null>;

}

export class BaseRepository<T extends Document> implements IBaseRepository<T> {
  constructor(private readonly model: Model<T>) {}

  async create(data: T): Promise<T> {
    return await this.model.create(data);
  }

  async findById(id: string): Promise<T | null> {
    return await this.model.findById(id);
  }

 
}
