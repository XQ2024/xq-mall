import { NextFunction, Request, Response } from "express";
import { User } from "../models/user.js";
import { NewUserRequestBody } from "../types/types.js";
import { TryCatch } from "../middlewares/error.js";

export const newUser = TryCatch(
  async (
    req: Request<{}, {}, NewUserRequestBody>,
    res: Response,
    next: NextFunction
  ) => {
    // throw new Error("abc");
    // return next(new Error("def"));
    const { email, role } = req.body;

    let user = await User.findOne({ email });
    if (user)
      return res.status(409).json({
        success: false,
        message: "Email already registered.",
      });

    user = await User.create({
      email,
      role,
    });
    return res.status(200).json({
      success: true,
      message: "User registered successfully.",
    });
  }
);
