import { expect } from 'chai';
import ChangeMachine from "../src/ChangeMachine";
import {Coins} from "../src/types/Coins";


describe('ChangeMachine', () => {

  describe('getChangeRemaining', () => {
    it('should return change in correct format', () => {
      const change = [
        "50p", "50p", "50p", "£1", "£1"
      ];
      const changeMachine = new ChangeMachine();
      changeMachine.addChange(change);

      expect(changeMachine.getChangeRemaining()).to.deep.equal(change);
    });
  });

  describe('addChange', () => {
    it('should save change in correct format', () => {
      const changeMachine = new ChangeMachine();
      // @ts-ignore
      const expectedChange = new Map([
        [Coins["£1"], 2], [Coins["50p"], 3]
      ]);
      const change = [
        "50p", "50p", "50p", "£1", "£1"
      ];

      changeMachine.addChange(change);

      expect(changeMachine.changeAvailable).to.deep.equal(expectedChange);
    });

    it('should update change in correct format', () => {
      const changeMachine = new ChangeMachine();
      // @ts-ignore
      const expectedChange = new Map([
        [Coins["£1"], 1], [Coins["50p"], 2]
      ]);
      const initalChange = [
        "50p"
      ];
      const nextChange = [
        "50p", "£1"
      ];

      changeMachine.addChange(initalChange);
      changeMachine.addChange(nextChange);

      expect(changeMachine.changeAvailable).to.deep.equal(expectedChange);
    });
  });

  describe('getPurchaseChange', () => {
    it('should return 0 if exact change supplied', () => {
      const changeMachine = new ChangeMachine();
      changeMachine.addChange(["20p", "50p"]);

      const money = ["50p", "50p"];

      expect(changeMachine.getPurchaseChange(money, 100)).to.deep.equal([]);
    });

    it('should return change if more money than needed is given', () => {
      const changeMachine = new ChangeMachine();
      changeMachine.addChange(["20p", "50p"]);

      const money = ["50p", "50p"];

      expect(changeMachine.getPurchaseChange(money, 50)).to.deep.equal(["50p"]);
    });

    it('should return available change that adds up to total change', () => {
      const changeMachine = new ChangeMachine();
      changeMachine.addChange(["20p", "20p", "10p"]);

      const money = ["£1"];

      expect(changeMachine.getPurchaseChange(money, 50)).to.deep.equal(["20p", "20p", "10p"]);
    });

    it('should throw ChangeNotAvailableError if correct change not available', () => {
      const changeMachine = new ChangeMachine();
      changeMachine.addChange(["20p", "10p"]);

      const money = ["£1"];

      expect(() => changeMachine.getPurchaseChange(money, 50)).to.throw("Change not available");
    });
  });
});