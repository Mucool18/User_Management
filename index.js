import express from "express";
import bodyParser from "body-parser";
import dotenv from 'dotenv';
import userRouter from "./routes/user.js";
import organizationRouter from "./routes/organization.js";
import taskRouter from "./routes/task.js"
import mongoose from "mongoose";
dotenv.config();

const app = express();

const PORT = process.env.PORT || 8000;

app.use(bodyParser.json());

app.use("/user", userRouter);
app.use("/organization", organizationRouter);
app.use("/task", taskRouter);

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT,()=>{
        console.log(`Server connected on Port ${PORT}`);
    })
}).catch((error) => {
    console.error('Error connecting to MongoDB', error);
});



