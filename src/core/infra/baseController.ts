import * as express from 'express'

export default abstract class BaseController {
  // or even private
  protected req: express.Request;
  protected res: express.Response;

  public static messageResponse(res: express.Response, code: number, message: string) {
    return res.status(code).json({message})
  }

  public ok<T>(res: express.Response, dto?: T) {
    return !!dto ? res.status(200).json(dto) : res.sendStatus(200);
  }

  public created<T>(res: express.Response, dto?: T) {
    return res.status(201).json(dto);
  }

  public badRequest(message?: string) {
    return BaseController.messageResponse(this.res, 400, message ? message : "Bad Request");
  }

  public unauthorized(message?: string) {
    return BaseController.messageResponse(this.res, 401, message ? message : 'Unauthorized');
  }

  public paymentRequired(message?: string) {
    return BaseController.messageResponse(this.res, 402, message ? message : 'Payment required');
  }

  public forbidden(message?: string) {
    return BaseController.messageResponse(this.res, 403, message ? message : 'Forbidden');
  }

  public notFound(message?: string) {
    return BaseController.messageResponse(this.res, 404, message ? message : 'Not found');
  }

  public conflict(message?: string) {
    return BaseController.messageResponse(this.res, 409, message ? message : 'Conflict');
  }

  public tooMany(message?: string) {
    return BaseController.messageResponse(this.res, 429, message ? message : 'Too many requests');
  }

  public todo() {
    return BaseController.messageResponse(this.res, 400, 'TODO');
  }

  public fail(error: Error | string) {
    console.log(error);
    return this.res.status(500).json({
      message: error.toString()
    })
  }
}