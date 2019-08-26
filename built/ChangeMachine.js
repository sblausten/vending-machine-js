"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Coins_1 = require("./types/Coins");
const CustomErrors_1 = require("./errors/CustomErrors");
const ChangeCalculator_1 = __importDefault(require("./ChangeCalculator"));
class ChangeMachine {
    constructor() {
        this.changeAvailable = new Map();
    }
    getPurchaseChange(money, price) {
        const totalMoneySupplied = money.map(coin => Coins_1.Coins[coin])
            .reduce((a, b) => a + b);
        if (totalMoneySupplied < price)
            throw new CustomErrors_1.NotEnoughChangeGivenError();
        if (totalMoneySupplied === price)
            return [];
        if (totalMoneySupplied > price) {
            return ChangeCalculator_1.default.getChange(totalMoneySupplied, price, this.changeAvailable);
        }
    }
    addChange(coins) {
        coins.forEach((displayCoin) => {
            const coin = Coins_1.Coins[displayCoin];
            const existingCoinCount = this.changeAvailable.get(coin);
            existingCoinCount ?
                this.changeAvailable.set(coin, existingCoinCount + 1) :
                this.changeAvailable.set(coin, 1);
        });
    }
    getCurrentChange() {
        return this.changeAvailable;
    }
    getChangeRemaining() {
        let changeRemaining = [];
        this.changeAvailable.forEach((quantity, coin) => {
            for (let i = 0; i < quantity; i++) {
                changeRemaining.push(Coins_1.Coins[coin]);
            }
        });
        return changeRemaining;
    }
}
exports.default = ChangeMachine;
