import { Product } from '../models/product.client';
import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/Rx';
import {Observable} from "rxjs";

import {environment} from '../../environments/environment';

@Injectable()
export class ProductsService {

  constructor(private http: Http){}

  baseUrl = environment.baseUrl;

  public getProducts(dataURL: string) {
    return this.http.get(dataURL)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }

  initialProduct() {
    return new Product(undefined, undefined, undefined, undefined, undefined);
  }

  updateProduct(userId: String, product: Product) {
    const url =  this.baseUrl + '/api/product/' + product._id;
    return this.http.put(url, product).map((response: Response) => {
      return response.json();
    });
  }

  findProductById(productId: String) {
    console.log("sdfassdfs");
    const url = this.baseUrl + '/api/product/' + productId;
    return this.http.get(url).map((response: Response) => {
      return response.json();
    });
  }

  deleteProduct(userId: String,  productId: String) {
    console.log("deleteProduct");
    const url = this.baseUrl + '/api/user/' + userId + '/product/' + productId;
    return this.http.delete(url).map((response: Response) => {
    });
  }

  createProductForUser(userId: String, product: Product) {
    const url = this.baseUrl + '/api/user/' + userId + '/product';
    console.log(url);
    return this.http.post(url, product).map((response: Response) => {
      return response.json();
    });
  }

  findAllProductsForUser(userId: String) {
    const url = this.baseUrl + '/api/user/' + userId + '/product';
    return this.http.get(url).map(
      (response: Response) => {
        return response.json();
      }
    );
  }

  findAllProducts() {
    const url = this.baseUrl + '/api/product';
    return this.http.get(url).map(
      (response: Response) => {
        return response.json();
      }
    );
  }

  resetImage() {
    const url = this.baseUrl + '/api/resetImage';
    return this.http.get(url).map(
      (response: Response) => {
        return response.json();
      }
    );
  }
}
