import express from "express";

import { createUser, login, logout } from "../controllers/user.js";



const router = express.Router();

router.post("/signup", createUser);

// User Login api

router.post("/login", login);

router.post("/logut", logout);

export default router;