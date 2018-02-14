import { Component, OnInit } from '@angular/core';
import {Page} from '../../../models/page.model.client';
import {PageService} from '../../../services/page.service.client';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-page-edit',
  templateUrl: './page-edit.component.html',
  styleUrls: ['./page-edit.component.css']
})
export class PageEditComponent implements OnInit {

  page: Page;

  constructor(
    private pageService: PageService,
    private route: ActivatedRoute) { }

  updatePage(page: Page) {
    console.log(page);
    this.page = this.pageService.updatePage(page);
  }
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.page = this.pageService.findPageById(params['pageId']);
    });
  }

}





