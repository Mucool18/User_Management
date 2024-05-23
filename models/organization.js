import mongoose from "mongoose";

const organizationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    createdByUserId:{
        type: mongoose.Schema.ObjectId, ref: "User"
    }
    
});

const Organization = mongoose.model("Organization", organizationSchema);
export default Organization;