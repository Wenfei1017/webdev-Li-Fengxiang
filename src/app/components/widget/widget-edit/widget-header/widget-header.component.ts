import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Widget } from '../../../../models/widget.model.client';
import {WidgetService} from '../../../../services/widget.service.client';
import {isCombinedNodeFlagSet} from 'tslint';

@Component({
  selector: 'app-widget-header',
  templateUrl: './widget-header.component.html',
  styleUrls: ['./widget-header.component.css']
})
export class WidgetHeaderComponent implements OnInit {

  widget: Widget;
  widgetId: String;
  pageId: String;

  constructor(
    private widgetService: WidgetService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  updateWidget() {
    if (!this.widget._id) {
      this.widgetService.createWidget(this.pageId, this.widget).subscribe(
        (widget: Widget) => {
          this.widget = widget;
          this.router.navigate(['../'], {relativeTo: this.activatedRoute});
          console.log(this.widget);
        }
      );
    } else {
      this.widgetService.updateWidget(this.widget._id, this.widget).subscribe(
        () => {
          this.router.navigate(['../'], {relativeTo: this.activatedRoute});
        }
      );
    }
    this.widget = this.widgetService.initialWidget();
  }

  deleteWidget() {
    console.log("delete");
    console.log(this.widget);
    this.widgetService.deleteWidget(this.widget._id).subscribe(
      () => {
        console.log("testDDD");
        console.log(this.activatedRoute);
        this.router.navigate(['../'], {relativeTo: this.activatedRoute});
      }
    );
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: any) => {
      this.widgetId = params['wgid'];
      this.pageId = params['pid'];
      if (this.widgetId === 'heading') {
        this.widget = this.widgetService.initialWidget();
        this.widget.widgetType = 'HEADING';
      } else {
        this.widgetService.findWidgetById(this.widgetId).subscribe(
          (widget: Widget) => {
            this.widget = widget;
            console.log(this.widget);
          },
          (error: any) => {
            console.log("error");
          }
        );
      }
    });
  }
}
