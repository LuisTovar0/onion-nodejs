import IProductDto from "../../../dto/iProductDto";

export default interface IProductRepo {

  save(product: IProductDto): Promise<IProductDto>;

  getById(id: string): Promise<IProductDto>;

  findByName(productName: string): Promise<IProductDto>;

}