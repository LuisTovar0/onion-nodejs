import {Container} from 'typedi';
import Logger from './logger';

interface InjectablesAndSchemas {
  schemas: NamePath[],
  mappers: NamePath[],
  repos: NamePath[],
  services: NamePath[],
}

interface NamePath {
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
    depNamesPaths.schemas.forEach(dep => {
      let schema = require(dep.path).default;
      Container.set(dep.name, schema);
      Logger.info('👌 ' + dep.name + ' loaded');
    });

    let setupDep = (deps: NamePath[]) =>
      deps.forEach(dep => {
        // load the @Service() class by its path
        let class_ = require(dep.path).default;
        // create/get the instance of the @Service() class
        let classInstance = Container.get(class_);
        // rename the instance inside the container
        Container.set(dep.name, classInstance);
        Logger.info('👌 ' + dep.name + ' loaded');
      });

    // a class can only be set after its own dependencies are set
    setupDep(depNamesPaths.mappers); // can only depend on each other
    setupDep(depNamesPaths.repos); // depend on mappers
    setupDep(depNamesPaths.services); // depend on repos

  } catch (e) {
    Logger.error('🔥 Error on dependency injector loader! ' +
      'If the failing class has dependencies, those must be set up first in the Container.\n');
    throw e;
  }
};
