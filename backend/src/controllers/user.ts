import { NextFunction, Request, Response } from "express";
import { User } from "../models/user.js";
import { AuthUserRequestBody, NewUserRequestBody } from "../types/types.js";
import { TryCatch } from "../middlewares/error.js";
import { generateToken } from "../utils/features.js";

export const postNewUser = TryCatch(
  async (
    req: Request<{}, {}, NewUserRequestBody>,
    res: Response,
    next: NextFunction
  ) => {
    // throw new Error("abc");
    // return next(new Error("def"));
    const { email, password, isAdmin } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400);
      throw new Error("User already registered");
    }
    const user = await User.create({
      email,
      password,
      isAdmin,
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  }
);

export const postAuthUser = TryCatch(
  async (
    req: Request<{}, {}, AuthUserRequestBody>,
    res: Response,
    next: NextFunction
  ) => {
    const { email, password } = await req.body;
    const user = await User.findOne({ email });

    if (user && (await user.comparePassword(password))) {
      res.json({
        _id: user._id,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
    } else {
      res.status(401);
      throw new Error("Invalid user data");
    }
  }
);
