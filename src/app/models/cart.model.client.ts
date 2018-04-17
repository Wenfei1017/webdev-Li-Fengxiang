
import {Product} from "./product.client";

export class Cart {
  product: Product;
  quantity: number;
  _id: String;

  constructor(product, quantity = 1, _id = Date.now().toString()) {
    this.product = product;
    this.quantity = quantity;
    this._id = _id;
  }
}
