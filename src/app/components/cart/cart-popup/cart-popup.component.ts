/**
 * Created by andrew.yang on 7/28/2017.
 */

import {Component, HostBinding, ElementRef} from "@angular/core";
import {CartService} from "../../../services/cart.service.client";
import {CartBaseComponent} from "../cart-base.component";
import {SharedService} from '../../../services/shared.service';

@Component({
  selector: 'cart-popup',
  styleUrls: ["cart-popup.component.css"],
  templateUrl: 'cart-popup.component.html',
  host: {
    '(document:click)': 'onPageClick($event)',
  }
})
export class CartPopupComponent extends CartBaseComponent{
  @HostBinding("class.visible") isVisible:boolean = false;

  userId : String;
  constructor(
    protected cartService: CartService,
    protected sharedService: SharedService,
    private eleref: ElementRef

  ) {
    super(cartService,sharedService);
  }
  ngOnInit() {
    this.userId = this.sharedService.user._id;
    console.log("popup");
    this.cartService.toggleCartSubject.subscribe(res => {
      this.isVisible = res;
    });
  }
  onPageClick = (event) => {
    if (this.isVisible && !this.eleref.nativeElement.contains(event.target) && event.target.className !== 'cart-remove'){
      this.cartService.toggleCart();
    }
  };
}
