import ChangeMachine from '../src/ChangeMachine';
import { expect } from 'chai';
import { VendingMachine } from '../src/VendingMachine';
import { ProductFactory } from "../src/ProductFactory";

describe.only('VendingMachine', () => {

  let changeMachine;
  beforeEach(() => {
    changeMachine = new ChangeMachine();
  });

  describe('when initialised', () => {
    it('should save products', () => {
      const products = [
        ProductFactory.create("crisps", 0.5),
        ProductFactory.create("crisps", 0.5),
        ProductFactory.create("chocolate", 1)
      ];
      const vendingMachine = new VendingMachine(products, null, changeMachine);

      expect(vendingMachine.getProducts()).to.equal(products);
    });

    it('should save change', () => {
      const change = [
        "50p", "50p", "50p", "£1", "£1"
      ];

      const vendingMachine = new VendingMachine(null, change, changeMachine);

      expect(vendingMachine.viewChangeRemaining()).to.deep.equal(change);
    });

    it('should save both change and products', () => {
      const products = [
        ProductFactory.create("crisps", 0.5),
        ProductFactory.create("crisps", 0.5),
        ProductFactory.create("chocolate", 1)
      ];
      const change = [
        "50p", "50p", "50p", "£1", "£1"
      ];
      const vendingMachine = new VendingMachine(products, change, changeMachine);

      expect(vendingMachine.viewChangeRemaining()).to.deep.equal(change);
      expect(vendingMachine.getProducts()).to.equal(products);
    });
  });

  describe('addChange', () => {
    it('should update current change', () => {
      const initialChange = [ "20p", "50p" ];
      const changeToAdd = [ "50p", "£1" ];
      const expectedChangeRemaining = [ "20p", "50p", "50p", "£1" ];

      const vendingMachine = new VendingMachine(null, initialChange, changeMachine);
      vendingMachine.addChange(changeToAdd);

      expect(vendingMachine.viewChangeRemaining()).to.deep.equal(expectedChangeRemaining);
    });
  });

  describe('buyProduct', () => {
    it('should return product if exact change added and product available', () => {
      const money = [ "50p" ];
      const products = [
        ProductFactory.create("crisps", 0.5),
        ProductFactory.create("crisps", 0.5),
        ProductFactory.create("chocolate", 1)
      ];
      const vendingMachine = new VendingMachine(products, money, changeMachine);

      const product = vendingMachine.buyProduct("crisps", money);

      expect(product.name).to.equal("crisps");
      expect(product.price).to.equal(0.5);
    });

    it('should return product if multiple coins added and product available', () => {
      const money = [ "50p", "50p" ];
      const products = [
        ProductFactory.create("crisps", 0.5),
        ProductFactory.create("crisps", 0.5),
        ProductFactory.create("chocolate", 1)
      ];
      const vendingMachine = new VendingMachine(products, money, changeMachine);

      const product = vendingMachine.buyProduct("chocolate", money);

      expect(product.name).to.equal("chocolate");
      expect(product.price).to.equal(1);
    });

    it('should throw ProductNotFound if product name does not match current products available', () => {
      const money = [ "50p", "50p" ];
      const products = [
        ProductFactory.create("crisps", 0.5),
        ProductFactory.create("crisps", 0.5),
        ProductFactory.create("chocolate", 1)
      ];
      const vendingMachine = new VendingMachine(products, money, changeMachine);

      expect(() => vendingMachine.buyProduct("sweets", money)).to.throw('Product not found');
    });

  });
});
