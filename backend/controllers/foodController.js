import foodModel from "../models/foodModel.js";
import fs from 'fs';
import mongoose from 'mongoose';

const url = "process.env.BACKEND_URL"

let gridFsBucket;

mongoose.connection.once("open", () => {
  gridFsBucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
    bucketName: "uploads", // Updated to match your actual bucket name
  });
});

const getImage = async (req, res) => {
    try {
      if (!gridFsBucket) {
        return res.status(500).json({ message: "GridFSBucket is not initialized" });
      }
  
      const fileCollection = mongoose.connection.db.collection("uploads.files"); // Ensure this matches your bucket
      console.log(fileCollection)
      const file = await fileCollection.findOne({ filename: req.params.fileName });
  
      if (!file) {
        return res.status(404).json({ message: "File not found" });
      }
  
      res.set("Content-Type", file.contentType);
  
      const readStream = gridFsBucket.openDownloadStream(file._id);
      readStream.pipe(res);
    } catch (error) {
      console.error("Error fetching image:", error);
      res.status(500).json({ error: error.message });
    }
  };

// Add food items
const addFood = async (req, res) => {

    if (!req.file) {
        return res.status(400).json({ error: "No file uploaded!" });
    }

    const image_filename = `${url}/api/food/file/${req.file.filename}`;
    console.log(image_filename);


    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: image_filename,
    });

    try {
        await food.save();
        res.json({ success: true, message: "Food Added" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

// All food list
const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({});
        res.json({ success: true, data: foods });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

//  remove food items
const removeFood = async (req, res) => {

    try {

        const food = await foodModel.findById(req.body.id);
        fs.unlink(`uploads/${food.image}`, () => { })
        await foodModel.findByIdAndDelete(req.body.id)
        res.json({ success: true, message: "Food Removed" })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "Error" })
    }
}

export { addFood, listFood, removeFood, getImage };
