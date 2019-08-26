import {Coins} from "./types/Coins";
import {ChangeNotAvailableError, NotEnoughChangeGivenError} from "./errors/CustomErrors";

export default class ChangeCalculator {

  static getChange(totalMoneySupplied: number, price: number, coinQuantitiesAvailable: Map<Coins, number>): Array<string> {
    const changeToReturn: Array<Coins> = [];

    if(totalMoneySupplied === price) return ChangeCalculator.convertCoinsToStrings(changeToReturn);
    if(totalMoneySupplied < price) throw new NotEnoughChangeGivenError();

    let priceDifference: number = totalMoneySupplied - price;
    while(priceDifference > 0) {
      priceDifference = this.addNextChangeCoin(changeToReturn, priceDifference, coinQuantitiesAvailable);
    }

    return ChangeCalculator.convertCoinsToStrings(changeToReturn);
  }

  private static addNextChangeCoin(change: Array<Coins>,
                                   remainingDifference: number,
                                   coinQuantitiesAvailable: Map<Coins, number>): number {
    let changeAvailableAsCoins: Array<Coins> = ChangeCalculator.convertToSortedCoinsList(coinQuantitiesAvailable);
    let coinFound = false;

    console.log('addNextChangeCoin available', changeAvailableAsCoins);
    for(let coin of changeAvailableAsCoins) {
      console.log('coin', coin);
      console.log('remainingDifference', remainingDifference);

      if ((remainingDifference - coin) >= 0) {
        console.log('coinFound:', coin);
        coinFound = true;
        change.push(coin);

        this.updateAvailableCoins(changeAvailableAsCoins, coin, coinQuantitiesAvailable);
        remainingDifference -= coin;
        console.log('remainingDifference', remainingDifference);
        break;
      }
    };

    if(!coinFound) throw new ChangeNotAvailableError();
    return remainingDifference;
  }

  private static updateAvailableCoins(changeAvailableAsCoins: Array<Coins>,
                                      coinToRemove: Coins,
                                      coinQuantitiesAvailable: Map<Coins, number>): void {
    const index = changeAvailableAsCoins.findIndex(availableCoin => availableCoin === coinToRemove);
    changeAvailableAsCoins.splice(index, 1);
    const updatedQuantity = coinQuantitiesAvailable.get(coinToRemove) - 1;
    coinQuantitiesAvailable.set(coinToRemove, updatedQuantity);
  }

  private static convertCoinsToStrings(change: Array<Coins>): Array<string> {
    return change.map(coin => Coins[coin]);
  }

  private static convertToSortedCoinsList(coinQuantities: Map<Coins, number>): Array<Coins> {
    let coinsList: Array<Coins> = [];
    coinQuantities.forEach((quantity: number, coin: Coins) => {

      for (let i = 0; i < quantity; i++) {
        coinsList.push(coin)
      }
    });
    const sortedHighestToLowest = coinsList.sort((a, b) => b.valueOf() - a.valueOf());
    return sortedHighestToLowest;
  }

}

