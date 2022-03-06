import {UniqueEntityID} from "../core/domain/uniqueEntityID";
import {Mapper} from "../core/infra/mapper";
import IProductDataModel from "../db/dataModel/iProductDataModel";
import Product from "../domain/productAggregate/product";
import IProductDto from "../dto/iProductDto";
import {getValueOrThrowError} from "../core/logic/result";

export default class ProductMapper extends Mapper<Product> {

  public static domainToDTO(product: Product): IProductDto {
    return {
      domainId: product.id.toString(),
      name: product.name.value,
    } as IProductDto;
  }

  public static dtoToDomain(product: IProductDto): Product {
    let productRes = Product.create(product, new UniqueEntityID(product.domainId));
    return getValueOrThrowError(productRes);
  }

  public static dataModelToDomain(dataModel: IProductDataModel): Product {
    let productRes = Product.create({
      name: dataModel.name,
      quantity: dataModel.quantity
    }, new UniqueEntityID(dataModel.domainId));
    return getValueOrThrowError(productRes);
  }

  public static domainToDataModel(product: Product): IProductDataModel {
    return {
      domainId: product.id.toString(),
      name: product.name.value,
      quantity: product.quantity.value
    }
  }

}