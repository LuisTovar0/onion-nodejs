import * as assert from "assert";
import ProductQuantity from "../../../../src/domain/productAggregate/productQuantity";
import ValidationError from "../../../../src/core/logic/validationError";
import {badNum} from "../../../constants";

describe('Unit: ProductQuantity', () => {

  describe('create - static method', () => {
    it('throws ValidationError if quantity is null or undifined', () => {
      assert.throws(() => ProductQuantity.create(badNum), ValidationError);
      assert.throws(() => ProductQuantity.create(undefined as unknown as number), ValidationError);
    });

    it('throws ValidationError if quantity is not integer', () =>
      assert.throws(() => ProductQuantity.create(15.6), ValidationError)
    );

    it('throws ValidationError if quantity is negative', () =>
      assert.throws(() => ProductQuantity.create(-1), ValidationError)
    );

    it('has right value if quantity is valid', () => {
      const num = 124;
      const quantity = ProductQuantity.create(num);
      assert.equal(quantity.value, num);
    });
  });

});