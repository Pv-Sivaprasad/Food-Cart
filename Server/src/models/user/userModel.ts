import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  userName: string;
  email: string;
  password: string;
  isAdmin: boolean;
  dob?: Date;
  mobile?: string;
  profileImage?: string;
}

const userSchema = new Schema<IUser>({
  userName: 
  { 
    type: String, 
    required: true 
},
  email: 
  { 
    type: String, 
    required: true, 
    unique: true 
},
  password: 
  { 
    type: String, 
    required: true 
},
  isAdmin: 
  { 
    type: Boolean, 
    default: false 
},
  dob: 
  { 
    type: Date, 
    default: null 
  },
  mobile: 
  { 
    type: String, 
    default: null 
  },
  profileImage: 
  { 
    type: String, 
    default: null 
  },
});

export const UserModel = mongoose.model<IUser>('User', userSchema);
