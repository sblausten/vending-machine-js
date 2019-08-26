import ChangeMachine from "./ChangeMachine";
import Product from "./types/Product"

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

  addChange(newChange: Array<string>): void {
    if(newChange) this.changeMachine.addChange(newChange);
  };

  getProducts(): Array<Product> {
    return this.products;
  };

  viewChangeRemaining(): Array<string> {
    return this.changeMachine.getChangeRemaining();
  };

}

export { VendingMachine };
