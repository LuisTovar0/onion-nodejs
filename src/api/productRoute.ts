import {Router} from 'express';
import {celebrate, Joi} from 'celebrate';

import {Container} from 'typedi';

import config from "../../config";
import IProductController from '../controllers/iControllers/iProductController';

const route = Router();

export default (app: Router) => {

  app.use('/product', route);

  const ctrl = Container.get(config.controllers.product.name) as IProductController;

  route.get('/byid/:id',
    celebrate({params: Joi.string().uuid()}),
    (req, res, next) => ctrl.getProductById(req, res, next)
  );

  route.get('/byname/:name',
    celebrate({params: Joi.string()}),
    (req, res, next) => ctrl.getProductByName(req, res, next)
  );

  route.post('',
    celebrate({
      body: Joi.object({
        name: Joi.string().required(),
        quantity: Joi.number().required()
      })
    }), (req, res, next) => ctrl.createProduct(req, res, next)
  );

  route.put('',
    celebrate({
      body: Joi.object({
        id: Joi.string().required(),
        name: Joi.string(),
        quantity: Joi.number()
      }),
    }), (req, res, next) => ctrl.updateProduct(req, res, next)
  );

}
