"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CustomErrors_1 = require("./errors/CustomErrors");
class VendingMachine {
    constructor(products, change, changeMachine) {
        this.products = products;
        this.changeMachine = changeMachine;
        this.addChange(change);
    }
    buyProduct(productName, money) {
        const product = this.products.find((product) => product.name === productName);
        if (product) {
            this.remove(productName);
            const change = this.changeMachine.getPurchaseChange(money, product.price);
            return product;
        }
        throw new CustomErrors_1.ProductNotFoundError();
    }
    remove(productName) {
        const index = this.products.findIndex(product => product.name === productName);
        this.products.splice(index, 1);
    }
    addChange(newChange) {
        if (newChange)
            this.changeMachine.addChange(newChange);
    }
    ;
    addProducts(products) {
        products.forEach(product => this.products.push(product));
    }
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
