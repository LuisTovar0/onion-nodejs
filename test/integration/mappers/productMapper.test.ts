import {describe} from "mocha";
import * as assert from "assert";

import UniqueEntityID from "../../../src/core/domain/uniqueEntityID";
import ValidationError from "../../../src/core/logic/validationError";
import IProductDataModel from "../../../src/db/dataModel/iProductDataModel";
import Product from "../../../src/domain/productAggregate/product";
import IProductDto from "../../../src/dto/iProductDto";
import ProductMapper from "../../../src/mappers/productMapper";

describe('Integration: ProductMapper + Product aggregate', () => {

  const mapper = new ProductMapper();
  const id = new UniqueEntityID();
  const name = "Banana";
  const quantity = 10;
  const validDto: IProductDto = {domainId: id.getValue(), name: name, quantity: quantity};
  const validDataModel: IProductDataModel = {domainId: id.getValue(), name: name, quantity: quantity};
  const validProd = Product.create({name: name, quantity: quantity}, id);

  describe('domainToDTO method', () => {
    it('has all the given data', () => {
      const res = mapper.domainToDTO(validProd);
      assert.equal(res.domainId, id.getValue());
      assert.equal(res.name, name);
      assert.equal(res.quantity, quantity);
    });
  });

  describe('dtoToDomain method', () => {
    it('throws ValidationError if any data is invalid', () => {
      assert.throws(() =>
        mapper.dtoToDomain({domainId: "1234", name: null, quantity: null}), ValidationError);
    });

    it('has all the given data if it\'s valid', () => {
      const res = mapper.dtoToDomain(validDto);
      assert.equal(res.id.getValue(), id.getValue());
      assert.equal(res.name.value, name);
      assert.equal(res.quantity.value, quantity);
    });
  });

  describe('dataModelToDTO method', () => {
    it('has all the given data', () => {
      const res = mapper.dataModelToDTO(validDataModel);
      assert.equal(res.domainId, id.getValue());
      assert.equal(res.name, name);
      assert.equal(res.quantity, quantity);
    });
  });

  describe('dtoToDataModel method', () => {
    it('has all the given data', () => {
      const res = mapper.dtoToDataModel(validDto);
      assert.equal(res.domainId, id.getValue());
      assert.equal(res.name, name);
      assert.equal(res.quantity, quantity);
    });
  });

});