const expect = require('chai').expect;
const VendingMachine = require('../src/index');

describe('VendingMachine', () => {

  describe('when initialised', () => {
    it('should save products', () => {
      const products = [
        { id: "crisps", price: 0.5, quantity: 3 },
        { id: "chocolate", price: 1, quantity: 5 }
      ];
      const vendingMachine = new VendingMachine(products);

      expect(vendingMachine.getProducts()).to.equal(products);
    });

    it('should save change', () => {
      const change = {
        0.50: 60,
        1: 10
      };
      const vendingMachine = new VendingMachine(null, change);

      expect(vendingMachine.getChange()).to.equal(change);
    });

    it('should save both change and products', () => {
      const products = [
        { id: "crisps", price: 0.5, quantity: 3 },
        { id: "chocolate", price: 1, quantity: 5 }
      ];
      const change = {
        0.50: 60,
        1: 10
      };
      const vendingMachine = new VendingMachine(products, change);

      expect(vendingMachine.getChange()).to.equal(change);
      expect(vendingMachine.getProducts()).to.equal(products);
    });
  });
});
