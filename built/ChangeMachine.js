"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Coins_1 = require("./types/Coins");
class ChangeMachine {
    constructor() {
        this.change = new Map();
    }
    addChange(coins) {
        coins.forEach((displayCoin) => {
            const coin = Coins_1.Coins[displayCoin];
            const existingCoinCount = this.change.get(coin);
            existingCoinCount ?
                this.change.set(coin, existingCoinCount + 1) :
                this.change.set(coin, 1);
        });
    }
    getChange() {
        return this.change;
    }
    getChangeRemaining() {
        let changeRemaining = [];
        this.change.forEach((quantity, coin) => {
            for (let i = 0; i < quantity; i++) {
                changeRemaining.push(Coins_1.Coins[coin]);
            }
        });
        return changeRemaining;
    }
}
exports.default = ChangeMachine;
