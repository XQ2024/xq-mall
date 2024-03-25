import express from "express";
import { postAuthUser, postNewUser } from "../controllers/user.js";

const app = express.Router();

// @desc     User Registration
// @route    POST /api/users/
// @access   Public
app.post("/", postNewUser);

// @desc     User Login
// @route    POST /api/users/login
// @access   Public
app.post("/login", postAuthUser);

export default app;
