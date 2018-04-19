import { ActivatedRoute, Router} from '@angular/router';
import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Product} from '../../../../models/product.client';
import { ProductsService } from '../../../../services/products.service';
import { User } from '../../../../models/user.model.client';
import {UserService } from '../../../../services/user.service.client';
import { SharedService } from '../../../../services/shared.service';
import { CartService } from '../../../../services/cart.service.client';

@Component({
  selector: 'app-profile-admin',
  templateUrl: './profile-admin.component.html',
  styleUrls: ['./profile-admin.component.css']
})

export class ProfileAdminComponent implements OnInit {
  private storeItems: Product[];
  // private subscriptions: Array<Subscription> = [];
  user: User;
  userId: String;
  public products:Array<Product>;
  private sub;

  constructor(
    private activatedRoute: ActivatedRoute,
    private sharedService: SharedService,
    private productService: ProductsService,
    private cartService: CartService,
    private router: Router,
    private userService: UserService,
  ) { }

  private isEmptyStore(): boolean {
    return !!this.storeItems && this.storeItems.length === 0;
  }

  private removeItem() {

  }
  ngOnInit() {
    this.loadProduct();
    this.loadSeller();
    this.user = this.sharedService.user3;

    // this.user = this.sharedService.user2;
    // console.log(this.userId);
    // this.productService.findProductsById(this.userId).subscribe(
    //   (products: Product[]) => {
    //     this.storeItems = products;
    //   }
    // );
  }
  loadProduct = () => {
    this.sub = this.productService.getProducts('./assets/mock-data/products.json')
      .subscribe(res => {
        this.products = res;
      });
  };

  loadSeller = () => {
    // this.sub2 = this.userService.findAllUser()
    //   .subscribe(res => {
    //     this.users = res;
    //   })
  };

}
