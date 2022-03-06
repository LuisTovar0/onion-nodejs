import {model, Schema} from 'mongoose';
import IProductDataModel from '../dataModel/iProductDataModel';

const product = new Schema(
  {
    domainId: {
      type: String,
      unique: true
    },

    name: {
      type: String,
      required: [true, 'The product name is missing.'],
      index: true,
    },

    quantity: {
      type: Number,
      required: [true, 'The product quantity is missing.'],
      index: true
    }
  }, {timestamps: true}
);

export default model<IProductDataModel>('Product', product);
