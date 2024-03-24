import { NextFunction, Request, Response } from "express";

export interface NewUserRequestBody {
  email: string;
  password: string;
  isAdmin: boolean;
}

export interface AuthUserRequestBody {
  email: string;
  password: string;
}

export type ControllerType = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void | Response<any, Record<string, any>>>;
