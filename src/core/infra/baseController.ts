import {NextFunction, Request, Response} from 'express';

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

  private response<T>(code: number, content: T | string) {
    let body;
    if (content as T) body = content;
    else body = {message: content};
    return this.res.status(code).json(body);
  }

  public ok<T>(dto?: T) {
    return this.response(200, dto || "OK");
  }

  public created<T>(dto?: T) {
    return this.response(201, dto || "Created");
  }

  public noContent() {
    return this.res.status(204);
  }

  public badRequest(message?: string) {
    return this.response(400, message || "Bad Request");
  }

  public unauthorized(message?: string) {
    return this.response(401, message || 'Unauthorized');
  }

  public paymentRequired(message?: string) {
    return this.response(402, message || 'Payment required');
  }

  public forbidden(message?: string) {
    return this.response(403, message || 'Forbidden');
  }

  public notFound(message?: string) {
    return this.response(404, message || 'Not found');
  }

  public notImplemented() {
    return this.response(501, 'TODO');
  }

  public fail(error: Error | string) {
    Logger.error(error);
    return this.response(500, error.toString());
  }
}