import { ActivatedRoute, Router} from '@angular/router';
import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subscription }                                    from 'Rxjs';
import { Product} from '../../../models/product.client';
import { ProductsService } from '../../../services/products.service';
import { User } from '../../../models/user.model.client';
import { SharedService } from '../../../services/shared.service';
import { CartService } from '../../../services/cart.service.client';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
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
    private router: Router
  ) { }

  private isEmptyStore(): boolean {
    return !!this.storeItems && this.storeItems.length === 0;
  }

  private removeItem() {

  }
  ngOnInit() {
    this.user = this.sharedService.user;
    this.activatedRoute.params.subscribe(
      (params: any) => {
        this.userId = params['uid'];
        this.load();
      });

    //
    // console.log(this.userId);
    // this.productService.findAllProductsForUser(this.userId).subscribe(
    //   (products: Product[]) => {
    //     this.storeItems = products;
    //     this.products = products;
    //   }
    // );
  }
  load = () => {
    // this.sub = this.productService.getProducts('./assets/mock-data/products.json')
    //   .subscribe(res => {
    //     this.products = res;
    //   });

    this.sub = this.productService.findAllProductsForUser(this.userId)
      .subscribe(res => {
        this.products = res;
        console.log("=====");
        console.log(this.products);
        // console.log(this.products[6]);
      });

  };

}
