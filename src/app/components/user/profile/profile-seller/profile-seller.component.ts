import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../../../services/user.service.client';
import {User} from '../../../../models/user.model.client';
import {NgForm} from '@angular/forms';
import { SharedService } from '../../../../services/shared.service';

@Component({
  selector: 'app-profile-seller',
  templateUrl: './profile-seller.component.html',
  styleUrls: ['./profile-seller.component.css']
})
export class ProfileSellerComponent implements OnInit {

  @ViewChild('f') profileForm: NgForm;

  user: User;
  userId: String;

  errorFlag: boolean;
  errorMsg: String;

  updateFlag: boolean;
  updateMsg: String;

  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private sharedService: SharedService,
    private router: Router
  ) { }

  updateUser() {
    this.userService.updateUser(this.user).subscribe(
      (user: User) => {
        this.errorFlag = false;
        this.updateFlag = true;
        this.updateMsg = "Update Success!!";
      }, (error: any) => {
        this.errorFlag = true;
        this.errorMsg = error._body;
      }
    );
  }

  logout() { this.userService.logout()
    .subscribe(
      (data: any) => {
        this.router.navigate(['/login', this.user.userType]);
      }
    );
  }
  ngOnInit() {

    this.user = this.sharedService.user;
    if (this.user == null) {
      this.user = this.userService.initialUser();
    }
    this.userId = this.sharedService.user._id;
  }
  deleteUser() {
    this.userService.deleteUser(this.userId).subscribe(() => {});
  }

}
