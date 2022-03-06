import Result from "../../core/logic/result";
import INoIdProductDto from "../../dto/iNoIdDto/iNoIdProductDto";
import IProductDto from "../../dto/iProductDto";

export default interface IProductService {

  createProduct(postDto: INoIdProductDto): Promise<Result<IProductDto>>;

  updateProduct(postDto: IProductDto): Promise<Result<IProductDto>>;

  getProduct(postId: string): Promise<Result<IProductDto>>;

}
