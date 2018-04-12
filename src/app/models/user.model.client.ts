export class User {
  _id: String;
  username: String;
  password: String;

  firstName: String;
  lastName: String;

  // type : ColorEnum = { RED : 0, GREEN : 1, BLUE : 2 };
  widgetType: {
    type: String,
    enum: ['user', 'seller', 'admin', 'advertiser'],
    default: 'User'
  };

  constructor(_id, username, password, firstName, lastName) {
    this._id = _id;
    this.username = username;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
  }
}
