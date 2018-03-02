import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { PageService } from '../../../services/page.service.client';
import { Page } from '../../../models/page.model.client';

@Component({
  selector: 'app-page-edit',
  templateUrl: './page-edit.component.html',
  styleUrls: ['./page-edit.component.css']
})
export class PageEditComponent implements OnInit {

  userId: String;
  pageId: String;
  updatedPage: Page = { _id: "", name: "", websiteId: "", title: "" };
  name: String;
  websiteId: String;
  description: String;

  constructor(
    private pageService: PageService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      (params: any) => {
        this.userId = params['uid'];
        this.pageId = params['pid'];
        this.websiteId = params['wid'];
      }
    );
    this.updatedPage = this.pageService.findPageById(this.pageId);
  }

  updatePage(page) {
    if (page.name.trim() !== '' && page.title.trim() !== '') {
      this.pageService.updatePage(page);
      const url: any = '/user/' + this.userId + '/website/' + this.websiteId + '/page';
      this.router.navigate([url]);
    }
  }

  deletePage() {
    this.pageService.deletePage(this.pageId);
    const url: any = '/user/' + this.userId + '/website/' + this.websiteId + '/page';
    this.router.navigate([url]);
  }

}





