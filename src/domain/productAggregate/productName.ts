import {ValueObject} from "../../core/domain/valueObject";
import Result from "../../core/logic/result";
import {Guard} from "../../core/logic/guard";

interface ProductNameProps {
  value: string;
}

export default class ProductName extends ValueObject<ProductNameProps> {

  private constructor(props: ProductNameProps) {
    super(props);
  }

  public static create(name: string): Result<ProductName> {
    let nullVerif = Guard.againstNullOrUndefined(name, 'name');
    if (!nullVerif.succeeded) return Result.fail<ProductName>(nullVerif.message);

    let rangeVerif = Guard.inRange(name.length, 1, 10000, name);
    return !rangeVerif.succeeded
      ? Result.fail<ProductName>(rangeVerif.message)
      : Result.ok<ProductName>(new ProductName({value: name}));
  }

  get value(): string {
    return this.props.value;
  }

}