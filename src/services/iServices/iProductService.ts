import INoIdProductDto from "../../dto/iNoIdDto/iNoIdProductDto";
import IProductDto from "../../dto/iProductDto";
import IUpdateProductDto from "../../dto/nonEntity/iUpdateProductDto";

export default interface IProductService {

  createProduct(postDto: INoIdProductDto): Promise<IProductDto>;

  updateProduct(postDto: IUpdateProductDto): Promise<IProductDto>;

  getProductById(postId: string): Promise<IProductDto>;

  getProductByName(productName: string): Promise<IProductDto>;

}
