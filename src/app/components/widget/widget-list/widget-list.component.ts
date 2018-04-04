import {Component, OnInit, Inject} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';
import {environment} from '../../../../environments/environment';

import {Widget} from '../../../models/widget.model.client';
import {WidgetService} from '../../../services/widget.service.client';

import {FlickrService} from '../../../services/flickr.service.client';

@Component({
  selector: 'app-widget-list',
  templateUrl: './widget-list.component.html',
  styleUrls: ['./widget-list.component.css']
})
export class WidgetListComponent implements OnInit {

  widgets: Widget[] = [];
  pageId: String;
  userId: String;

  websiteId: String;
  baseUrl: String;

  photoWidgetId: String;
  photoWidget: Widget;
  photos: any[];
  searchText: String;

  constructor(private widgetService: WidgetService,
              private activatedRoute: ActivatedRoute,
              private flickrService: FlickrService,
              private router: Router,
              public sanitizer: DomSanitizer) {
  }

  searchPhotos() {
    this.flickrService
      .searchPhotos(this.searchText)
      .subscribe(
        (data: any) => {
          var val = data._body;
          val = val.substring('jsonFlickrApi('.length, val.length - 1);
          val = JSON.parse(val);
          this.photos = val.photos;
        }
      );
  }

  selectPhoto(photo) {
    this.photoWidget.url = 'https://farm' + photo.farm + '.staticflickr.com/' + photo.server
      + '/' + photo.id + '_' + photo.secret + '_b.jpg';

    if (!this.photoWidget._id) {
      this.widgetService.createWidget(this.pageId, this.photoWidget).subscribe(
        (data: Widget) => {
          this.photoWidget = data;
          this.router.navigate(['../..'], {relativeTo: this.activatedRoute});
        }
      );
    } else {
      this.widgetService.updateWidget(this.photoWidget._id, this.photoWidget).subscribe(
        () => {
          this.router.navigate(['../..'], {relativeTo: this.activatedRoute});
        }
      );
    }
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

      this.photoWidgetId = params['wgid'];
      this.websiteId = params['wid'];

      this.widgetService.findWidgetsByPageId(this.pageId).subscribe(
        (widgets: Widget[]) => {
          this.widgets = widgets;
        }
      );
    });
  }
}
