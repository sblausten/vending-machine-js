"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class VendingMachine {
    constructor(products, change, changeMachine) {
        this.products = products;
        this.changeMachine = changeMachine;
        this.addChange(change);
    }
    addChange(newChange) {
        if (newChange)
            this.changeMachine.addChange(newChange);
    }
    ;
    getProducts() {
        return this.products;
    }
    ;
    viewChangeRemaining() {
        return this.changeMachine.getChangeRemaining();
    }
    ;
}
exports.VendingMachine = VendingMachine;
