import {Coins} from "./types/Coins";
import {NotEnoughChangeGivenError} from "./errors/CustomErrors";
import ChangeCalculator from "./ChangeCalculator";

export default class ChangeMachine {

  changeAvailable: Map<Coins, number>;

  constructor() {
    this.changeAvailable = new Map<Coins, number>()
  }

  getPurchaseChange(money: Array<string>, price: number): Array<string> {
    const totalMoneySupplied: number = money.map(coin => Coins[coin])
      .reduce((a, b) => a + b);

    if (totalMoneySupplied < price) throw new NotEnoughChangeGivenError();
    if (totalMoneySupplied === price) return [];
    if (totalMoneySupplied > price) {
      return ChangeCalculator.getChange(totalMoneySupplied, price, this.changeAvailable);
    }
  }

  addChange(coins: Array<string>): void {
    coins.forEach((displayCoin: string) => {
      const coin = Coins[displayCoin];
      const existingCoinCount = this.changeAvailable.get(coin);

      existingCoinCount ?
          this.changeAvailable.set(coin, existingCoinCount + 1) :
          this.changeAvailable.set(coin, 1);
    });
  }

  getCurrentChange(): Map<Coins, number> {
    return this.changeAvailable;
  }

  getChangeRemaining(): Array<string> {
    let changeRemaining: Array<string> = [];
    this.changeAvailable.forEach((quantity: number, coin: Coins) => {

      for (let i = 0; i < quantity; i++) {
        changeRemaining.push(Coins[coin])
      }
    });
    return changeRemaining
  }
}
