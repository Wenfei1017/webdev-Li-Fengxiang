
import {Injectable} from '@angular/core';
import { Widget } from '../models/widget.model.client';

@Injectable()
export  class WidgetService {

  // constructor(_id:String, type:String, pageId:String, size= '1', text = 'text', url = 'url', width = '100%')
  widgets: Widget[] = [
    new Widget('123', 'HEADING', '321', '2', 'GIZMODO' ),
    new Widget('234', 'HEADER', '321', '4', 'GIZMODO' ),
    new Widget('345', 'IMAGE', '321', '2', 'text', '100%', 'http://lorempixel.com/400/200/'),
    new Widget('456', 'HTML', '321', '2', '<p>blalbla</p>' ),
    new Widget('567', 'HEADING', '321', '4', 'text', '100%', 'https://youtube.com/token' ),
    new Widget('678', 'YOUTUBE', '321', '2', 'GIZMODO' ),
    new Widget('789', 'HTML', '321', '2', '<p>Lorem ipsum</p>' ),
  ];

  createWidget(pageId, widget) {
    this.widgets.push(widget);
  }

  updateWidget(widgetId, widget) {
    for ( const i in this.widgets ) {
      if ( this.widgets[i]._id === widgetId ) {
        switch (widget.widgetType) {
          case 'HEADER':
            this.widgets[i].text = widget.text;
            this.widgets[i].size = widget.size;
            return true;

          case 'IMAGE':
            this.widgets[i].text = widget.text;
            this.widgets[i].url = widget.url;
            this.widgets[i].width = widget.width;
            return true;

          case 'YOUTUBE':
            this.widgets[i].text = widget.text;
            this.widgets[i].url = widget.url;
            this.widgets[i].width = widget.width;
            return true;
        }

      }
    }
    return false;
  }

  findWidgetsByPageId(pageId: String) {
    return this.widgets.filter(function (widget) {
      return widget.pageId === pageId;
    });
  }

  findWidgetById(widgetId: String) {
    return this.widgets.find(function (widget) {
      return widget._id === widgetId;
    });
  }
  deleteWidget(widgetId: String) {
    for (const i in this.widgets) {
      if (this.widgets[i]._id === widgetId) {
        const j = +i;
        this.widgets.splice(j, 1);
      }
    }
  }
}


// [
//   { "_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
//   { "_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "GIZMODO"},
//   { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
//     "url": "http://lorempixel.com/400/200/"},
//   { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
//   { "_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
//   { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
//     "url": "https://youtu.be/AM2Ivdi9c4E" },
//   { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
// ]







