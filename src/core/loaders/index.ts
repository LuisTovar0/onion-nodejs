import expressLoader from './express';
import setUpDependencyInjections, {NamePath} from './dependencyInjector';
import mongooseLoader from "./mongoose";
import config from '../../../config';
import Logger from "./logger";
import {Application} from 'express';

export default async (expressApp: Application) => {
  await mongooseLoader();
  Logger.info('🤙 DB loaded and connected!');

  // turning each dependency set (repos,services,mappers,schemas) from config into an iterable
  const repos: NamePath[] = [], services: NamePath[] = [], mappers: NamePath[] = [], schemas: NamePath[] = [];
  [{t: config.repos, l: repos}, {t: config.services, l: services},
    {t: config.mappers, l: mappers}, {t: config.schemas, l: schemas}].forEach((value) => {
    Object.entries(value.t).forEach(([, val]) => value.l.push(val));
  });
  await setUpDependencyInjections({services, repos, mappers, schemas});
  Logger.info('😎 All dependencies are loaded');

  await expressLoader(expressApp);
  Logger.info('👊 Express loaded');
};
