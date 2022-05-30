import {Container} from 'typedi';
import Logger from './logger';
import config from "../../config";

export interface InjectablesAndSchemas {
  mappers: NamePathMap,
  repos: NamePathMap,
  services: NamePathMap
}

export interface NamePathMap {
  [k: string]: NamePath;
}

export interface NamePath {
  name: string,
  path: string
}

export default () => {
  try {
    Container.set('logger', Logger);

    const depNamesPaths = config.deps as InjectablesAndSchemas;

    // a class can only be set after its own dependencies are set
    [depNamesPaths.mappers,// can only depend on each other (must be ordered)
      depNamesPaths.repos, // depend on mappers
      depNamesPaths.services// depend on repos and on each other (must be ordered)
    ].forEach((deps) => {
      Object.entries(deps).forEach(([, dep]) => {
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
    Logger.error(`🔥 Error on dependency injector loader! Potential causes:
  - The failing class has Type errors.
  - If the failing class has dependencies, those must be set up first in the Container. With this in mind, make sure the \
definitions in your config.ts are correctly ordered.
  - Classes obviously can't have mutual dependency.`);
    throw e;
  }
};
