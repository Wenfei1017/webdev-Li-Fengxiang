import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { WidgetService } from '../../../../services/widget.service.client';
import { Widget } from '../../../../models/widget.model.client';

@Component({
  selector: 'app-widget-image',
  templateUrl: './widget-image.component.html',
  styleUrls: ['./widget-image.component.css']
})
export class WidgetImageComponent implements OnInit {

  // properties
  widget: Widget = {
    _id: "", widgetType: "", pageId: "", size: "", text: "", url: "", width: ""
  };
  userId: String;
  websiteId: String;
  pageId: String;
  widgetId: String;

  constructor(
    private widgetService: WidgetService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      (params: any) => {
        this.widgetId = params['wgid'];
        this.pageId = params['pid'];
        this.userId = params['uid'];
        this.websiteId = params['wid'];
      }
    );

    this.widget = this.widgetService.findWidgetById(this.widgetId);
  }

  updateWidget(widget: Widget) {
    this.widgetService.updateWidget(widget._id, widget);
    const url: any = "/user/" + this.userId + "/website/" + this.websiteId + "/page/" + this.pageId + "/widget";
    this.router.navigate([url]);
  }

  deleteWidget() {
    this.widgetService.deleteWidget(this.widgetId);
    const url: any = "/user/" + this.userId + "/website/" + this.websiteId + "/page/" + this.pageId + "/widget";
    this.router.navigate([url]);
  }
}
