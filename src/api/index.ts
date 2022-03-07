import {Router} from 'express';
import product from './productRoute';

export default () => {
  const app = Router();

  product(app);

  return app;
}