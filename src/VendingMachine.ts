import ChangeMachine from "./ChangeMachine";
import Product from "./types/Product"
import {NotEnoughChangeGivenError, ProductNotFoundError} from "./errors/CustomErrors";

class VendingMachine {

  products: Array<Product>;
  changeMachine: ChangeMachine;

  constructor(products: Array<Product>,
              change: Array<string>,
              changeMachine: ChangeMachine) {
    this.products = products;
    this.changeMachine = changeMachine;
    this.addChange(change);
  }

  buyProduct(productName: string , money: Array<string>): Product {

    const product = this.products.find((product) => product.name === productName);
    if(product) {
      this.remove(productName);
      const change = this.changeMachine.getPurchaseChange(money, product.price);
      return product;
    }
    throw new ProductNotFoundError()
  }

  private remove(productName: string) {
    const index = this.products.findIndex(product =>
        product.name === productName
    );
    this.products.splice(index, 1);
  }

  addChange(newChange: Array<string>): void {
    if(newChange) this.changeMachine.addChange(newChange);
  };

  addProducts(products: Array<Product>): void {
    products.forEach(product => this.products.push(product));
  }

  getProducts(): Array<Product> {
    return this.products;
  };

  viewChangeRemaining(): Array<string> {
    return this.changeMachine.getChangeRemaining();
  };

}

export { VendingMachine };
