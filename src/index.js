
function VendingMachine(products) {

  this.products = products;

  VendingMachine.prototype.getProducts = function() {
    return this.products;
  }

}

module.exports = VendingMachine;
