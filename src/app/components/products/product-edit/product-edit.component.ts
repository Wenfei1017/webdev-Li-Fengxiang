import { Component, OnInit } from '@angular/core';
import { Subscription }                                    from 'Rxjs';
import { Product} from '../../../models/product.client';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductsService} from '../../../services/products.service';
import { ImageService } from '../../../services/image.service.client';
import { User } from '../../../models/user.model.client';
import { SharedService } from '../../../services/shared.service';
import { Image } from '../../../models/image.model.client';
import { environment } from '../../../../environments/environment.prod';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

  private subscriptions: Array<Subscription> = [];
  user: User;
  productId : String;
  userId: String;

  product: Product;

  baseUrl = environment.baseUrl;
  constructor(
    private productService: ProductsService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private imageService: ImageService,
    private sharedService: SharedService,
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      (params: any) => {
        this.productId = params['prid'];
        this.user = this.sharedService.user;
        this.userId = this.user._id;
        console.log("productId");
        console.log(this.productId);
        this.productService.findProductById(this.productId).subscribe(
          (resProduct: Product) => {
          this.product = resProduct;
        });
      }
    );

    this.productService.resetImage().subscribe(
      () => {},
    );
  }


  updateProduct() {
    this.productService.updateProduct(this.userId, this.product).subscribe(
      (resProduct: Product) => {
        this.product = resProduct;
        this.router.navigate(['/seller/' + this.userId + '/products']);
      }
    );
  }

}
