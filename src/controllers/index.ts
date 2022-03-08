import {Router} from 'express';
import product from './productController';

export default () => {
  const app = Router();

  product(app);

  return app;
}