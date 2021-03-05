import {Request,Response} from 'express';
import {CustomError} from '../models/CustomError'

export class ErrorHandler{

    public  ErrorHandler(err:CustomError, request: Request, response: Response) {
    const status = err.status || 500;
    const message = err.message || 'Something went wrong with the server, sorry :c';
    response
      .status(status)
      .send({
        status,
        message,
      });
  }
}