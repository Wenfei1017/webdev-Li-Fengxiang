/**
 * Created by andrew.yang on 7/27/2017.
 */
export class Product {
    _id: String;
    title?: String;
    brand?: String;
    price?: number;
    description?: String;
    image?: String;

  constructor(_id: String, title: String, brand: String, price: number, description: String) {
    this._id = _id;
    this.title = title;
    this.brand = brand;
    this.price = price;
    this.description = description;
  }
}
