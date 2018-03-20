import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgSwitch } from '@angular/common';

import { Widget } from '../../../models/widget.model.client';

@Component({
  selector: 'app-widget-edit',
  templateUrl: './widget-edit.component.html',
  styleUrls: ['./widget-edit.component.css']
})
export class WidgetEditComponent implements OnInit {

  widgetId: String;
  widget: Widget;

  constructor(
    @Inject('WidgetService') private widgetService,
    private activatedRoute: ActivatedRoute
  ) { }


  ngOnInit() {
    this.activatedRoute.params.subscribe((params: any) => {
      this.widgetId = (params['widgetId']);

      // new
      this.widget = this.widgetService.initialWidget();
      if (this.widgetId === 'heading') {
        this.widget.widgetType = 'HEADING';
      } else if (this.widgetId === 'image') {
        this.widget.widgetType = 'IMAGE';
      } else if (this.widgetId === 'youtube') {
        this.widget.widgetType = 'YOUTUBE';
      } else if (this.widgetId === 'text') {
        this.widget.widgetType = 'TEXT';
      } else if (this.widgetId === 'html') {
        this.widget.widgetType = 'HTML';

        // update
      } else {
        this.widgetService.findWidgetById(this.widgetId).subscribe(
          (widget: Widget) => {
            this.widget = widget;
            console.log(this.widget);
          }
        );
      }
    });
  }

}







