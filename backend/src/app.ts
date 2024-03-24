import express from "express";

import userRoute from "./routes/user.js";
import { connectDB } from "./utils/features.js";
import { config } from "dotenv";
import { errorMiddleware } from "./middlewares/error.js";

config({
  path: "./.env",
});

const port = process.env.PORT || 8080;

const mongoURI = process.env.MONGODB_URL || "";

connectDB(mongoURI);

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API working");
});

app.use("/api/user", userRoute);

app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`Server is working on http://localhost:${port}`);
});
