import {Router} from 'express';
import {celebrate, Joi} from 'celebrate';

import {Container} from 'typedi';

import config from "../../config";
import IProductController from '../controllers/iControllers/iProductController';

const route = Router();

export default (app: Router) => {
  app.use('/posts', route);

  const ctrl = Container.get(config.controllers.product.name) as IProductController;

  route.get('',
    celebrate({
      body: Joi.object({
        id: Joi.string().required(),
      }),
    }),
    (req, res, next) => ctrl.getProductById(req, res, next));

  route.post('',
    celebrate({
      body: Joi.object({
        name: Joi.string().required()
      })
    }),
    (req, res, next) => ctrl.createProduct(req, res, next));

  route.put('',
    celebrate({
      body: Joi.object({
        id: Joi.string().required(),
        name: Joi.string().required()
      }),
    }),
    (req, res, next) => ctrl.updateProduct(req, res, next));
};