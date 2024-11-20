import { Request, Response, NextFunction } from "express";
import { AppError } from "./errorHandler";

const verifyRequestInputs = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.body.privateKey || !req.file) {
    throw new AppError("Invalid Request", 400);
  }
  next();
};

export default verifyRequestInputs;
