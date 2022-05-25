import 'reflect-metadata'; // We need this in order to use @Decorators
import express from 'express';

import config from './config';
import Logger from './core/loaders/logger';

async function startServer() {
  const app = express();

  await require('./core/loaders').default(app);

  app.listen(config.port, () => Logger.info(`
         #####################################
         🛡️  Server listening on port: ${config.port} 🛡️ 
         #####################################
  `)).on('error', err => {
    Logger.error(err);
    process.exit(1);
    return;
  });
}

startServer();