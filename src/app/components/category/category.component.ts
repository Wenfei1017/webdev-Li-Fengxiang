import {Component, Input, OnInit, HostListener} from '@angular/core';
import {ProductsService} from "../../services/products.service";
import {Product} from "../../models/product.client";
import {CartService} from "../../services/cart.service.client";
import {Router} from "@angular/router";
import {Cart} from '../../models/cart.model.client';
import {SharedService} from '../../services/shared.service';
import {Page} from '../../models/page.model.client';
import {CartBaseComponent} from '../cart/cart-base.component';
import {CartBarComponent} from '../../component/topbar/cart-bar.component';
import {forEach} from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  // @Input() cartBar: CartBarComponent;

  public products:Array<Product>;
  private sub;
  constructor(
    private productsService: ProductsService,
    private cartService: CartService,
    private sharedService: SharedService,
    private router: Router
  ) { }

  // @HostListener('click')
  // click() {
  //   this.cartBar.refreshCartNumber();
  // }

  ngOnInit() {
    this.load();
  }
  load = () => {
    // this.sub = this.productsService.getProducts('./assets/mock-data/products.json')
    //   .subscribe(res => {
    //     this.products = res;
    //     console.log(this.products[0].image);
    //   });

    this.sub = this.productsService.findAllProducts()
      .subscribe(products => {
        this.products = products;
        this.sub = this.productsService.getProducts('./assets/mock-data/products.json')
          .subscribe(resProducts => {
            this.products = this.products.concat(resProducts);

              this.productsService.createProductForUser(this.products[0]._user, this.products[0]).subscribe(
                () => {}
              );
              this.productsService.createProductForUser(this.products[1]._user, this.products[1]).subscribe(
              () => {}
              );
              this.productsService.createProductForUser(this.products[2]._user, this.products[2]).subscribe(
              () => {}
              );
              this.productsService.createProductForUser(this.products[3]._user, this.products[3]).subscribe(
              () => {}
              );
              this.productsService.createProductForUser(this.products[4]._user, this.products[4]).subscribe(
              () => {}
              );
            console.log(this.products[5]);
              this.productsService.createProductForUser(this.products[5]._user, this.products[5]).subscribe(
              () => {
                console.log("testes");
              }
              );
          });
      });
  }

  addToCart = (product) => {
    const newCart = new Cart(product, 1);
    // this.cartService.addToCart(newCart);
    this.cartService.addToCartList(newCart, this.sharedService.user._id).subscribe(
      (cart: Cart) => {

        return;
      }
    );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
