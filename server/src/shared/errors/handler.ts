import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';

import { AppError } from './AppError';
import { HttpStatus } from '@shared/enums/HttpStatus';

const errorHandler: ErrorRequestHandler = (
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      error: true,
      message: error.message,
    });
  }

  return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
    error: true,
    message: `Internal server error - ${error.message}`,
  });
};

export default errorHandler;
