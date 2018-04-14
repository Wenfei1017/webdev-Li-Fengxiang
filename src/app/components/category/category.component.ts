import { Component, OnInit } from '@angular/core';
import {ProductsService} from "../../services/products.service";
import {Product} from "../../models/product.client";
import {CartService} from "../../services/cart.service";
import {Router} from "@angular/router";

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
    private router: Router
  ) { }

  ngOnInit() {
    this.load();
  }
  load = () => {
    this.sub = this.productsService.getProducts('./assets/mock-data/products.json')
      .subscribe(res => {
        this.products = res;
      })
  };
  addToCart = (product) => {
    this.cartService.addToCart({product, quantity:1})
  };
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
