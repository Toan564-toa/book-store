import type { NextFunction, Request, Response } from "express";
import { HTTP_STATUS } from "../constants";

export function notFound(req: Request, res: Response, next: NextFunction) {
  const error = new Error(`Route not found: ${req.originalUrl}`) as Error & { statusCode?: number };
  error.statusCode = HTTP_STATUS.NOT_FOUND;
  next(error);
}

export function errorHandler(error: any, req: Request, res: Response, next: NextFunction) {
  const statusCode = error.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR;

  res.status(statusCode).json({
    message: error.message || "Internal server error",
  });
}
