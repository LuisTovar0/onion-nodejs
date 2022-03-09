import {ValueObject} from "../../core/domain/valueObject";
import {Guard} from "../../core/logic/guard";

interface ProductNameProps {
  value: string;
}

export default class ProductName extends ValueObject<ProductNameProps> {

  private constructor(props: ProductNameProps) {
    super(props);
  }

  public static create(name: string): ProductName {
    Guard.againstNullOrUndefined(name, 'product name');
    Guard.inRange(name.length, 1, 200, name);
    return new ProductName({value: name});
  }

  get value(): string {
    return this.props.value;
  }

}