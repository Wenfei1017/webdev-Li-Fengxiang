import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgSwitch } from '@angular/common';

import { Widget } from '../../../models/widget.model.client';
import {WidgetService} from '../../../services/widget.service.client';

@Component({
  selector: 'app-widget-edit',
  templateUrl: './widget-edit.component.html',
  styleUrls: ['./widget-edit.component.css']
})
export class WidgetEditComponent implements OnInit {

  widgetId: String;
  widget: Widget;

  constructor(
    private widgetService: WidgetService,
    private activatedRoute: ActivatedRoute
  ) { }


  ngOnInit() {
    this.activatedRoute.params.subscribe((params: any) => {
      this.widgetId = (params['wgid']);

      // new
      this.widget = this.widgetService.initialWidget();

      this.widgetService.findWidgetById(this.widgetId).subscribe(
        (widget: Widget) => {
          this.widget = widget;
        }
      );
    });
  }

}







