import {NextFunction, Request, Response, Router} from 'express';
import {celebrate, Joi} from 'celebrate';
import {Container} from 'typedi';

import config from "../../config";
import IProductDto from "../dto/iProductDto";
import {BaseController, StaticController} from "../core/infra/baseController";
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
      return await StaticController.simpleController(res, next,
        async () => await service.getProductById(req.params.id),
        StaticController.ok);
    }
  );

  route.get('/byname/:name',
    celebrate({
      params: {
        name: Joi.string()
      }
    }),
    async function getProductByName(req, res, next) {
      return await StaticController.simpleController(res, next,
        async () => await service.getProductByName(req.params.name),
        StaticController.ok);
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
      return await StaticController.simpleController(res, next,
        async () => await service.createProduct(req.body as INoIdProductDto),
        StaticController.created);
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
      // this is not a complex example, but it shows how the more complex controllers can be made
      const controller = new BaseController(req, res, next);
      try {
        const productRes: IProductDto = await service.updateProduct(req.body as IUpdateProductDto);
        return controller.ok(productRes);
      } catch (e) {
        return controller.handleException(e);
      }
    }
  );

}
