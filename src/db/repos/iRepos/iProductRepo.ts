import IProductDto from "../../../dto/iProductDto";

export default interface IProductRepo {

  save(product: IProductDto): Promise<IProductDto>;

  getById(id: string): Promise<IProductDto>;

  getByName(productName: string): Promise<IProductDto>;

}