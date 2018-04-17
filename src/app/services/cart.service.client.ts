import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Cart} from '../models/cart.model.client';
import {Http, Response} from '@angular/http';
import {environment} from '../../environments/environment';

@Injectable()
export class CartService {

    constructor(private http: Http) { }

    public cartListSubject = new BehaviorSubject([]);
    public toggleCartSubject = new BehaviorSubject(false);

    baseUrl = environment.baseUrl;

    toggleCart = () => {
        this.toggleCartSubject.next(!this.toggleCartSubject.getValue());
    };
    addToCart = (cart:Cart) => {
        let current = this.cartListSubject.getValue();
        let dup = current.find(c=>c.product.title === cart.product.title);
        if(dup) dup.quantity += cart.quantity;
        else current.push(cart);
        this.cartListSubject.next(current);
    };

    addToCartList(cart: Cart, userId: String) {
      console.log("cart Added!!!");
      console.log(userId);
      return this.http.post(this.baseUrl + '/api/user/' + userId + '/cart', cart)
        .map((res: Response) => {
          return res.json();
        });
    }

    deleteCartForUser(cart: Cart, userId: String) {
      return this.http.delete(this.baseUrl + '/api/cart/' + cart._id)
        .map((res: Response) => {
          return res.json();
        });
    }

    updateCartForUser(cart: Cart, userId: String) {
      return this.http.put(this.baseUrl + '/api/cart/' + cart._id, cart)
        .map((res: Response) => {
          return res.json();
        });
    }

    findAllCartsForUser(userId: String) {
      return this.http.get(this.baseUrl + '/api/user/' + userId + '/cart')
        .map((res: Response) => {
        return res.json();
      });
    }


  reloadCart = (cartList) => {
        this.cartListSubject.next(cartList);
    };
    removeCart = index => {
        let current = this.cartListSubject.getValue();
        current.splice(index,1);
        this.cartListSubject.next(current);
    };
}
