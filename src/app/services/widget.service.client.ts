import { Widget } from '../models/widget.model.client';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';
import { environment } from '../../environments/environment';

@Injectable()
export  class WidgetService {

  constructor(private http: Http) { }

  baseUrl = environment.baseUrl;
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
  initialWidget() {
    return new Widget(undefined, undefined, undefined);
  }

  createWidget(pageId: String, widget: Widget) {
    return this.http.post(this.baseUrl + '/api/page/' + pageId + '/widget', widget)
      .map((res: Response) => {
        return res.json();
      });
  }

  findWidgetsByPageId(pageId: String) {
    return this.http.get(this.baseUrl + '/api/page/' + pageId + '/widget')
      .map((res: Response) => {
        return res.json();
      });
  }
  findWidgetById(widgetId: String) {
    return this.http.get(this.baseUrl + '/api/widget/' + widgetId)
      .map((res: Response) => {
        return res.json();
      });
  }

  updateWidget(widgetId: String, widget: Widget) {
    return this.http.put(this.baseUrl + '/api/widget/' + widgetId, widget)
      .map((res: Response) => {
        return res.json();
      });
  }

  deleteWidget(widgetId: String) {
    return this.http.delete(this.baseUrl + '/api/widget/' + widgetId);
  }
}








