import {Model} from 'mongoose';
import {Inject, Service} from 'typedi';

import config from "../../../config";
import BaseRepo from "../../core/infra/repo";
import IProductDto from '../../dto/iProductDto';
import IProductDataModel from '../dataModel/iProductDataModel';
import IProductRepo from "./iRepos/iProductRepo";
import IProductMapper from "../../mappers/iMappers/iProductMapper";

@Service()
export default class ProductRepo extends BaseRepo<IProductDataModel> implements IProductRepo {

  constructor(
    @Inject(config.mappers.product.name)
    private mapper: IProductMapper,
    @Inject(config.schemas.product.name)
      productSchema: Model<IProductDataModel>
  ) {
    super(productSchema);
  }

  public async save(product: IProductDto): Promise<IProductDto> {
    const productToPersist = this.mapper.dtoToDataModel(product);
    const persistedProduct = await this.persist(productToPersist);
    return this.mapper.dataModelToDTO(persistedProduct);
  }

  public async getById(productId: string): Promise<IProductDto> {
    const dataModel = await this.findByDomainId(productId);
    return dataModel == null ? null : this.mapper.dataModelToDTO(dataModel);
  }

  public async findByName(productName: string): Promise<IProductDto> {
    const productDataModel = await this.productSchema.findOne({name: productName});
    return productDataModel == null ? null : this.mapper.dataModelToDTO(productDataModel);
  }

}