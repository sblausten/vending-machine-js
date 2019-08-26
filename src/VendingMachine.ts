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

  addChange(newChange: Array<string>) {
    if(newChange) this.changeMachine.addChange(newChange);
  };

  getProducts() {
    return this.products;
  };

  viewChangeRemaining() {
    return this.changeMachine.getChangeRemaining();
  };

}

export { VendingMachine };
