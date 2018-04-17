import { Component, OnInit } from '@angular/core';
import {ProductsService} from "../../services/products.service";
import {Product} from "../../models/product.client";
import {CartService} from "../../services/cart.service.client";
import {Router} from "@angular/router";
import {Cart} from '../../models/cart.model.client';
import {SharedService} from '../../services/shared.service';
import {Page} from '../../models/page.model.client';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  public products:Array<Product>;
  private sub;
  constructor(
    private productsService: ProductsService,
    private cartService: CartService,
    private sharedService: SharedService,
    private router: Router
  ) { }

  ngOnInit() {
    this.load();
  }
  load = () => {
    this.sub = this.productsService.getProducts('./assets/mock-data/products.json')
      .subscribe(res => {
        this.products = res;
      });
  }
  addToCart = (product) => {
    const newCart = new Cart(product, 1);
    this.cartService.addToCartList(newCart, this.sharedService.user._id).subscribe(
      () => {}
    );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
