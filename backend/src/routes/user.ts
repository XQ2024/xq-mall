import express from "express";
import { postAuthUser, postNewUser } from "../controllers/user.js";

const app = express.Router();

app.post("/", postNewUser);
app.post("/login", postAuthUser);

export default app;
