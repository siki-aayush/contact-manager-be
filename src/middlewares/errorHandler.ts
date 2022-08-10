import { NextFunction, Request, Response } from "express";
import CustomError from "../misc/CustomError";

/**
 * Middleware to handle the errors
 * @param  {CustomError} err
 * @param  {Request} req
 * @param  {Response} res
 * @param  {NextFunction} next
 */
export const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(err.statusCode || 500);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};
