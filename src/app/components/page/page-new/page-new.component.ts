import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { PageService } from '../../../services/page.service.client';
import { Page } from '../../../models/page.model.client';
import {Website} from '../../../models/website.model.client';

@Component({
  selector: 'app-page-new',
  templateUrl: './page-new.component.html',
  styleUrls: ['./page-new.component.css']
})
export class PageNewComponent implements OnInit {

  userId: String;
  websiteId: String;
  newPage: Page;

  constructor(
    private pageService: PageService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      (params: any) => {
        this.userId = params['uid'];
        this.websiteId = params['wid'];
      }
    );
    this.newPage = this.pageService.initialPage();
  }

  createPage() {
    if (this.newPage.name.trim() !== '' && this.newPage.title.trim() !== '') {
      this.pageService.createPage(this.websiteId, this.newPage).subscribe(
        (page: Page) => {
          const url: any = "/user/" + this.userId + "/website/" + this.websiteId + "/page"
          this.router.navigate([url]);
        }
      );
    }
  }
}
