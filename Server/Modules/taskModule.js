import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    title:{
        type : String ,
        required : true,
    },
    description : {
        type : String,
    },
    category : {
        type : String ,
        enum : ["work" , "personal" , "study"],
        required : true,
    },
    status : {
        type : String,
        enum : ["pending" , "completed"],
        default: "Pending"
    },
    user: {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true,
    }
} , {timestamps : true});

const Task = mongoose.model('Task' , taskSchema);
export default Task;