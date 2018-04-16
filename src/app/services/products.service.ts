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

  // websites: Product[] = [
  //   new Product('321', 'Facebook', '123', 'test', 'ww'),
  //   new Website('111', 'Facebook1', '123', 'test' ),
  //   new Website('222', 'Facebook2', '123', 'test' ),
  //   new Website('333', 'Facebook3', '123', 'test' ),
  //   new Website('432', 'Twitter', '456', 'test' ),
  //   new Website('234', 'Amazon', '789', 'test' ),
  // ];

  public getProducts(dataURL:string){
    return this.http.get(dataURL)
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error || 'Server error'));
  }

  initialWebsite() {
    return new Product(undefined, undefined, undefined, undefined, undefined);
  }

  // findAllWebSites() {
  //   return this.products;
  // }

  updateProduct(userId: String, newProduct: Product) {
    const url =  this.baseUrl + '/api/user/' + userId + '/website/' + newProduct._id;
    return this.http.put(url, newProduct).map((response: Response) => {
      return response.json();
    });
  }

  findProductById(userId: String, productId: String) {
    const url = this.baseUrl + '/api/user/' + userId + '/website/' + productId;
    return this.http.get(url).map((response: Response) => {
      return response.json();
    });
  }

  deleteProduct(userId: String,  productId: String) {
    const url = this.baseUrl + '/api/user/' + userId + '/website/' + productId;

    return this.http.delete(url).map((response: Response) => {
    });
  }

  createProductForUser(userId: String, website: Product) {
    const url = this.baseUrl + '/api/user/' + userId + '/product';
    return this.http.post(url, website).map((response: Response) => {
      return response.json();
    });
  }

  findProductsById(userId: String) {
    const url =  this.baseUrl + '/api/user/' + userId + '/product';
    return this.http.get(url).map((response: Response) => {
      return response.json();
    });
  }

}
