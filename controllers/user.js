import User from "../models/user.js";
import dotenv from 'dotenv';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import Session from "../models/session.js";
dotenv.config();

export const createUser = async (req, res)=>{
    const {name, email, password, privilege} = req.body;
    if(!name || !email || !password){
        res.status(400).json({success:false, data: "Bad request"});
        return;
    }
    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
          return res.status(400).json({ success: false, data: 'User already exists' });
        }
        const user = new User({name, email, password, privilege});
        await user.save();
        return res.status(201).json({success: true, data: "User registered successfully"})
    } catch (error) {
        return res.status(500).json({ success: false, data: error.message });
    }
}

export const login = async (req,res)=>{
    const {email, password} = req.body;
    if(!email || !password){
        res.status(400).json({ success: false, data: "Bad request"});
        return;
    }
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, data: 'Invalid credentials' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return res.status(400).json({ success: false, data: 'Invalid credentials' });
        }
        const token = jwt.sign({ userId: user._id }, process.env.LOGIN_SECRET_KEY, { expiresIn: '1h' });
        const session = new Session({ userId: user._id, sessionToken: token})
        await session.save();
        return res.json({ success: true, data: { _id: user._id, username: user.username, role: user.privilege }, token });
    } catch (error) {
        return res.status(500).json({success:false, data: error.message }); 
    }
}

export const logout = async (req,res)=>{
    try {
        await Session.deleteOne({ sessionToken: req.token });
        return res.json({ message: 'Logged out successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'Server error' });
    }
}