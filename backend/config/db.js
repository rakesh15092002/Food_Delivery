import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { GridFSBucket } from 'mongodb';

dotenv.config({});

let gridFsBucket;

export const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}`);
    console.log("✅ Database connected successfully");

    // ✅ Initialize GridFSBucket after connection opens
    mongoose.connection.once("open", () => {
      gridFsBucket = new GridFSBucket(mongoose.connection.db, {
        bucketName: "uploads", // This should match your collection
      });
      console.log("✅ GridFSBucket initialized");
    });

  } catch (error) {
    console.error("❌ MONGODB connection FAILED", error);
    process.exit(1);
  }
};

export { gridFsBucket };
