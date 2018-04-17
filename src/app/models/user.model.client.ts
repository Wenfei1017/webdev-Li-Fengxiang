export class User {
  _id: String;
  username: String;
  password: String;
  email: String;
  // lastName: String;
  userType: String;

  // type : ColorEnum = { RED : 0, GREEN : 1, BLUE : 2 };
  widgetType: {
    type: String,
    enum: ['user', 'seller', 'admin', 'advertiser'],
    default: 'User'
  };

  constructor(_id, username, password, emial, type) {
    this._id = _id;
    this.username = username;
    this.password = password;
    this.email = emial;
    // this.lastName = lastName;
    this.userType = type;
  }
}
