import { Component, OnInit } from '@angular/core';
import {PageService} from '../../../services/page.service.client';
import {Page} from '../../../models/page.model.client';
import {ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-page-list',
  templateUrl: './page-list.component.html',
  styleUrls: ['./page-list.component.css']
})
export class PageListComponent implements OnInit {

  webSiteId: String;
  pages: Page[] = [];

  constructor(private pageService: PageService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      (params: any) => {
        this.webSiteId = params['wid'];
      }
    );

    this.pageService.findPagesByWebsiteId(this.webSiteId).subscribe(
      (pages: Page[]) => {
        this.pages = pages;
      }
    );
  }
}
