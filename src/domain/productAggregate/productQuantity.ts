import {ValueObject} from "../../core/domain/valueObject";
import {Guard} from "../../core/logic/guard";

interface ProductQuantityProps {
  value: number
}

export default class ProductQuantity extends ValueObject<ProductQuantityProps> {

  private constructor(props: ProductQuantityProps) {
    super(props);
  }

  public static create(quantity: number): ProductQuantity {
    Guard.againstNullOrUndefined(quantity, 'product quantity');
    Guard.isInteger(quantity, 'product quantity');
    Guard.inRange(quantity, 0, Number.MAX_VALUE, 'product quantity');
    return new ProductQuantity({value: quantity});
  }

  get value(): number {
    return this.props.value;
  }

}