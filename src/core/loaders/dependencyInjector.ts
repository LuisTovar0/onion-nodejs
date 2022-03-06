import {Container} from 'typedi';
import Logger from './logger';

interface InjectablesAndSchemas {
  schemas: NamePath[]
  repos: NamePath[],
  services: NamePath[],
  controllers: NamePath[],
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
    });

    let setupDep = (deps: NamePath[]) =>
      deps.forEach(dep => {
        // load the @Service() class by its path
        let class_ = require(dep.path).default;
        // create/get the instance of the @Service() class
        let classInstance = Container.get(class_);
        // rename the instance inside the container
        Container.set(dep.name, classInstance);
      });

    setupDep(depNamesPaths.repos);
    setupDep(depNamesPaths.services);
    setupDep(depNamesPaths.controllers);

  } catch (e) {
    Logger.error('🔥 Error on dependency injector loader\n');
    throw e;
  }
};
