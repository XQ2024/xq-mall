import pkg from "jsonwebtoken";
import mongoose from "mongoose";

const { sign } = pkg;
export const connectDB = (uri: string) => {
  mongoose
    .connect(uri, {
      dbName: "XQ-Mall",
    })
    .then((c) => {
      console.log(`DB connected to ${c.connection.host}`);
    })
    .catch((err) => {
      console.log("Error connecting to DB", err);
    });
};

export const generateToken = (id: string) => {
  return sign({ id }, process.env.JWT_SECRET!, {
    expiresIn: "30d",
  });
};
