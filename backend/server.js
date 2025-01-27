import express from "express";
import cors from "cors";
import 'dotenv/config';
import cookieParser from "cookie-parser";

// Routes
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";
import adminRouter from "./routes/adminRoutes.js";

// Local Imports
import connectDB from "./config/mongoDB.js";

const app = express();
const PORT = process.env.PORT || 3000;
const allowedOrigins = ['http://localhost:5173', 'http://localhost:5174'];

connectDB();
app.use(express.json());
app.use(cookieParser());
app.use(cors());

// API Endpoints
app.get('/', (req, res) => {res.send('Hello from backend')})
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/admin', adminRouter);


app.listen(PORT, () => {PORT &&  console.log(`Server running on port http://localhost:${PORT}`)})