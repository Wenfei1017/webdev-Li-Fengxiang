import { User } from '../models/user.model.client';
import {Injectable} from '@angular/core';
import {Http, RequestOptions, Response} from '@angular/http';
import 'rxjs/Rx';
import { environment } from '../../environments/environment';
import { SharedService } from './shared.service';
import { Router } from '@angular/router';

@Injectable()
export class UserService {

  constructor(private http: Http, private sharedService: SharedService, private router: Router ) {}

  baseUrl = environment.baseUrl;

  options = new RequestOptions();

  users: User[] = [
    new User('123', 'alice',     'alice',     'Alice',   'Wonder'),
    new User( '234',  'bob',       'bob',       'Bob',     'Marley'),
    new User( '345',  'charly',    'charly',    'Charly',  'Garcia'),
    new User( '456',  'jannunzi',  'jannunzi',  'Jose',    'Annunzi' ),
  ];

  initialUser() {
    return new User(undefined, undefined, undefined, undefined, undefined);
  }



  createUser(user: User) {
    const url = this.baseUrl + '/api/user';
    return this.http.post(url, user)
      .map((res: Response) => {
        return res.json();
      });
  }


  findUserByUsername(username: String) {
    const url = this.baseUrl + '/api/user?username=' + username;
    return this.http.get(url)
      .map((res: Response) => {
        return res.json();
      });
  }

  register(username: String, password: String) {
    this.options.withCredentials = true;
    const user = {
      username : username,
      password : password
    };
    console.log(this.options);
    return this.http.post(this.baseUrl + '/api/register', user, this.options).map(
      (res: Response) => {
        const data = res.json();
        return data;
      } );
  }

  login(username: String, password: String) {
    this.options.withCredentials = true; // jga
    const body = { username : username, password : password
    };
    return this.http.post(this.baseUrl + '/api/login', body, this.options)
      .map(
        (res: Response) => {
          const data = res.json();
          return data; }
      );
  }

  logout() {
    this.options.withCredentials = true;
    return this.http.post(this.baseUrl + '/api/logout', '', this.options)
      .map(
        (res: Response) => {
          const data = res;
        }
      );
  }

  loggedIn() {
    this.options.withCredentials = true;
    return this.http.post(this.baseUrl + '/api/loggedIn', '', this.options)
      .map(
        (res: Response) => {
          const user = res.json();
            if (user !== 0) {
              this.sharedService.user = user; // setting user so as to share with all components
              return true;
            } else {
              this.router.navigate(['/login']);
              return false;
            }
        });
  }

  findUserByCredential(username: String, password: String) {
    const url = this.baseUrl + '/api/user?username=' + username + '&password=' + password;
    return this.http.get(url)
      .map((res: Response) => {
        return res.json();
      });
  }

  findUserById(userId: String) {
    const url = this.baseUrl + '/api/user/' + userId;
    return this.http.get(url)
      .map((res: Response) => {
        return res.json();
      });
  }

  updateUser(user: User) {
    const url = this.baseUrl + '/api/user/' + user._id;
    return this.http.put(url, user)
      .map((res: Response) => {
        return res.json();
      });
  }

  deleteUser(userId: String) {
    const url = this.baseUrl + '/api/user/' + userId;
    return this.http.delete(url);
  }

}

