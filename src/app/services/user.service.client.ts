import { User } from '../models/user.model.client';
import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/Rx';
import {environment} from '../../environments/environment';

@Injectable()
export class UserService {

  constructor(private http: Http) {}

  baseUrl = environment.baseUrl;

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

