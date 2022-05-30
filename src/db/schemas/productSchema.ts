import {model, Schema} from 'mongoose';
import IProductDataModel from '../dataModel/iProductDataModel';

const productSchema = model<IProductDataModel>('Product', new Schema(
  {
    domainId: {
      type: String,
      unique: true
    },
    name: {
      type: String,
      required: [true, 'Persistence requires a product name.'],
      unique: true,
    },
    quantity: {
      type: Number,
      required: [true, 'Persistence requires a product quantity.'],
      index: true
    }
  }, {timestamps: true}
));

export default productSchema;
