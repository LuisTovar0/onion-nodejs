import * as assert from "assert";

import ValidationError from "../../../../src/core/logic/validationError";
import ProductName from "../../../../src/domain/productAggregate/productName";
import {badStr} from "../../../constants";

describe('Unit: ProductName', () => {

  describe('create - static method', () => {
    it('throws ValidationError if name is null or undefined', () => {
      assert.throws(() => ProductName.create(badStr), ValidationError);
      assert.throws(() => ProductName.create(undefined as unknown as string), ValidationError);
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