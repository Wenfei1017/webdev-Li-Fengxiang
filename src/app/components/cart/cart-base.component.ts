/**
 * Created by Andrew on 7/30/2017.
 */
import {CartService} from "../../services/cart.service.client";
import {Cart} from "../../models/cart.model.client";
import {SharedService} from '../../services/shared.service';
export class CartBaseComponent{
    public cartList: Cart[];
    public totalPrice: number;
    constructor(protected cartService: CartService, protected sharedService: SharedService) {
        this.loadCart();
    }
    loadCart = () => {
      this.cartService.cartListSubject
        .subscribe(res => {
          console.log(res);
          this.cartList = res;
          let total = 0;
          for(let cart of this.cartList) {
            total += cart.product.price * cart.quantity;
          }
          this.totalPrice = total;
        })
    };

    removeFromCart = index => {
        console.log("remove!!");
        let current = this.cartService.cartListSubject.getValue();
        let deletedCart = current[index];
        this.cartService.removeCart(index);
        return this.cartService.deleteCartForUser(deletedCart, this.sharedService.user._id).subscribe(
          () => {}
        );
    };
}
