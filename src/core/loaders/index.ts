import expressLoader from './express';
import setUpDependencyInjections from './dependencyInjector';
import mongooseLoader from "./mongoose";
import config from '../../config';
import Logger from "./logger";
import {Application} from 'express';

export default async (expressApp: Application) => {
  await mongooseLoader();
  Logger.info('🤙 DB loaded and connected!');

  // turning each dependency set (repos,services,mappers,schemas) from config into an iterable
  await setUpDependencyInjections(config.deps);
  Logger.info('😎 All dependencies are loaded');

  await expressLoader(expressApp);
  Logger.info('👊 Express loaded');
};
