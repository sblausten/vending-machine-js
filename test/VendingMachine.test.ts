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
});
