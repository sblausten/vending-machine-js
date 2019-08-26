import Product from "./types/Product"

export class ProductFactory {
  static create(name: string, price: number): Product {
    return { name: name, price: price} as Product;
  }
}
