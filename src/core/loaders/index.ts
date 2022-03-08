import expressLoader from './express';
import setUpDependencyInjections from './dependencyInjector';
import mongooseLoader from "./mongoose";
import config from '../../../config';
import Logger from "./logger";

export default async expressApp => {
  await mongooseLoader();
  Logger.info('🤙 DB loaded and connected!');

  await setUpDependencyInjections({
    services: [config.services.product],
    repos: [config.repos.product],
    mappers: [config.mappers.product],
    schemas: [config.schemas.product]
  });
  Logger.info('😎 All dependencies are loaded');

  await expressLoader(expressApp);
  Logger.info('👊 Express loaded');
};
