const expect = require('chai').expect;
const VendingMachine = require('../src/index');

describe('VendingMachine', () => {

  it('should save products on initialization', () => {
    const products = [
      { id: "crisps", price: 0.5, quantity: 3 },
      { id: "chocolate", price: 1, quantity: 5 }
    ];
    const vendingMachine = new VendingMachine(products);

    expect(vendingMachine.getProducts()).to.equal(products);
  });

  it('should save change on initialization', () => {
    const change = {
      0.01: 10,
      0.02: 20,
      0.05: 30,
      0.10: 40,
      0.20: 50,
      0.50: 60,
      1: 10,
      2: 5,
    };
    const vendingMachine = new VendingMachine(null, change);

    expect(vendingMachine.getChange()).to.equal(change);
  });

  it('should save both change and products on initialization', () => {
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
