import {NextFunction, Request, Response, Router} from 'express';
import {celebrate, Joi} from 'celebrate';
import {Container} from 'typedi';

import config from "../config";
import {BaseController, StaticController} from "../core/infra/baseController";
import INoIdProductDto from "../dto/iNoIdDto/iNoIdProductDto";
import IUpdateProductDto from "../dto/nonEntity/iUpdateProductDto";
import IProductDto from "../dto/iProductDto";
import IProductService from "../services/iServices/iProductService";

const route = Router();

export default (app: Router) => {

  app.use('/product', route);

  route.get('', (req, res) => StaticController.ok(res, 'Hello World!'));

  const service = Container.get(config.deps.services.product.name) as IProductService;

  route.get('/byid/:id',
    celebrate({
      params: {
        id: Joi.string().uuid()
      }
    }),
    async (req, res, next) =>
      await StaticController.simpleController(res, next, async () =>
        await service.getProductById((req.query.id || '').toString()), StaticController.ok)
  );

  route.get('/byname',
    celebrate({
      params: {
        name: Joi.string().required()
      }
    }),
    async (req, res, next) => {
      const name = req.query.name?.toString();
      return await StaticController.simpleController(res, next,
        async () => await service.getProductByName(name as string),
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
    async (req: Request, res: Response, next: NextFunction) =>
      await StaticController.simpleController(res, next, async () =>
        await service.createProduct(req.body as INoIdProductDto), StaticController.created)
  );

  route.put('',
    celebrate({
      body: Joi.object({
        id: Joi.string().required(),
        name: Joi.string(),
        quantity: Joi.number()
      }),
    }),
    async (req, res, next) => {
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
