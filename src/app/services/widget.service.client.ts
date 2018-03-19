
import {Injectable} from '@angular/core';
import { Widget } from '../models/widget.model.client';

@Injectable()
export  class WidgetService {

  // constructor(_id:String, type:String, pageId:String, size= '1', text = 'text', url = 'url', width = '100%')
  widgets: Widget[] = [
    new Widget('123', 'HEADER', '100', '2', 'GIZMODO'),
    new Widget('234', 'HEADER', '100', '4', 'GIZMODO'),
    new Widget('345', 'IMAGE', '100', '2', 'text', '100%', 'https://wow.olympus.eu/webfile/img/1632/x=1024/oly_testwow_stage.jpg'),
    new Widget('456', 'HTML', '100', '2', '<p>blalbla</p>' ),
    new Widget('567', 'HEADER', '100', '4', 'text'),
    new Widget('678', 'IMAGE', '100', '2', 'GIZMODO','100%' , 'http://lorempixel.com/400/200/' ),
    new Widget('789', 'IMAGE', '100', '2', '<p>Lorem ipsum</p>' ,'100%' , 'http://lorempixel.com/400/200/'),
    new Widget('789', 'IMAGE', '100', '2', '<p>Lorem ipsum</p>' ,'100%' , 'http://lorempixel.com/400/200/'),
  ];
  createWidget(pageId, widget) {
    const set1 = new Set();

    for (const i in this.widgets) {
      set1.add(this.widgets[i]._id);
    }

    widget._id = Math.random().toString();
    while (set1.has(widget._id)) {
      widget._id = Math.random().toString();
    }
    this.widgets.push(widget);
    console.log("sfdasfasd");
    console.log(this.widgets);

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








