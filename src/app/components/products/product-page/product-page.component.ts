import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ProductsService} from "../../../services/products.service";
import {Product} from "../../../models/product.client";
import {CartService} from "../../../services/cart.service.client";
import {Cart} from '../../../models/cart.model.client';
import {SharedService} from '../../../services/shared.service';

@Component({
    selector: 'app-product',
    templateUrl: './product-page.component.html',
    styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit {
    private sub;
    public product: Product;
    quantity: number = 1;
    constructor(private route: ActivatedRoute,
                private productService: ProductsService,
                private sharedService: SharedService,
                private cartService: CartService
    ) { }

    ngOnInit() {
        this.route.params
            .subscribe(res => {
              console.log(res);
                this.getProduct(res.pid);
            });
    }

    getProduct = (id) => {
        this.sub = this.productService.getProducts('../../../assets/mock-data/products.json')
            .subscribe(res => {
                this.product = res[id-1];
                console.log(this.product);
            });
    };

    changeQuantity = (cart,quantity) => {
      this.quantity = quantity;
      console.log("hhhh");
      console.log(cart);
      cart.quantity = quantity;
      this.cartService.updateCartForUser(cart, this.sharedService.user._id).subscribe(
        () => {
        }
      );
    };

    addToCart = (product) => {
      const newCart = new Cart(product, 1);
      // this.cartService.addToCart(newCart);
      this.cartService.addToCartList(newCart, this.sharedService.user._id).subscribe(
        (cart: Cart) => {
          return;
        }
      );
    };

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}





