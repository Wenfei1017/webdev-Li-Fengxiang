import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { UserService } from '../../../services/user.service.client';
import { User } from '../../../models/user.model.client';
import { NgForm } from '@angular/forms';
import { ViewChild } from '@angular/core';
import { SharedService } from '../../../services/shared.service';
import {environment} from '../../../../environments/environment';
import enumerate = Reflect.enumerate;
import { CartService } from '../../../services/cart.service.client';
import { Product} from '../../../models/product.client';
import { ProductsService } from '../../../services/products.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild('f') loginForm: NgForm;
  username: String; // see usage as two-way data binding
  password: String; // see usage as two-way data binding

  errorFlag: boolean;
  errorMsg = 'Invalid username or password !';

  baseUrl = environment.baseUrl;

  userType: string;
  user: User;
  userId: String;
  public products:Array<Product>;
  private sub;

  constructor(private userService: UserService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private sharedService: SharedService,
              private productService: ProductsService,
  ) {}


  login() {
    this.username = this.loginForm.value.username;
    this.password = this.loginForm.value.password;

    // this.userService.findUserByCredential(this.username, this.password).subscribe(
    //   (user: User) => {
    //     this.errorFlag = false;
    //     this.sharedService.user = user;
    //     console.log("findUserByCredential");
    //     console.log("user");
    //     console.log(user);
    //     if (this.userType === 'user') {
    //       this.router.navigate(['/user', user._id]);
    //     }
    //     if (this.userType === 'admin') {
    //       this.router.navigate(['/admin', user._id]);
    //     }
    //     if (this.userType === 'seller') {
    //       this.router.navigate(['/seller', user._id]);
    //     }
    //     if (this.userType === 'admin') {
    //       this.router.navigate(['/admin', user._id]);
    //     }
    //     this.router.navigate(['/user', user._id]);
    //   },
    //   (error: any) => {
    //     this.errorFlag = true;
    //   }
    // );

    // calling client side userservice to send login information
    console.log('data', this.username);
    this.userService.login(this.username, this.password)
      .subscribe(
        (user: User) => {
          this.sharedService.user = user;
          // console.log(this.sharedService.user);
          this.errorFlag = false;

          console.log("loginFinished!!");
          console.log(user);

          if (user.userType == 'user') {
            this.router.navigate(['/user', user._id]);
          }
          if (user.userType == 'admin') {
            this.router.navigate(['/admin', user._id]);
          }
          if (user.userType == 'seller') {
            console.log("sellerTest");
            this.router.navigate(['/seller', user._id]);
          }
          if (user.userType == 'admin') {
            this.router.navigate(['/admin', user._id]);
          }
        },
        (error: any) => {
          console.log(error);
        }
      );
  }

  navigateToFacebook() {
    this.errorFlag = false;
    window.location.href = this.baseUrl + '/facebook/login';
  }

  ngOnInit() {
    this.load();
    this.activatedRoute.params.subscribe(
      (params: any) => {
        this.userType = params['type'];
        console.log(this.userType);
        this.user = this.sharedService.user1;
      }
    );
  }

  load = () => {
    this.sub = this.productService.getProducts('./assets/mock-data/products.json')
      .subscribe(res => {
        this.products = res;
      })
  };

}
