import {NextFunction, Request, Response} from 'express'

import NotFoundError from "../logic/notFoundError";
import ValidationError from "../logic/validationError";
import Logger from "../loaders/logger";

export default class BaseController {

  constructor(
    private req: Request,
    private res: Response,
    private next: NextFunction
  ) {
  }

  public handleException(e: Error) {
    if (e instanceof NotFoundError)
      return this.notFound(e.message);
    if (e instanceof ValidationError)
      return this.badRequest(e.message);
    return this.next(e);
  }

  public jsonResponse<T>(code: number, dto: T | string) {
    let body;
    if (dto as T) body = dto;
    else body = {message: dto};
    return this.res.status(code).json(body);
  }

  public ok<T>(dto?: T) {
    return this.jsonResponse(200, dto || "OK");
  }

  public created<T>(dto?: T) {
    return this.jsonResponse(201, dto || "Created");
  }

  public badRequest(message?: string) {
    return this.jsonResponse(400, message || "Bad Request");
  }

  public unauthorized(message?: string) {
    return this.jsonResponse(401, message || 'Unauthorized');
  }

  public paymentRequired(message?: string) {
    return this.jsonResponse(402, message || 'Payment required');
  }

  public forbidden(message?: string) {
    return this.jsonResponse(403, message || 'Forbidden');
  }

  public notFound(message?: string) {
    return this.jsonResponse(404, message || 'Not found');
  }

  public conflict(message?: string) {
    return this.jsonResponse(409, message || 'Conflict');
  }

  public tooMany(message?: string) {
    return this.jsonResponse(429, message || 'Too many requests');
  }

  public todo() {
    return this.jsonResponse(400, 'TODO');
  }

  public fail(error: Error | string) {
    Logger.error(error);
    return this.jsonResponse(500, error.toString());
  }
}