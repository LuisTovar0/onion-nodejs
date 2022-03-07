import Mapper from "../../core/infra/mapper";
import Product from "../../domain/productAggregate/product";
import IProductDto from "../../dto/iProductDto";
import IProductDataModel from "../../db/dataModel/iProductDataModel";

export default interface IProductMapper extends Mapper<Product, IProductDto, IProductDataModel> {
}