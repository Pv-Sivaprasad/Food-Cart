
import mongoose, { Schema, Document } from 'mongoose';


export interface ICategory extends Document {
  categoryName: string;
}

const CategorySchema: Schema = new Schema({
  categoryName: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
});

const Category = mongoose.model<ICategory>('Category', CategorySchema);
export default Category;
