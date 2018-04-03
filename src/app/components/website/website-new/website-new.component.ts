import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { WebsiteService } from '../../../services/website.service.client';
import { Website } from '../../../models/website.model.client';

@Component({
  selector: 'app-website-new',
  templateUrl: './website-new.component.html',
  styleUrls: ['./website-new.component.css']
})
export class WebsiteNewComponent implements OnInit {

  userId: String;
  websites: Website[] = [];
  newWebsite: Website ;

  constructor(private websiteService: WebsiteService,
              private activatedRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      (params: any) => {
        this.userId = params['uid'];
      }
    );
    this.newWebsite = this.websiteService.initialWebsite();
    this.websiteService.findWebsitesById(this.userId).subscribe(
      (websites: Website[]) => {
        this.websites = websites;
      }
    );
  }

  createWebsite() {
    this.websiteService.createWebsiteForUser(this.userId, this.newWebsite).subscribe(
      (website: Website) => {
        const url: any = '/user/' + this.userId + '/website';
        this.router.navigate([url]);
      }
    );
  }

}
