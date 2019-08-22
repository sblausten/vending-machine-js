
function VendingMachine(products = [], change = {}) {

  this.products = products;
  this.change = change;

  VendingMachine.prototype.getProducts = function() {
    return this.products;
  };

  VendingMachine.prototype.getChange = function() {
    return this.change;
  };

}

module.exports = VendingMachine;
