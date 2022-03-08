import {NextFunction, Request, Response} from 'express';
import {Inject, Service} from 'typedi';

import config from "../../config";
import BaseController from '../core/infra/baseController';

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
      const product = await this.service.getProductById(req.params.id) as IProductDto;
      return this.ok(resp, product);
    } catch (e) {
      return this.handleException(e, next);
    }
  }

  public async getProductByName(req: Request, resp: Response, next: NextFunction) {
    try {
      const product = await this.service.getProductByName(req.params.name) as IProductDto;
      return this.ok(resp, product);
    } catch (e) {
      return this.handleException(e, next);
    }
  }

  public async createProduct(req: Request, resp: Response, next: NextFunction) {
    try {
      const productRes = await this.service.createProduct(req.body as INoIdProductDto) as IProductDto;
      return this.created(resp, productRes);
    } catch (e) {
      return this.handleException(e, next);
    }
  };

  public async updateProduct(req: Request, resp: Response, next: NextFunction) {
    try {
      const productRes = await this.service.updateProduct(req.body as IUpdateProductDto) as IProductDto;
      return this.ok(resp, productRes);
    } catch (e) {
      return this.handleException(e, next);
    }
  };
}