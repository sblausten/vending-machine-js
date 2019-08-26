import { Coins } from "./types/Coins";

export default class ChangeMachine {

  change: Map<Coins, number>;

  constructor() {
    this.change = new Map<Coins, number>()
  }

  addChange(coins: Array<string>): void {
    coins.forEach((displayCoin: string) => {
      const coin = Coins[displayCoin];
      const existingCoinCount = this.change.get(coin);

      existingCoinCount ?
          this.change.set(coin, existingCoinCount + 1) :
          this.change.set(coin, 1);
    });
  }

  getChange(): Map<Coins, number> {
    return this.change;
  }

  getChangeRemaining(): Array<string> {
    let changeRemaining: Array<string> = [];
    this.change.forEach((quantity: number, coin: Coins) => {

      for(let i = 0; i < quantity; i++) {
        changeRemaining.push(Coins[coin])
      }
    });
    return changeRemaining
  }
}
