import {NextFunction, Request, Response} from 'express';

export default interface IProductController {

  getProductById(req: Request, res: Response, next: NextFunction);

  createProduct(req: Request, res: Response, next: NextFunction);

  updateProduct(req: Request, res: Response, next: NextFunction);

}