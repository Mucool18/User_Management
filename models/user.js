import mongoose  from "mongoose";
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    status:{
        type:String,
        enum: ["ACTIVE", "INACTIVE"],
        default: "ACTIVE"
    },
    privilege:{
        type:String,
        enum: ["ADMIN", "USER"],
        default: "USER"
    },
    organizations: [{type: mongoose.Schema.ObjectId, ref: 'Organization'}]
});

userSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
      this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

const User = mongoose.model('User', userSchema);
export default User;