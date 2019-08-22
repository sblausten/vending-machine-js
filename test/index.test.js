const expect = require('chai').expect;
const VendingMachine = require('../src/index');

describe('VendingMachine', () => {

  it('should save products on initialization', () => {
    const products = [
      { id: "crisps", price: 0.5, quantity: 3 },
      { id: "chocolate", price: 1, quantity: 5 }
    ]
    const vendingMachine = new VendingMachine(products);

    expect(vendingMachine.getProducts()).to.equal(products);
  });
});
