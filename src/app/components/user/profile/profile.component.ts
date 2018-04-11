import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../../services/user.service.client';
import {User} from '../../../models/user.model.client';
import {NgForm} from '@angular/forms';
import {Website} from '../../../models/website.model.client';
import { SharedService } from '../../../services/shared.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  @ViewChild('f') profileForm: NgForm;

  user: User;

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
        // this.refreshData();
      }, (error: any) => {
        this.errorFlag = true;
        this.errorMsg = error._body;
      }
    );
  }

  logout() { this.userService.logout()
    .subscribe(
      (data: any) => {
        // this.sharedService.user = null;
        this.router.navigate(['/login']);
      }
    );
  }


  ngOnInit() {
    // this.activatedRoute.params.subscribe(params => {
    //   this.userId = params['uid'];
    // });
    // this.refreshData();
    this.user = this.sharedService.user;
  }

  // refreshData() {
  //   this.userService.findUserById(this.userId)
  //     .subscribe(
  //       (user: User) => {
  //         this.user = user;
  //       }
  //     );
  // }

  deleteUser() {
    this.userService.deleteUser(this.user._id).subscribe(() => {});
  }
}



