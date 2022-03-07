import Result from "../../core/logic/result";
import INoIdProductDto from "../../dto/iNoIdDto/iNoIdProductDto";
import IProductDto from "../../dto/iProductDto";
import IUpdateProductDto from "../../dto/nonEntity/iUpdateProductDto";

export default interface IProductService {

  createProduct(postDto: INoIdProductDto): Promise<Result<IProductDto>>;

  updateProduct(postDto: IUpdateProductDto): Promise<Result<IProductDto>>;

  getProductById(postId: string): Promise<Result<IProductDto>>;

  getProductByName(productName: string): Promise<Result<IProductDto>>;

}
