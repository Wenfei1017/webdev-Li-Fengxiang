import { Component, OnInit } from '@angular/core';
import {User} from '../../../../../models/user.model.client';
import {Product} from '../../../../../models/product.client';
import {PageService} from '../../../../../services/page.service.client';
import {ProductsService} from '../../../../../services/products.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent implements OnInit {
  private storeItems: Product[];
  user: User;
  userId: String;
  public products:Array<Product>;
  public users: Array<User>;
  private sub1;

  constructor(private productsService: ProductsService) { }

  ngOnInit() {
    this.loadProduct();
  }

  loadProduct = () => {
    this.productsService.findAllProducts()
      .subscribe(res => {
        this.products = res;;
        // console.log(this.products[6]);
      });
  };

  deleteProduct(i) {
    console.log(this.products[i]);
    this.productsService.deleteProduct(this.products[i]._user, this.products[i]._id).subscribe(
      () => {
        this.products.splice(i, i);
      }
    );
  }
  editProduct(i) {

  }
}
