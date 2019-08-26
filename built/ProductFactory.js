"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ProductFactory {
    static create(name, price) {
        return { name: name, price: price };
    }
}
exports.ProductFactory = ProductFactory;
