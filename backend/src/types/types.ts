import { NextFunction, Request, Response } from "express";

export interface NewUserRequestBody {
  email: string;
  role: string;
}

export type ControllerType = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void | Response<any, Record<string, any>>>;
