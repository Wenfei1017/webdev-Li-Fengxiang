import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { UserService } from '../../../services/user.service.client';
import { User } from '../../../models/user.model.client';
import { NgForm } from '@angular/forms';
import { ViewChild } from '@angular/core';
import { SharedService } from '../../../services/shared.service';
import {environment} from '../../../../environments/environment';

import { DOCUMENT } from '@angular/platform-browser';

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

  constructor(private userService: UserService, private router: Router, private sharedService: SharedService
  ) {}


  login() {
    this.username = this.loginForm.value.username;
    this.password = this.loginForm.value.password;

    this.userService.findUserByCredential(this.username, this.password).subscribe(
      (user: User) => {
        this.errorFlag = false;
        this.router.navigate(['/user', user._id]);
      },
      (error: any) => {
        this.errorFlag = true;
      }
    );

    // calling client side userservice to send login information
    console.log('data', this.username);
    this.userService.login(this.username, this.password)
      .subscribe(
        (data: any) => {
          this.sharedService.user = data;
          this.errorFlag = false;
          this.router.navigate(['/use'])},
        (error: any) => {
          console.log(error);
        }
      );
  }

  navigateToFacebook() {
    // this.router.navigate([this.baseUrl + '/facebook/login']);
    // window.open(this.baseUrl + '/facebook/login');
    this.router.ngOnDestroy();
    window.location.href = this.baseUrl + '/facebook/login;
  }


  ngOnInit() {
  }

}
