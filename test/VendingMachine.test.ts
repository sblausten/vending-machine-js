import ChangeMachine from '../src/ChangeMachine';
import { expect } from 'chai';
import { VendingMachine } from '../src/VendingMachine';
import { ProductFactory } from "../src/ProductFactory";

describe('VendingMachine', () => {

  let changeMachine;
  beforeEach(() => {
    changeMachine = new ChangeMachine();
  });

  describe('when initialised', () => {
    it('should save products', () => {
      const products = [
        ProductFactory.create("crisps", 50),
        ProductFactory.create("crisps", 50),
        ProductFactory.create("chocolate", 100)
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
        ProductFactory.create("crisps", 50),
        ProductFactory.create("crisps", 50),
        ProductFactory.create("chocolate", 100)
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

  describe('addProducts', () => {
    it('should update products', () => {
      const products = [
        ProductFactory.create("crisps", 50),
        ProductFactory.create("chocolate", 100)
      ];
      const productsToAdd = [
        ProductFactory.create("crisps", 50),
        ProductFactory.create("ice cream", 200)
      ];
      const change = [ "50p", "£1" ];
      const expectedProducts = [
        ProductFactory.create("crisps", 50),
        ProductFactory.create("chocolate", 100),
        ProductFactory.create("crisps", 50),
        ProductFactory.create("ice cream", 200)
      ];

      const vendingMachine = new VendingMachine(products, change, changeMachine);
      vendingMachine.addProducts(productsToAdd);

      expect(vendingMachine.products).to.deep.equal(expectedProducts);
    });
  });

  describe('buyProduct', () => {
    it('should return product if exact change added and product available', () => {
      const change = [ "20p", "50p" ];
      const money = [ "50p" ];
      const products = [
        ProductFactory.create("crisps", 50),
        ProductFactory.create("chocolate", 100)
      ];
      const vendingMachine = new VendingMachine(products, change, changeMachine);

      const product = vendingMachine.buyProduct("crisps", money);

      expect(product.name).to.equal("crisps");
      expect(product.price).to.equal(50);
      expect(vendingMachine.getProducts()).to.deep.equal(
          [ProductFactory.create("chocolate", 100)]
      )
    });

    it('should return product if multiple coins added and product available', () => {
      const change = [ "20p", "50p" ];
      const money = [ "50p", "50p" ];
      const products = [
        ProductFactory.create("crisps", 50),
        ProductFactory.create("crisps", 50),
        ProductFactory.create("chocolate", 100)
      ];
      const vendingMachine = new VendingMachine(products, change, changeMachine);

      const product = vendingMachine.buyProduct("chocolate", money);

      expect(product.name).to.equal("chocolate");
      expect(product.price).to.equal(100);
    });

    it('should throw NotEnoughChangeGiven if product available but value of coins less than product price', () => {
      const change = [ "50p", "50p" ];
      const money = [ "50p" ];
      const products = [
        ProductFactory.create("chocolate", 100)
      ];
      const vendingMachine = new VendingMachine(products, change, changeMachine);

      expect(() => vendingMachine.buyProduct("chocolate", money)).to.throw('Not enough change given');
    });

    it('should throw ProductNotFound if product name does not match current products available', () => {
      const money = [ "50p", "50p" ];
      const products = [
        ProductFactory.create("crisps", 50),
        ProductFactory.create("crisps", 50),
        ProductFactory.create("chocolate", 100)
      ];
      const vendingMachine = new VendingMachine(products, money, changeMachine);

      expect(() => vendingMachine.buyProduct("sweets", money)).to.throw('Product not found');
    });

  });
});
