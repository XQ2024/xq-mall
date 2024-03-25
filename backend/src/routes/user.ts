import express from "express";
import { postAuthUser, postNewUser } from "../controllers/user.js";

const app = express.Router();

// @desc     User Registration
// @route    POST /api/user/
// @access   Public
app.post("/", postNewUser);

// @desc     User Login
// @route    POST /api/user/login
// @access   Public
app.post("/login", postAuthUser);

export default app;
