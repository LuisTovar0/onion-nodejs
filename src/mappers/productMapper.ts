import {Service} from "typedi";

import UniqueEntityID from "../core/domain/uniqueEntityID";
import IProductDataModel from "../db/dataModel/iProductDataModel";
import Product from "../domain/productAggregate/product";
import IProductDto from "../dto/iProductDto";
import IProductMapper from "./iMappers/iProductMapper";

@Service()
export default class ProductMapper implements IProductMapper {

  public domainToDTO(product: Product): IProductDto {
    return {
      domainId: product.id.toString(),
      name: product.name.value,
      quantity: product.quantity.value
    } as IProductDto;
  }

  public dtoToDomain(product: IProductDto): Product {
    return Product.create(product, new UniqueEntityID(product.domainId));
  }

  public dataModelToDTO(dataModel: IProductDataModel): IProductDto {
    return {
      domainId: dataModel.domainId,
      name: dataModel.name,
      quantity: dataModel.quantity
    }
  }

  public dtoToDataModel(dto: IProductDto): IProductDataModel {
    return {
      domainId: dto.domainId,
      name: dto.name,
      quantity: dto.quantity
    }
  }

}
