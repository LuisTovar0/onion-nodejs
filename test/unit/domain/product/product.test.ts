import * as assert from "assert";
import {validate} from "uuid";

import UniqueEntityID from "../../../../src/core/domain/uniqueEntityID";
import ValidationError from "../../../../src/core/logic/validationError";
import Product from "../../../../src/domain/productAggregate/product";

describe('Unit: Product + ProductName + ProductQuantity', () => {

  const validName = "Avocado";
  const validQuantity = 1234;
  const validDto = {name: validName, quantity: validQuantity};

  describe('Product.create', () => {
    it('throws ValidationError if name is null', () =>
      assert.throws(() => Product.create({name: null, quantity: validQuantity}), ValidationError));
    it('throws ValidationError if name is undefined', () =>
      assert.throws(() => Product.create({name: undefined, quantity: validQuantity}), ValidationError));
    it('throws ValidationError if name is empty', () =>
      assert.throws(() => Product.create({name: '', quantity: validQuantity}), ValidationError));
    it('has right name if it\'s valid', () => {
      const prod = Product.create(validDto);
      assert.equal(prod.name.value, validName);
    });

    it('throws ValidationError if quantity is null', () =>
      assert.throws(() => Product.create({name: validName, quantity: null}), ValidationError));
    it('throws ValidationError if quantity is undefined', () =>
      assert.throws(() => Product.create({name: validName, quantity: undefined}), ValidationError));
    it('throws ValidationError if quantity is negative', () =>
      assert.throws(() => Product.create({name: validName, quantity: -1}), ValidationError));
    it('throws ValidationError if quantity is not an integer', () =>
      assert.throws(() => Product.create({name: validName, quantity: 100.1}), ValidationError));
    it('has right value if quantity is valid', () => {
      const prod = Product.create(validDto);
      assert.equal(prod.quantity.value, validQuantity);
    });

    it('generates valid uuid when no ID is provided', () => {
      const prod = Product.create(validDto);
      assert.ok(validate(prod.id.getValue()));
    });

    it('has the correct provided ID', () => {
      const id = new UniqueEntityID();
      const prod = Product.create(validDto, id);
      assert.equal(prod.id.getValue(), id.getValue());
    });
  });

});