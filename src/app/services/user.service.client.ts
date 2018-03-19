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

  createUser(user: User) {
    this.users.push(new User(user._id, user.username, user.password, user.firstName, user.lastName));
  }

  findUserByUsername(username: String) {
    return this.users.find( function (user){
      return user.username === username;
    });
  }

  findUserByCredential(username: String, password: String) {
    return this.users.find( function (user){
      return user.username === username && user.password === password;
    });
  }

  findUserByCredentials(username, password) {
    return this.http.get(this.baseUrl + username + '&password=' + password)
      .map((response: Response) => {
        return response.json();
      });
  }

  findUserById(userId: String) {
    return this.users.find(function(user){
      return user._id === userId;
    });
  }

  updateUser(user: User) {
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i]._id === user._id) {
        this.users[i].firstName = user.firstName;
        this.users[i].lastName = user.lastName;
        return this.users[i];
      }
    }
  }

  deleteUser(userId: String) {
    for (const i in this.users) {
      if (this.users[i]._id === userId) {
        const j = +i;
        this.users.splice(j, 1);
      }
    }
  }

}

