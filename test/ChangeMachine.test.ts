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
      const expectedChange = new Map([
        [Coins["£1"], 2], [Coins["50p"], 3]
      ]);
      const change = [
        "50p", "50p", "50p", "£1", "£1"
      ];

      changeMachine.addChange(change);

      expect(changeMachine.change).to.deep.equal(expectedChange);
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

      expect(changeMachine.change).to.deep.equal(expectedChange);
    });
  });
});