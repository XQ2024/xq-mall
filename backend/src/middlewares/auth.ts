import pkg from "jsonwebtoken";
import { TryCatch } from "./error.js";
import { NextFunction, Request, Response } from "express";
import { User } from "../models/user.js";

const { verify } = pkg;

type decoded = {
  id: string;
};

export const protect = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
      const decoded = <decoded>verify(token, process.env.JWT_SECRET!);
      req.body.user = await User.findById(decoded.id).select("-password");
    }

    if (!token) {
      res.status(401);
      throw new Error("Unauthorized: no valid token");
    }

    next();
  }
);

export const admin = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    if (req.body.user && req.body.user.isAdmin) {
      next();
    } else {
      throw new Error("Unauthorized: not an admin");
    }
  }
);
