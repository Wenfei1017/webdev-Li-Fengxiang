/**
 * Created by andrew.yang on 7/31/2017.
 */
import { Component } from '@angular/core';
import {CartBaseComponent} from "./cart-base.component";
import {CartService} from "../../services/cart.service.client";
import {SharedService} from '../../services/shared.service';
import {Cart} from '../../models/cart.model.client';

@Component({
    selector: 'app-cart-page',
    styleUrls: ["cart-page.component.css"],
    templateUrl: 'cart-page.component.html'
})
export class CartPageComponent extends CartBaseComponent{
    constructor(protected cartService: CartService,protected sharedService: SharedService) {
        super(cartService,sharedService);
    }

    ngOnInit() {
      console.log("hereCartPage!!");
      console.log(this.sharedService.user);
      this.cartService.findAllCartsForUser(this.sharedService.user._id).subscribe(
        (cart: [Cart]) => {
          console.log(cart);
          this.cartService.reloadCart(cart);
          this.loadCart();
        }
      );
    }
    changeQuantity = (cart,quantity) => {
        console.log("hhhh");
        console.log(cart);
        cart.quantity = quantity;
        this.cartService.updateCartForUser(cart, this.sharedService.user._id).subscribe(
          () => {
            this.cartService.reloadCart(this.cartList);
          }
        );
    }
}
