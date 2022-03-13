import {describe} from "mocha";
import * as assert from "assert";
import * as sinon from "sinon";
import * as uuid from "uuid";

import UniqueEntityID from "../../../src/core/domain/uniqueEntityID";
import IProductRepo from "../../../src/db/repos/iRepos/iProductRepo";
import IProductDto from "../../../src/dto/iProductDto";
import IProductMapper from "../../../src/mappers/iMappers/iProductMapper";
import ProductService from "../../../src/services/productService";
import ProductMapper from "../../../src/mappers/productMapper";
import ValidationError from "../../../src/core/logic/validationError";
import NotFoundError from "../../../src/core/logic/notFoundError";
import IUpdateProductDto from "../../../src/dto/nonEntity/iUpdateProductDto";
import {badNum, badProd, badStr} from "../../constants";

describe('Integration: ProductService + Product aggregate + ProductMapper', () => {

  const assertThrows = async (call: { (): Promise<IProductDto> }, errorType?: typeof NotFoundError | undefined) => {
    try {
      await call();
      assert.fail();
    } catch (e) {
      if (e.name === 'AssertionError') assert.fail('Should have thrown error');
      if (errorType !== undefined) assert.equal(e.name, errorType.name);
    }
  };

  // as suggested by the description, we won't be simulating or testing the Product aggregate
  // or ProductMapper, but we're doubling ProductRepo, as it is more prone to change.
  const stubbedRepo: IProductRepo = {
    getByName: () => Promise.resolve(badProd),
    getById: () => Promise.resolve(badProd),
    save: () => Promise.resolve(badProd)
  };
  const repoStub = sinon.stub(stubbedRepo);

  const mapperInstance: IProductMapper = new ProductMapper();
  const serviceWithStub = new ProductService(stubbedRepo, mapperInstance);

  const id = new UniqueEntityID();
  const name = "Boxes of frogs";
  const quantity = 58;
  const dto: IProductDto = {domainId: id.getValue(), name: name, quantity: quantity};

  describe('getProductById method', () => {
    it('returns a product DTO if it exists', async () => {
      repoStub.getById.withArgs(id.getValue()).returns(Promise.resolve(dto));
      const res = await serviceWithStub.getProductById(id.getValue());
      assert.equal(res.domainId, id.getValue());
      assert.equal(res.name, name);
      assert.equal(res.quantity, quantity);
    });

    it('throws NotFoundError if the product is not found', async () => {
      repoStub.getById.withArgs(id.getValue()).throws(new NotFoundError('any'));
      await assertThrows(async () =>
          await serviceWithStub.getProductById(id.getValue()),
        NotFoundError);

      // // the approach below didn't work
      // assert.throws(async () =>
      //     await service.getProductById(id.getValue()),
      //   NotFoundError);
    });
  });

  describe('getProductByName method', () => {
    it('returns a product DTO if it exists', async () => {
      repoStub.getByName.withArgs(name).returns(Promise.resolve(dto));
      const res = await serviceWithStub.getProductByName(name);
      assert.equal(res.domainId, id.getValue());
      assert.equal(res.name, name);
      assert.equal(res.quantity, quantity);
    });

    it('throws NotFoundError if the product is not found', async () => {
      repoStub.getByName.withArgs(name).throws(new NotFoundError('any'));
      await assertThrows(async () =>
          await serviceWithStub.getProductByName(name),
        NotFoundError);

      // // the approach below didn't work
      // assert.throws(async () =>
      //     await service.getProductById(id.getValue()),
      //   NotFoundError);
    });
  });

  describe('createProduct method', () => {
    it('throws ValidationException if any of the provided data is invalid', async () => {
      await assertThrows(async () =>
          await serviceWithStub.createProduct({name: badStr, quantity: badNum}),
        ValidationError);

      // // the approach below didn't work
      // assert.throws(async () =>
      //     await service.createProduct({name: null, quantity: null}),
      //   ValidationError);
    });

    it('returns the correct values if they\'re valid', async () => {
      repoStub.save.returns(Promise.resolve(dto));
      const res = await serviceWithStub.createProduct(dto);
      assert.ok(uuid.validate(res.domainId));
      assert.equal(res.name, dto.name);
      assert.equal(res.quantity, dto.quantity);
    });
  });

  describe('updateProduct method', () => {
    it('updates both the name and quantity', async () => {
      repoStub.getById.withArgs(id.getValue()).returns(Promise.resolve(dto));
      const newName = "Apples";
      const newQuant = 25;
      const newDto: IUpdateProductDto = {
        domainId: id.getValue(),
        name: newName,
        quantity: newQuant
      };
      repoStub.save.withArgs(newDto as IProductDto).returns(Promise.resolve(newDto as IProductDto));

      const res = await serviceWithStub.updateProduct(newDto);
      assert.equal(res.domainId, id.getValue());
      assert.equal(res.name, newName);
      assert.equal(res.quantity, newQuant);
    });

    it('updates just the name', async () => {
      const newName = "Apples";
      const newDto: IProductDto = {
        domainId: id.getValue(),
        name: newName,
        quantity: quantity
      };
      const updateDto: IUpdateProductDto = {
        domainId: id.getValue(),
        name: newName
      };
      repoStub.getById.withArgs(id.getValue()).returns(Promise.resolve(dto));
      repoStub.save.withArgs(newDto).returns(Promise.resolve(newDto));

      const res = await serviceWithStub.updateProduct(updateDto);
      assert.equal(res.domainId, id.getValue());
      assert.equal(res.name, newName);
      assert.equal(res.quantity, quantity);
    });

    it('updates just the quantity', async () => {
      const newQuant = 28;
      const updateDto: IUpdateProductDto = {
        domainId: id.getValue(),
        quantity: newQuant
      };
      const newDto: IProductDto = {
        domainId: id.getValue(),
        name: name,
        quantity: newQuant
      };
      repoStub.getById.withArgs(id.getValue()).returns(Promise.resolve(dto));
      repoStub.save.withArgs(newDto).returns(Promise.resolve(newDto));

      const res = await serviceWithStub.updateProduct(updateDto);
      assert.equal(res.domainId, id.getValue());
      assert.equal(res.name, name);
      assert.equal(res.quantity, newQuant);
    });

    it('throws ValidationError if any info is invalid', async () => {
      repoStub.getById.withArgs(id.getValue()).returns(Promise.resolve(dto));
      await assertThrows(async () =>
          await serviceWithStub.updateProduct({
            domainId: id.getValue(),
            name: badStr,
            quantity: badNum
          }),
        ValidationError);
    });

    it('throws NotFoundError if ID is not found', async () => {
      repoStub.getById.withArgs(id.getValue()).returns(Promise.resolve(badProd));
      await assertThrows(async () => await serviceWithStub.updateProduct(dto), NotFoundError);
    });
  });

});