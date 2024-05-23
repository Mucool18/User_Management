import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    title: {
        type:String,
        required: true,
        unique: true
    },
    description:String,
    status:{
        type: String,
        enum: ["PENDING", "IN-PROGRESS", "COMPLETED"],
        default: "PENDING"
    },
    organization: {
        type: mongoose.Schema.ObjectId,
        ref: "Organization",
        required: true
    },
    createdByUser:{
        type: mongoose.Schema.ObjectId,
        ref: "User"
    }
})

const Task = mongoose.model("Task", taskSchema);
export default Task;