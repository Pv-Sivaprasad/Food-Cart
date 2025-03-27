
import mongoose, { Schema, Document } from 'mongoose';


export interface IFoodType extends Document {
  foodName: string;
  category: mongoose.Types.ObjectId; 
  price: number;
  image1: string; 
  image2: string; 
}

const FoodTypeSchema: Schema = new Schema({
  foodName: {
    type: String,
    required: true,
    trim: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category', 
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image1: {
    type: String,
    required: true,
  },
  image2: {
    type: String,
    required: true,
  },
});

const FoodType = mongoose.model<IFoodType>('FoodType', FoodTypeSchema);
export default FoodType;
