import {ValueObject} from "../../core/domain/valueObject";
import {Guard} from "../../core/logic/guard";
import ValidationError from "../../core/logic/validationError";

interface ProductQuantityProps {
  value: number
}

export default class ProductQuantity extends ValueObject<ProductQuantityProps> {

  private constructor(props: ProductQuantityProps) {
    super(props);
  }

  public static create(quantity: number): ProductQuantity {
    Guard.againstNullOrUndefined(quantity, 'product quantity');
    if (Number.isNaN(quantity) || !Number.isInteger(quantity))
      throw new ValidationError('Quantity of product must be an integer');
    Guard.inRange(quantity, 0, 250, 'quantity');

    return new ProductQuantity({value: quantity});
  }

  get value(): number {
    return this.props.value;
  }

}