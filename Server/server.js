import express from 'express';
import dotenv from 'dotenv';
import connectDb from './configs/db.js';
import userRouter from './Routes/userRoute.js'
import taskRouter from './Routes/taskRoute.js'
import { authMiddleware } from './middleware/authMiddleware.js';
import cors from 'cors';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

connectDb();
app.use(cors());
app.use(express.json());

app.use('/user' , userRouter);
app.use('/task' , authMiddleware , taskRouter);

app.listen(PORT , () => {
    console.log(`server is running on : http://localhost:${PORT}`);
})