import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config();

const connectDb = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Database Connect SuccessFully");
    } catch (error) {
        console.log("DataBase not Connected" , error.message);
    }
}

export default connectDb;