import { User } from '../models/user.model.client';
import {Injectable} from '@angular/core';

@Injectable()
export class UserService {
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

// [
//   {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
//   {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
//   {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
//   {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
// ]
