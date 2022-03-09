import {AggregateRoot} from "../../core/domain/aggregateRoot";
import UniqueEntityID from "../../core/domain/uniqueEntityID";

import INoIdProductDto from "../../dto/iNoIdDto/iNoIdProductDto";
import ProductName from "./productName";
import ProductQuantity from "./productQuantity";

interface PostProps {
  name: ProductName;
  quantity: ProductQuantity;
}

export default class Product extends AggregateRoot<PostProps> {

  private constructor(props: PostProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(dto: INoIdProductDto, id?: UniqueEntityID): Product {
    let name: ProductName = ProductName.create(dto.name);
    let quant: ProductQuantity = ProductQuantity.create(dto.quantity);
    return new Product({name: name, quantity: quant}, id);
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