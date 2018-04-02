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
  updatedPage: Page;
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
    this.pageService.findPageById(this.pageId).subscribe(
      (page: Page) => {
        this.updatedPage = page;
      }
    );
  }

  updatePage() {
    if (this.updatedPage.name.trim() !== '' && this.updatedPage.title !== '' && this.updatedPage.title.trim() !== '') {
      this.pageService.updatePage(this.updatedPage).subscribe(
        (page: Page) => {
          this.router.navigate(['../'], {relativeTo: this.activatedRoute});
        }
      );
    }
  }

  deletePage() {
    this.pageService.deletePage(this.pageId).subscribe(
      () => {
        this.router.navigate(['../'], {relativeTo: this.activatedRoute});
      }
    );
  }
}





