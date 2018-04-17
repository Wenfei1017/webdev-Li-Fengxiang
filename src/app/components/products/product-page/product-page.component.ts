import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ProductsService} from "../../../services/products.service";
import {Product} from "../../../models/product.client";
import {CartService} from "../../../services/cart.service.client";
import {Cart} from '../../../models/cart.model.client';

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

    changeQuantity = (newQuantity:number) => {
        this.quantity = newQuantity;
    };

    addToCart = (product) => {
      console.log("addCart!!!");
      if (this.quantity) this.cartService.addToCart(new Cart(product, this.quantity));
    };

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}





