import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from '../../../services/user.service.client';
import { User } from '../../../models/user.model.client';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @ViewChild('f') registerForm: NgForm;

  user: User;
  verifyPassword: String;
  errorFlag: boolean;
  errorMsg: String;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.user = this.userService.initialUser();
  }

  register() {
    this.errorFlag = false;

    if (this.user.password !== this.verifyPassword) {
      this.errorMsg = 'Password and Verify Password do not match.';
      this.errorFlag = true;
    } else {
      this.userService.createUser(this.user).subscribe(
        (user: User) => {
          this.user = user;
          this.router.navigate(['/user', user._id]);
        },(error: any) => {
          this.errorFlag = true;
          this.errorMsg = error._body;
        }
      );
    }
  }

}
