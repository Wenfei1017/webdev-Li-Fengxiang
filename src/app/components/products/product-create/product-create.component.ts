import { Component, OnInit } from '@angular/core';
import { Subscription }                                    from 'Rxjs';
import { Product} from '../../../models/product.client';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductsService} from '../../../services/products.service';
import { ImageService } from '../../../services/image.service.client';
import { User } from '../../../models/user.model.client';
import { SharedService } from '../../../services/shared.service';
import { Image } from '../../../models/image.model.client';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {

  private subscriptions: Array<Subscription> = [];
  uid: String;
  user: User;
  image: Image;

  constructor(
    private productService: ProductsService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private imageService: ImageService,
    private sharedService: SharedService,
  ) { }

  ngOnInit() {
    this.user = this.sharedService.user2;
  }

  private createComputer(product: Product) {

  //   const apiServiceSubscription = this.apiService
  //     .createNewComputer(product)
  //     .subscribe(response => {
  //         if(response.success){
  //
  //           // Notifying the users about the action status
  //           this.notificationService.push(new Notification(
  //             'The item was successfully created!',
  //             '',
  //             'assets/images/notifications/success.png',
  //             DirOptions.auto
  //           ));
  //
  //           this.router.navigate(['/admin']);
  //         }
  //       },
  //       error => console.error(`An error has occurred! ${error}`));
  //   this.subscriptions.push(apiServiceSubscription);
  }

  createImage(widgetType: String) {
    const newWidget: any = {
      type: widgetType, name: 'name', size: 1, width: '30%',
      height: '30%', rows: 0, deletable: false, formatted: false, placeholder: '',
      // position: this.widgets.length
    }
    // this.widgetService.createImage(newWidget).subscribe(
    //   (widget: any) => {
    //     const url: any = '/seller/' + this.uid + '/products/' + '/new/' + widget._id;
    //     this.router.navigate([url]);
    //   },
    //   (error: any) => {
    //     console.log(error);
    //   }
    // );
  }

  updateImage() {
    if (!this.image._id) {
      this.imageService.createImage(this.uid, this.image).subscribe(
        (image: Image) => {
          this.image = image;
          this.router.navigate(['../'], {relativeTo: this.activatedRoute});
        }
      );
    } else {
      this.imageService.updateImage(this.image._id, this.image).subscribe(
        () => {
          this.router.navigate(['../'], {relativeTo: this.activatedRoute});
        }
      );
    }
  }

}
