/**
 * Created by andrew.yang on 7/27/2017.
 */
import {User} from './user.model.client';

export class Product {
    _id: String;
    title?: String;
    brand?: String;
    price?: number;
    description?: String;
    image?: String;
    _user?: User;

  constructor(_id: String, title: String, brand: String, price: number, description: String) {
    this._id = _id;
    this.title = title;
    this.brand = brand;
    this.price = price;
    this.description = description;
  }
}
