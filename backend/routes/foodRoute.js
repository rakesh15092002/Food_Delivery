import express from "express";

import { addFood, listFood,removeFood, getImage } from "../controllers/foodController.js"; // Ensure correct path


import upload from "../config/multerConfig.js";

const router = express.Router();



router.post("/add", upload.single("image"), addFood); 
router.get('/list',listFood)
router.post("/remove",removeFood)
router.get("/file/:fileName", getImage);
export default router;
