import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../../../../services/shared.service';
import { CartService } from '../../../../../services/cart.service.client';
import { UserService } from '../../../../../services/user.service.client';
import { User } from '../../../../../models/user.model.client';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css']
})
export class AllUsersComponent implements OnInit {

  user: User;
  public users: Array<User>;
  private sub;

  constructor(private sharedService: SharedService,
              private userService: UserService) { }

  ngOnInit() {
    this.user = this.sharedService.user3;
    this.loadSeller();
  }

  loadSeller = () => {
    // this.sub = this.userService.findAllUser(this.user._id).subscribe(
    //   (users: User[]) => {
    //     this.users = users;
    //   })
  };
}
