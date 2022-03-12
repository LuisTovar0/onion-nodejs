import {NextFunction, Request, Response, Router} from 'express';
import {celebrate, Joi} from 'celebrate';
import {Container} from 'typedi';

import config from "../../config";
import IProductDto from "../dto/iProductDto";
import BaseController from "../core/infra/baseController";
import IProductService from "../services/iServices/iProductService";
import INoIdProductDto from "../dto/iNoIdDto/iNoIdProductDto";
import IUpdateProductDto from "../dto/nonEntity/iUpdateProductDto";

const route = Router();

export default (app: Router) => {

  app.use('/product', route);

  const service = Container.get(config.services.product.name) as IProductService;

  route.get('/byid/:id',
    celebrate({
      params: {
        id: Joi.string().uuid()
      }
    }),
    async function getProductById(req, res, next) {
      const ctrl = new BaseController(req, res, next);
      try {
        const product: IProductDto = await service.getProductById(req.params.id);
        return ctrl.ok(product);
      } catch (e) {
        return ctrl.handleException(e);
      }
    }
  );

  route.get('/byname/:name',
    celebrate({
      params: {
        name: Joi.string()
      }
    }),
    async function getProductByName(req, res, next) {
      const ctrl = new BaseController(req, res, next);
      try {
        const product: IProductDto = await this.service.getProductByName(req.params.name);
        return ctrl.ok(product);
      } catch (e) {
        return this.handleException(e);
      }
    }
  );

  route.post('',
    celebrate({
      body: Joi.object({
        name: Joi.string().required(),
        quantity: Joi.number().required()
      })
    }),
    async function createProduct(req: Request, res: Response, next: NextFunction) {
      const ctrl = new BaseController(req, res, next);
      try {
        const product: IProductDto = await this.service.createProduct(req.body as INoIdProductDto);
        return ctrl.created(product);
      } catch (e) {
        return ctrl.handleException(e);
      }
    }
  );

  route.put('',
    celebrate({
      body: Joi.object({
        id: Joi.string().required(),
        name: Joi.string(),
        quantity: Joi.number()
      }),
    }),
    async function updateProduct(req, res, next) {
      const ctrl = new BaseController(req, res, next);
      try {
        const productRes: IProductDto = await this.service.updateProduct(req.body as IUpdateProductDto);
        return ctrl.ok(productRes);
      } catch (e) {
        return ctrl.handleException(e);
      }
    }
  );

}
