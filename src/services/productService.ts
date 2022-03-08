import {Inject, Service} from 'typedi';

import config from "../../config";

import IProductRepo from '../db/repos/iRepos/iProductRepo';
import Product from '../domain/productAggregate/product';
import IProductDto from "../dto/iProductDto"
import INoIdProductDto from '../dto/iNoIdDto/iNoIdProductDto';
import IProductService from './iServices/iProductService';
import IProductMapper from "../mappers/iMappers/iProductMapper";
import IUpdateProductDto from "../dto/nonEntity/iUpdateProductDto";

@Service()
export default class ProductService implements IProductService {

  constructor(
    @Inject(config.repos.product.name)
    private repo: IProductRepo,
    @Inject(config.mappers.product.name)
    private mapper: IProductMapper
  ) {
  }

  public async getProductById(productId: string): Promise<IProductDto> {
    return await this.repo.getById(productId);
  }

  public async getProductByName(productName: string): Promise<IProductDto> {
    return await this.repo.findByName(productName);
  }

  async createProduct(productDto: INoIdProductDto): Promise<IProductDto> {
    const product = Product.create(productDto);
    return await this.repo.save(this.mapper.domainToDTO(product));
  }

  public async updateProduct(newInfo: IUpdateProductDto): Promise<IProductDto> {
    const existingProduct = await this.repo.getById(newInfo.domainId);

    let name = newInfo.name === null ? existingProduct.name : newInfo.name;
    let quantity = newInfo.quantity === null ? existingProduct.quantity : newInfo.quantity;

    return await this.repo.save({
      domainId: newInfo.domainId,
      name: name,
      quantity: quantity
    } as IProductDto);
  }

}
