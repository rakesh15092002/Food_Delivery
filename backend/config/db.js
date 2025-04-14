import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { GridFSBucket } from 'mongodb';
dotenv.config({});

export const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}`);
        console.log("Database connected successfully");

        // Initialize GridFSBucket
        const db = mongoose.connection.db;
        const bucket = new GridFSBucket(db, { bucketName: 'uploads' });
        console.log("GridFSBucket initialized successfully");

        // Now you can use `bucket` to store/retrieve files from GridFS
        return bucket;
    } catch (error) {
        console.log("MONGODB connection FAILED ", error);
        process.exit(1);
    }
};
