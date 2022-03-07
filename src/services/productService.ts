import {Inject, Service} from 'typedi';

import config from "../../config";
import Result from "../core/logic/result";

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

  public async getProductById(productId: string): Promise<Result<IProductDto>> {
    const product = await this.repo.getById(productId);
    return product === null
      ? Result.fail<IProductDto>("Product Not Found.")
      : Result.ok<IProductDto>(product);
  }

  public async getProductByName(productName: string): Promise<Result<IProductDto>> {
    const product = await this.repo.findByName(productName);
    return product === null
      ? Result.fail<IProductDto>("Product Not Found.")
      : Result.ok<IProductDto>(product);
  }

  async createProduct(productDto: INoIdProductDto): Promise<Result<IProductDto>> {
    const productRes = await Product.create(productDto);
    if (!productRes.isSuccess) return Result.fail<IProductDto>(productRes.errorValue());

    let persistedProduct = await this.repo.save(this.mapper.domainToDTO(productRes.getValue()));
    return Result.ok<IProductDto>(persistedProduct);
  }

  public async updateProduct(newInfo: IUpdateProductDto): Promise<Result<IProductDto>> {
    const existingProduct = await this.repo.getById(newInfo.domainId);
    if (existingProduct === null) return Result.fail<IProductDto>("Product Not Found.");

    let name = newInfo.name === null ? existingProduct.name : newInfo.name;
    let quantity = newInfo.quantity === null ? existingProduct.quantity : newInfo.quantity;

    let persisted = await this.repo.save({domainId: newInfo.domainId, name: name, quantity: quantity});
    return Result.ok<IProductDto>(persisted);
  }

}
