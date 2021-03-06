import {Inject, Service} from 'typedi';

import config from "../config";

import IProductRepo from '../db/repos/iRepos/iProductRepo';
import Product from '../domain/productAggregate/product';
import IProductDto from "../dto/iProductDto";
import INoIdProductDto from '../dto/iNoIdDto/iNoIdProductDto';
import IProductService from './iServices/iProductService';
import IProductMapper from "../mappers/iMappers/iProductMapper";
import IUpdateProductDto from "../dto/nonEntity/iUpdateProductDto";
import NotFoundError from "../core/logic/notFoundError";
import UniqueEntityID from "../core/domain/uniqueEntityID";

@Service()
export default class ProductService implements IProductService {

  constructor(
    @Inject(config.deps.repos.product.name)
    private repo: IProductRepo,
    @Inject(config.deps.mappers.product.name)
    private mapper: IProductMapper
  ) {
  }

  public async getProductById(productId: string): Promise<IProductDto> {
    return await this.repo.getById(productId);
  }

  public async getProductByName(productName: string): Promise<IProductDto> {
    return await this.repo.getByName(productName);
  }

  async createProduct(productDto: INoIdProductDto): Promise<IProductDto> {
    const product = Product.create(productDto);
    return await this.repo.save(this.mapper.domainToDTO(product));
  }

  public async updateProduct(newInfo: IUpdateProductDto): Promise<IProductDto> {
    const existingProduct = await this.repo.getById(newInfo.domainId);
    if (existingProduct === null)
      throw new NotFoundError('Product with ID ' + newInfo.domainId + ' was not found.');

    const newProd = Product.create({
      name: newInfo.name === undefined ? existingProduct.name : newInfo.name,
      quantity: newInfo.quantity === undefined ? existingProduct.quantity : newInfo.quantity
    }, new UniqueEntityID(newInfo.domainId));

    return await this.repo.save(this.mapper.domainToDTO(newProd));
  }

}
