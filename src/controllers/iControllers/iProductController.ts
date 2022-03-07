import {NextFunction, Request, Response} from 'express';

export default interface IProductController {

  getProductById(req: Request, resp: Response, next: NextFunction);

  getProductByName(req: Request, resp: Response, next: NextFunction);

  createProduct(req: Request, resp: Response, next: NextFunction);

  updateProduct(req: Request, resp: Response, next: NextFunction);

}