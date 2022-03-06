import {NextFunction, Request, Response} from 'express';
import {Inject, Service} from 'typedi';

import config from "../../config";
import BaseController from '../core/infra/baseController';
import Result from "../core/logic/result";

import IProductDto from '../dto/iProductDto';
import IProductService from '../services/iServices/iProductService';
import IProductController from "./iControllers/iProductController";

@Service()
export default class ProductController extends BaseController implements IProductController {

  protected executeImpl(): Promise<any> {
    throw new Error('Method not implemented.');
  }

  constructor(
    @Inject(config.services.product.name)
    private productServiceInstance: IProductService
  ) {
    super();
  }

  public async getProductById(req: Request, resp: Response, next: NextFunction) {
    try {
      const productRes = await this.productServiceInstance.getProduct(req.params.id) as Result<IProductDto>;

      if (!productRes.isSuccess) return this.notFound(productRes.error.toString());

      return this.created(resp, productRes.getValue());
    } catch (e) {
      return next(e);
    }
  }

  public async createProduct(req: Request, resp: Response, next: NextFunction) {
    try {
      const productRes = await this.productServiceInstance.createProduct(req.body as IProductDto) as Result<IProductDto>;

      if (!productRes.isSuccess) return resp.status(402).send();

      return this.created(resp, productRes.getValue());
    } catch (e) {
      return next(e);
    }
  };

  public async updateProduct(req: Request, resp: Response, next: NextFunction) {
    try {
      const productRes = await this.productServiceInstance.updateProduct(req.body as IProductDto) as Result<IProductDto>;

      if (!productRes.isSuccess) return this.notFound(productRes.error.toString());

      return this.created(resp, productRes.getValue());
    } catch (e) {
      return next(e);
    }
  };
}