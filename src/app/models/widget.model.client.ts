export class Widget {
  _id: String;
  widgetType: String;
  pageId: String;
  size: String;
  text: String;
  url: String;
  width: String;
  name: String;

  constructor(_id, type, pageId, name = 'Default', size= '1', text = 'text', width = '100%', url = 'url') {
    this._id = _id;
    this.widgetType = type;
    this.pageId = pageId;
    this.size = size;
    this.url = url;
    this.text = text;
    this.width = width;
    this.name = name;
  }
}

