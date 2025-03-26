import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()


export const connectDataBase=async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI!)
        console.log('successfully connected to data base');
        
    } catch (error) {
        console.log('error connecting to db',error);
        
    }
}