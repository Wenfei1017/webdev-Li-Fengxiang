export class Image {
  _id: String;
  size: String;
  url: String;
  width: String;
  name: String;

  constructor(_id, name = 'Default', size= '1', width = '100%', url = 'url') {
    this._id = _id;
    this.size = size;
    this.url = url;
    this.width = width;
    this.name = name;
  }
}
