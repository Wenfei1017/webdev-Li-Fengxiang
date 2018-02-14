import { Component, OnInit } from '@angular/core';
import { Widget} from '../../../models/widget.model.client';
import {WidgetService} from '../../../services/widget.service.client';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-widget-edit',
  templateUrl: './widget-edit.component.html',
  styleUrls: ['./widget-edit.component.css']
})
export class WidgetEditComponent implements OnInit {

  widget: Widget;

  constructor(
    private widgetService: WidgetService,
    private route: ActivatedRoute) { }

  updatePage(widget: Widget) {
    console.log(Widget);
    this.widgetService.updateWidget(widget._id, widget);
  }
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.widget = this.widgetService.findWidgetById(params['widgetId']);
    });
  }

}







