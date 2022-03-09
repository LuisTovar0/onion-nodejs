import * as assert from "assert";

import ValidationError from "../../../../src/core/logic/validationError";
import ProductName from "../../../../src/domain/productAggregate/productName";

describe('Unit: ProductName', () => {

  describe('create - static method', () => {
    it('throws ValidationError if name is null or undefined', () => {
      assert.throws(() => ProductName.create(null), ValidationError);
      assert.throws(() => ProductName.create(undefined), ValidationError);
    });

    it('throws ValidationError if name is empty', () =>
      assert.throws(() => ProductName.create(''), ValidationError)
    );

    it('has right value if name is valid', () => {
      const str = "Guacamole";
      const name = ProductName.create(str);
      assert.equal(name.value, str);
    });
  });

});