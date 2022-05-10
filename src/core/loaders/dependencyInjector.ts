import {Container} from 'typedi';
import Logger from './logger';

export interface InjectablesAndSchemas {
  schemas: any,
  mappers: any,
  repos: any,
  services: any
}

export interface NamePath {
  name: string,
  path: string
}

export default (depNamesPaths: InjectablesAndSchemas) => {
  try {
    Container.set('logger', Logger);

    /**
     * We are injecting the mongoose models into the DI container.
     * This is controversial but it will provide a lot of flexibility
     * at the time of writing unit tests.
     */
    Object.entries(depNamesPaths.schemas).forEach(([, val]) => {
      const dep = <NamePath>val;
      let schema = require(dep.path).default;
      Container.set(dep.name, schema);
      Logger.info('👌 ' + dep.name + ' loaded');
    });

    // a class can only be set after its own dependencies are set
    [depNamesPaths.mappers,// can only depend on each other (must be ordered)
      depNamesPaths.repos, // depend on mappers
      depNamesPaths.services// depend on repos and on each other (must be ordered)
    ].forEach((deps) => {
      Object.entries(deps).forEach(([, val]) => {
        const dep = <NamePath>val;
        // load the @Service() class by its path
        let class_ = require(dep.path).default;
        // create/get the instance of the @Service() class
        let classInstance = Container.get(class_);
        // rename the instance inside the container
        Container.set(dep.name, classInstance);
        Logger.info('👌 ' + dep.name + ' loaded');
      });
    });

  } catch (e) {
    Logger.error(`🔥 Error on dependency injector loader!
If the failing class has dependencies, those must be set up first in the Container, so make sure the definitions in \
your config.ts are correctly ordered. Also, might not be the problem, but classes obviously can't have mutual dependency.`);
    throw e;
  }
};
