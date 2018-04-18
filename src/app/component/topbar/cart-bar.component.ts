import { Component, OnInit } from '@angular/core';
import {CartService} from '../../services/cart.service.client';
import {SharedService} from '../../services/shared.service';
import {User} from '../../models/user.model.client';
import {Cart} from '../../models/cart.model.client';

@Component({
  selector: 'cart-bar',
  styleUrls: ['./top-bar.component.css'],
  template: `
    <div class="main-header navbar-fixed-top">
      <div class="header-menu">
        <div class="header-mobile-nav-wrapper">
          <button type="button" class="navbar-toggle" (click)="collapse = !collapse">
            <span class="fa fa-bars fa-2x"></span>
          </button>
        </div>
        <div class="header-logo-wrapper">
          <img class="header-logo-image">
        </div>
        
        <div class="header-cart-wrapper">
          <div class="header-cart" (click)="toggleCartPopup($event)">
            <div class="mobil-shopping-cart">
              <span><i class="fa fa-shopping-cart fa-2x"></i> <span *ngIf="cart_num">( {{cart_num}} )</span></span>
            </div>
            <div class="header-cart-item">
              <a href="">MY CART <span *ngIf="cart_num">( {{cart_num}} )</span><span class="fa fa-caret-down"></span></a>
            </div>
          </div>
        </div>
      </div>
      
      
      
      <!--<ul class="mobile-header-nav" *ngIf="collapse" (click)="collapse = !collapse">-->
        <!--<li>-->
          <!--<a routerLink="/">HOME</a>-->
        <!--</li>-->
        <!--<li>-->
          <!--<a routerLink="/">SHOP</a>-->
        <!--</li>-->
        <!--<li>-->
          <!--<a routerLink="/">JOURNAL</a>-->
        <!--</li>-->
        <!--<li>-->
          <!--<a routerLink="/">MORE</a>-->
        <!--</li>-->
      <!--</ul>-->
      <cart-popup></cart-popup>
    </div>
  `
})
export class CartBarComponent implements OnInit {
  public collapse: boolean = false;
  public cart_num: number;
  constructor(
    private cartService: CartService,
    private sharedService: SharedService
  ) { }

  ngOnInit() {
    this.refreshCartNumber();
  }

  refreshCartNumber() {
    this.cartService.findAllCartsForUser(this.sharedService.user._id).subscribe(
      (cart: [Cart]) => {
        this.cartService.reloadCart(cart);
        this.cartService.cartListSubject
          .subscribe(res => {
            this.cart_num = res.length;
          });
      }
    );
  }
  toggleCartPopup = (event) => {
    event.preventDefault();
    event.stopPropagation();
    this.cartService.toggleCart();
  }
}
