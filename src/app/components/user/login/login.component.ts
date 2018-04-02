import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { UserService } from '../../../services/user.service.client';
import { User } from '../../../models/user.model.client';
import { NgForm } from '@angular/forms';
import { ViewChild } from '@angular/core';

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

  constructor(private userService: UserService, private router: Router) {}


  login() {
    this.username = this.loginForm.value.username;
    this.password = this.loginForm.value.password;
    
    this.userService.findUserByCredential(this.username, this.password).subscribe(
      (user: User) => {
        console.log(user);
        this.errorFlag = false;
        this.router.navigate(['/user', user._id]);
      },
      (error: any) => {
        this.errorFlag = true;
      }
    );
  }

  ngOnInit() {
  }

}
