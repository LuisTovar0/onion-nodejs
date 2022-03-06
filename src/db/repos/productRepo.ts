import {Model} from 'mongoose';
import {Inject, Service} from 'typedi';

import config from "../../../config";
import {ProductId} from '../../domain/productAggregate/productId';
import ProductMapper from '../../mappers/productMapper';
import IProductDto from '../../dto/iProductDto';
import IProductDataModel from '../dataModel/iProductDataModel';
import IProductRepo from "./iRepos/iProductRepo";

@Service()
export default class ProductRepo implements IProductRepo {
  constructor(
    @Inject(config.schemas.product.name)
    private productSchema: Model<IProductDataModel>,
  ) {
  }

  public async exists(post: IProductDto): Promise<boolean> {
    const postDocument = await this.productSchema.findOne({domainId: post.domainId});
    return !!postDocument === true;
  }

  public async save(product: IProductDto): Promise<IProductDto> {
    const postDocument = await this.productSchema.findOne({domainId: product.domainId.toString()});
    const rawPost = ProductMapper.domainToDataModel(ProductMapper.dtoToDomain(product));

    if (postDocument === null) {
      const postCreated = await this.productSchema.create(rawPost);
      return ProductMapper.domainToDTO(ProductMapper.dataModelToDomain(postCreated));
    } else {
      await postDocument.save();
      return product;
    }
  }

  public async findByDomainId(postId: ProductId | string): Promise<IProductDto> {
    const postRecord = await this.productSchema.findOne({domainId: postId});
    return postRecord != null
      ? ProductMapper.domainToDTO(ProductMapper.dtoToDomain(postRecord))
      : null;
  }
}