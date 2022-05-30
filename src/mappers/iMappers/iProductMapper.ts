import BaseMapper from "../../core/infra/baseMapper";
import Product from "../../domain/productAggregate/product";
import IProductDto from "../../dto/iProductDto";
import IProductDataModel from "../../db/dataModel/iProductDataModel";

export default interface IProductMapper extends BaseMapper<Product, IProductDto, IProductDataModel> {
}