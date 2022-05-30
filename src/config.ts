import dotenv from 'dotenv';
import logger from "./core/loaders/logger";

if (dotenv.config({path: `.env`}).error) {
  logger.info(`⚠ You should create our own .env file. Using example.env now.`);
  if (dotenv.config({path: `example.env`}).error)
    throw new Error("⚠️ Couldn't find .env file ⚠️");
}

export default {
  port: process.env.PORT || 45678,

  databaseURL: process.env.MONGODB_URI || "mongodb://localhost:27017/test",

  api: {prefix: '/api',},

  deps: {
    repos: {
      product: {
        name: 'ProductRepo',
        path: '../../db/repos/productRepo'
      }
    },
    services: {
      product: {
        name: 'ProductService',
        path: '../../services/productService'
      }
    },
    mappers: {
      product: {
        name: 'ProductMapper',
        path: '../../mappers/productMapper'
      }
    }
  }
};
