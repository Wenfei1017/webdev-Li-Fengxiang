import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../../../services/user.service.client';
import {User} from '../../../models/user.model.client';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  @ViewChild('f') profileForm: NgForm;

  user: User;
  constructor(
    private userService: UserService,
    private route: ActivatedRoute) { }

  updateUser() {
    console.log(this.user);
    this.user = this.userService.updateUser(this.user);
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.user = this.userService.findUserById(params['uid']);
      console.log(this.user);
    });
  }

}
