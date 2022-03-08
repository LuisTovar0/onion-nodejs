import {Model} from "mongoose";

import ValidationError from "../logic/validationError";
import DataModel from "./dataModel";

export default class BaseRepo<TDataModel extends DataModel> {

  constructor(protected productSchema: Model<TDataModel>) {
  }

  protected async findByDomainId(id: string): Promise<TDataModel> {
    return this.productSchema.findOne({domainId: id});
  }

  protected async persist(t: TDataModel): Promise<TDataModel> {
    const existingDataModel = await this.findByDomainId(t.domainId);
    if (existingDataModel !== null)
      throw new ValidationError('ID ' + t.domainId + ' already exists.');
    return await this.productSchema.create(t);
  }

}