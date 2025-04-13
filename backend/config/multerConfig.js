import multer from "multer";
import { GridFsStorage } from "multer-gridfs-storage";
import dotenv from "dotenv";

dotenv.config();

const storage = new GridFsStorage({
  url: process.env.MONGODB_URI,
  file: (request, file) => {
    const match = ["image/png", "image/jpg", "image/jpeg"]; // added jpeg as well

    if (!match.includes(file.mimetype)) {
      return null; // reject unsupported file types
    }

    console.log(file)

    return {
      bucketName: "uploads",
      filename: `${Date.now()}-file-${file.originalname}`
    };
  }
});

const upload = multer({ storage });

export default upload;
