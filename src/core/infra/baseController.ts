import {NextFunction, Request, Response} from 'express';
import Logger from "../loaders/logger";
import NotFoundError from "../logic/notFoundError";
import ValidationError from "../logic/validationError";

export class BaseController {

  constructor(
    private req: Request,
    private res: Response,
    private next: NextFunction
  ) {
  }

  public handleException(e: Error) {
    return StaticController.handleException(this.res, this.next, e);
  }

  public response<T>(code: number, content: T | string) {
    return StaticController.response(this.res, code, content);
  }

  public ok<T>(dto?: T) {
    return StaticController.k(this.res, dto);
  }

  public created<T>(dto?: T) {
    return this.response(201, dto || "Created");
  }

  public noContent() {
    return this.res.status(204);
  }

  public badRequest(message?: string) {
    return StaticController.badRequest(this.res, message);
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
    return StaticController.notFound(this.res, message);
  }

  public serverError(error: Error | string) {
    Logger.error(error);
    return this.response(500, error.toString());
  }

  public notImplemented() {
    return this.response(501, 'TODO');
  }
}

export class StaticController {

  public static async simpleController(resp: Response, next: NextFunction,
                                       call: () => any, retCode: <T>(resp: Response, content?: T | string) => Response) {
    try {
      const res = await call();
      return retCode(resp, res);
    } catch (e) {
      return StaticController.handleException(resp, next, e);
    }
  }

  public static handleException(res: Response, next: NextFunction, e: Error) {
    if (e instanceof NotFoundError)
      return StaticController.notFound(res, e.message);
    if (e instanceof ValidationError)
      return StaticController.badRequest(res, e.message);
    return StaticController.serverError(res, e);
  }

  public static response<T>(res: Response, code: number, content: T | string) {
    let body;
    if (content as T) body = content;
    else body = {message: content};
    return res.status(code).json(body);
  }

  public static k<T>(res: Response, dto?: T) {
    return StaticController.response(res, 200, dto || "OK");
  }

  public static created<T>(res: Response, dto?: T) {
    return StaticController.response(res, 201, dto || "Created");
  }

  public static accepted<T>(res: Response, dto?: T) {
    return StaticController.response(res, 202, dto || "Accepted");
  }

  public static badRequest<T>(res: Response, dto?: T) {
    return StaticController.response(res, 400, dto || "Bad Request");
  }

  public static unauthorized(res: Response, message?: string) {
    return StaticController.response(res, 401, message || "Unauthorized");
  }

  public static notFound(res: Response, message?: string) {
    return StaticController.response(res, 404, message || 'Not Found');
  }

  public static serverError(res: Response, e: Error) {
    return StaticController.response(res, 500, e);
  }

  public static notImplemented(res: Response) {
    return StaticController.response(res, 501, `Sorry, not yet implemented!`);
  }

}
