"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Coins_1 = require("./types/Coins");
const CustomErrors_1 = require("./errors/CustomErrors");
class ChangeCalculator {
    static getChange(totalMoneySupplied, price, coinQuantitiesAvailable) {
        const changeToReturn = [];
        if (totalMoneySupplied === price)
            return ChangeCalculator.convertCoinsToStrings(changeToReturn);
        if (totalMoneySupplied < price)
            throw new CustomErrors_1.NotEnoughChangeGivenError();
        let priceDifference = totalMoneySupplied - price;
        while (priceDifference > 0) {
            priceDifference = this.addNextChangeCoin(changeToReturn, priceDifference, coinQuantitiesAvailable);
        }
        return ChangeCalculator.convertCoinsToStrings(changeToReturn);
    }
    static addNextChangeCoin(change, remainingDifference, coinQuantitiesAvailable) {
        let changeAvailableAsCoins = ChangeCalculator.convertToSortedCoinsList(coinQuantitiesAvailable);
        let coinFound = false;
        console.log('addNextChangeCoin available', changeAvailableAsCoins);
        for (let coin of changeAvailableAsCoins) {
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
        }
        ;
        if (!coinFound)
            throw new CustomErrors_1.ChangeNotAvailableError();
        return remainingDifference;
    }
    static updateAvailableCoins(changeAvailableAsCoins, coinToRemove, coinQuantitiesAvailable) {
        const index = changeAvailableAsCoins.findIndex(availableCoin => availableCoin === coinToRemove);
        changeAvailableAsCoins.splice(index, 1);
        const updatedQuantity = coinQuantitiesAvailable.get(coinToRemove) - 1;
        coinQuantitiesAvailable.set(coinToRemove, updatedQuantity);
    }
    static convertCoinsToStrings(change) {
        return change.map(coin => Coins_1.Coins[coin]);
    }
    static convertToSortedCoinsList(coinQuantities) {
        let coinsList = [];
        coinQuantities.forEach((quantity, coin) => {
            for (let i = 0; i < quantity; i++) {
                coinsList.push(coin);
            }
        });
        const sortedHighestToLowest = coinsList.sort((a, b) => b.valueOf() - a.valueOf());
        return sortedHighestToLowest;
    }
}
exports.default = ChangeCalculator;
