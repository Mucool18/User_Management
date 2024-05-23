
import jwt from "jsonwebtoken";
import User from '../models/user.js';
import dotenv from 'dotenv';
import Session from "../models/session.js";
dotenv.config();

export const authenticate = async (req, res, next) => {
  
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    if(token){
      const decoded = jwt.verify(token, process.env.LOGIN_SECRET_KEY);
      const user = await User.findById(decoded.userId);
      if (!user) {
        throw new Error();
      }
      const session = await Session.findOne({ sessionToken: token });

      if (!session) {
        return res.status(401).json({ success: false,  data: 'Session not found' });
      }
      req.session = session;
      req.user = user;
      next();
    }else{
      res.status(401).json({ success: false,  data: 'Please authenticate' });
    }
    
  } catch (error) {
    res.status(401).json({ success: false,  data: 'Please authenticate' });
  }
};

