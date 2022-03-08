import {NextFunction, Request, Response} from 'express';
import {Inject, Service} from 'typedi';

import config from "../../config";
import BaseController from '../core/infra/baseController';
import Result from "../core/logic/result";

import IUpdateProductDto from "../dto/nonEntity/iUpdateProductDto";
import IProductDto from '../dto/iProductDto';
import IProductService from '../services/iServices/iProductService';
import IProductController from "./iControllers/iProductController";
import INoIdProductDto from "../dto/iNoIdDto/iNoIdProductDto";

@Service()
export default class ProductController extends BaseController implements IProductController {

  constructor(
    @Inject(config.services.product.name)
    private service: IProductService
  ) {
    super();
  }

  public async getProductById(req: Request, resp: Response, next: NextFunction) {
    try {
      const productRes = await this.service.getProductById(req.params.id) as Result<IProductDto>;
      if (!productRes.isSuccess) return this.notFound(productRes.error.toString());
      return this.ok(resp, productRes.getValue());
    } catch (e) {
      return next(e);
    }
  }

  public async getProductByName(req: Request, resp: Response, next: NextFunction) {
    try {
      const productRes = await this.service.getProductByName(req.params.name) as Result<IProductDto>;
      if (!productRes.isSuccess) return this.notFound(productRes.error.toString());
      return this.ok(resp, productRes.getValue());
    } catch (e) {
      return next(e);
    }
  }

  public async createProduct(req: Request, resp: Response, next: NextFunction) {
    try {
      const productRes = await this.service.createProduct(req.body as INoIdProductDto) as Result<IProductDto>;
      if (!productRes.isSuccess) return this.badRequest(productRes.error.toString());
      return this.created(resp, productRes.getValue());
    } catch (e) {
      return next(e);
    }
  };

  public async updateProduct(req: Request, resp: Response, next: NextFunction) {
    try {
      const productRes = await this.service.updateProduct(req.body as IUpdateProductDto) as Result<IProductDto>;
      if (!productRes.isSuccess) return this.notFound(productRes.error.toString());
      return this.ok(resp, productRes.getValue());
    } catch (e) {
      return next(e);
    }
  };
}