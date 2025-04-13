import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import foodRouter from './routes/foodRoute.js';
import userRouter from './routes/userRoute.js';
import 'dotenv/config'
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';


const allowedOrigins = [`${process.env.FRONTEND_URL}`, `${process.env.ADMIN_URL}`];

// app config
const app = express();
const port = 4000;

app.use((req, res, next) => {
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }

    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, token');
    res.setHeader('Access-Control-Allow-Credentials', 'true');

    if (req.method === 'OPTIONS') {
        return res.sendStatus(204);
    }

    next();
});

// middleware
app.use(express.json());
app.use(cors());

// db connection
connectDB();


// api routes
app.use("/api/food", foodRouter)
app.use("/images", express.static('uploads'))
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use('/api/order', orderRouter);

app.get("/", (req, res) => {
    res.send("API is running...");
});

app.listen(port, () => {
    console.log(`Server is running on  http://localhost:${port}`);
})

export default app;

// mongodb+srv://rakeshmaurya1500:rkm@5646@cluster0.56ycl.mongodb.net/?
