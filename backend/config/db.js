import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config({});


export const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}`)
        console.log("DataBase connected successfully");
    } catch (error) {
        console.log("MONGODB connection FAILED ", error);
        process.exit(1)
    }
}
