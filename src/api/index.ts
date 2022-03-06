import {Router} from 'express';
import post from './productRoute';

export default () => {
  const app = Router();

  post(app);
  //player(app);

  return app
}