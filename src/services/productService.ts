import {Inject, Service} from 'typedi';

import config from "../../config";
import Result from "../core/logic/result";

import IProductRepo from '../db/repos/iRepos/iProductRepo';
import Product from '../domain/productAggregate/product';
import IProductDto from "../dto/iProductDto"
import INoIdProductDto from '../dto/iNoIdDto/iNoIdProductDto';
import ProductMapper from "../mappers/productMapper";
import IProductService from './iServices/iProductService';

@Service()
export default class ProductService implements IProductService {

  constructor(
    @Inject(config.repos.product.name)
    private productRepo: IProductRepo,
  ) {
  }

  public async getProduct(productId: string): Promise<Result<IProductDto>> {
    const product = await this.productRepo.findByDomainId(productId);
    return product === null
      ? Result.fail<IProductDto>("Product Not Found.")
      : Result.ok<IProductDto>(product);
  }

  public async createProduct(productDto: INoIdProductDto): Promise<Result<IProductDto>> {
    const productOrError = await Product.create(productDto);

    if (!productOrError.isSuccess)
      return Result.fail<IProductDto>(productOrError.errorValue());

    let persistedProduct = await this.productRepo.save(ProductMapper.domainToDTO(productOrError.getValue()));

    return Result.ok<IProductDto>(persistedProduct)
  }

  public async updateProduct(productDto: IProductDto): Promise<Result<IProductDto>> {
    const product = await this.productRepo.findByDomainId(productDto.domainId);

    if (product === null) return Result.fail<IProductDto>("Product Not Found.");

    await this.productRepo.save(product);
    return Result.ok<IProductDto>(product);
  }

}
