import {ValueObject} from "../../core/domain/valueObject";
import Result from "../../core/logic/result";
import {Guard} from "../../core/logic/guard";

interface ProductQuantityProps {
  value: number
}

export default class ProductQuantity extends ValueObject<ProductQuantityProps> {

  private constructor(props: ProductQuantityProps) {
    super(props);
  }

  public static create(quantity: number): Result<ProductQuantity> {
    let nullVerif = Guard.againstNullOrUndefined(quantity, 'quantity');
    if (!nullVerif.succeeded) return Result.fail<ProductQuantity>(nullVerif.message);

    if (Number.isNaN(quantity) || !Number.isInteger(quantity))
      return Result.fail<ProductQuantity>('quantity of product must be an integer');

    let rangeVerif = Guard.inRange(quantity, 0, 250, 'quantity');
    return rangeVerif.succeeded
      ? Result.ok<ProductQuantity>(new ProductQuantity({value: quantity}))
      : Result.fail<ProductQuantity>(rangeVerif.message);
  }

  get value(): number {
    return this.props.value;
  }

}