
export class ProductNotFoundError extends Error {
  constructor(message?: string) {
    super("Product not found");
    this.name = "ProductNotFound";
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export class NotEnoughChangeGivenError extends Error {
  constructor(message?: string) {
    super("Not enough change given");
    this.name = "NotEnoughChangeGiven";
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export class ChangeNotAvailableError extends Error {
  constructor(message?: string) {
    super("Change not available");
    this.name = "ChangeNotAvailableError";
    Object.setPrototypeOf(this, new.target.prototype);
  }
}