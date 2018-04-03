import {Component, OnInit, Inject} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';

import {Widget} from '../../../models/widget.model.client';
import {WidgetService} from '../../../services/widget.service.client';

@Component({
  selector: 'app-widget-list',
  templateUrl: './widget-list.component.html',
  styleUrls: ['./widget-list.component.css']
})
export class WidgetListComponent implements OnInit {

  widgets: Widget[] = [];
  pageId: String;
  userId: String;

  constructor(private widgetService: WidgetService,
              private activatedRoute: ActivatedRoute,
              public sanitizer: DomSanitizer) {
  }

  // receiving the emitted event
  sortWidgets(indexes) {
    // call widget service function to update widget as per index

    this.widgetService.sortWidgets(indexes.startIndex, indexes.endIndex, this.pageId)
      .subscribe(
        function (page) {
          this.widgets = page.widgets;
        });
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: any) => {
      this.pageId = params['pid'];
      this.userId = params['uid'];
      this.widgetService.findWidgetsByPageId(this.pageId).subscribe(
        (widgets: Widget[]) => {
          this.widgets = widgets;
        }
      );
    });
  }
}
