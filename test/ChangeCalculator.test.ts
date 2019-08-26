import { expect } from 'chai';
import ChangeCalculator from "../src/ChangeCalculator";
import {Coins} from "../src/types/Coins";

describe('ChangeCalculator', () => {

  describe('getChange', () => {
    let changeAvailable;
    beforeEach(() => {
      changeAvailable = new Map<Coins, number>(
          [
            [Coins['£2'], 10],
            [Coins['£1'], 10],
            [Coins['50p'], 10],
            [Coins['20p'], 10]
          ]
      );
    });

    it('should return no coins if totalMoneySupplied is equal to price', () => {
      const change = ChangeCalculator.getChange(100, 100, changeAvailable);
      expect(change).to.deep.equal([]);
    });

    it('should return highest value coins as change', () => {
      const change = ChangeCalculator.getChange(100, 50, changeAvailable);
      expect(change).to.deep.equal(["50p"]);
    });

    it('should return highest value coins as change', () => {
      const change = ChangeCalculator.getChange(600, 100, changeAvailable);
      expect(change).to.deep.equal(["£2", "£2", "£1"]);
      expect(changeAvailable).to.deep.equal(new Map<Coins, number>(
          [
            [Coins['£2'], 8],
            [Coins['£1'], 9],
            [Coins['50p'], 10],
            [Coins['20p'], 10]
          ]
      ));
    });

    it('should return highest value available coins as change', () => {
      const changeAvailable = new Map<Coins, number>(
          [
            [Coins['£1'], 6],
            [Coins['50p'], 2]
          ]
      );
      const change = ChangeCalculator.getChange(600, 100, changeAvailable);
      expect(change).to.deep.equal(["£1", "£1", "£1", "£1", "£1"]);
      expect(changeAvailable).to.deep.equal(new Map<Coins, number>(
          [
            [Coins['£1'], 1],
            [Coins['50p'], 2]
          ]
      ));
    });

    it('should throw Error if money is less than price', () => {
      expect(() => ChangeCalculator.getChange(50, 100, changeAvailable))
        .to.throw("Not enough change given");
    });

    it('should throw Error if not enough change available', () => {
      const changeAvailable = new Map<Coins, number>(
          [
            [Coins['20p'], 2]
          ]
      );
      expect(() => ChangeCalculator.getChange(100, 50, changeAvailable))
        .to.throw("Change not available");
    });
  });
});