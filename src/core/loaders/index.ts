import expressLoader from './express';
import setUpDependencyInjections from './dependencyInjector';
import mongooseLoader from "./mongoose";
import config from '../../../config';
import Logger from "./logger";

export default async expressApp => {
  await mongooseLoader();
  Logger.info('✌️ DB loaded and connected!');

  await setUpDependencyInjections({
    controllers: [config.controllers.product],
    services: [config.services.product],
    repos: [config.repos.product],
    schemas: [config.schemas.product]
  });
  Logger.info('✌️ Schemas, Controllers, Repositories, Services, etc. loaded');

  await expressLoader(expressApp);
  Logger.info('✌️ Express loaded');
};
