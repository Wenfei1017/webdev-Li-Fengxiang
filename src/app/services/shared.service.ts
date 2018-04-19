import {Injectable} from '@angular/core';
import {User} from '../models/user.model.client';

@Injectable()

export class SharedService {
  user: User;
  user1 = new User('123', 'alice',     'alice',   'Wonder', 'user');
  user2 = new User('234',  'bob',       'bob',  'Marley', 'seller');
  user3 = new User('567', 'Amy', 'Amy', '1234', 'admin');
  // users: User[] = [
  //   new User('123', 'alice',     'alice',     'Alice',   'Wonder', 'buyer'),
  //   new User( '234',  'bob',       'bob',       'Bob',     'Marley', 'seller'),
  //   new User( '345',  'charly',    'charly',    'Charly',  'Garcia', 'advertise'),
  //   new User( '456',  'jannunzi',  'jannunzi',  'Jose',    'Annunzi', 'buyer' ),
  // ];
}


