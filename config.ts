import dotenv from 'dotenv';

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();
if (!envFound) {
  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export default {
  port: parseInt(process.env.PORT, 10) || 3000,

  databaseURL: process.env.MONGODB_URI || "mongodb://localhost:27017/test",

  api: {prefix: '/controllers',},

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
  },
  schemas: {
    product: {
      name: 'ProductSchema',
      path: '../../db/schemas/productSchema',
    }
  }
};
