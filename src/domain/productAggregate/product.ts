import {AggregateRoot} from "../../core/domain/aggregateRoot";
import {UniqueEntityID} from "../../core/domain/uniqueEntityID";
import Result from "../../core/logic/result";
import {Guard} from "../../core/logic/guard";

import INoIdProductDto from "../../dto/iNoIdDto/iNoIdProductDto";
import {ProductName} from "./productName";
import ProductQuantity from "./productQuantity";

interface PostProps {
  name: ProductName;
  quantity: ProductQuantity;
}

export default class Product extends AggregateRoot<PostProps> {

  private constructor(props: PostProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(dto: INoIdProductDto, id?: UniqueEntityID): Result<Product> {
    const guardResult = Guard.againstNullOrUndefinedBulk([
      {argument: dto.name, argumentName: 'product name'},
      {argument: dto.quantity, argumentName: 'product quantity'}
    ]);
    if (!guardResult.succeeded) return Result.fail<Product>(guardResult.message)

    let nameRes = ProductName.create(dto.name);
    if (!nameRes.isSuccess) throw new Error('Invalid product name: ' + nameRes.error);

    let quantRes = ProductQuantity.create(dto.quantity);
    if (!quantRes.isSuccess) throw new Error('Invalid product quantity: ' + quantRes.error);

    const product = new Product({name: nameRes.getValue(), quantity: quantRes.getValue()}, id);
    return Result.ok<Product>(product);
  }

  get id(): UniqueEntityID {
    return this._id;
  }

  get name(): ProductName {
    return this.props.name;
  }

  get quantity(): ProductQuantity {
    return this.props.quantity;
  }

}