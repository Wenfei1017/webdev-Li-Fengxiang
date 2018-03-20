import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { WebsiteService } from '../../../services/website.service.client';
import { Website } from '../../../models/website.model.client';

@Component({
  selector: 'app-website-edit',
  templateUrl: './website-edit.component.html',
  styleUrls: ['./website-edit.component.css']
})
export class WebsiteEditComponent implements OnInit {

  // properties
  websiteId: String;
  updatedWebsite: Website;
  name: String;
  developerId: String;
  description: String;

  constructor(private websiteService: WebsiteService,
              private activatedRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      (params: any) => {
        this.websiteId = params['wid'];
        this.developerId = params['uid'];
      }
    );

    this.websiteService.findWebsiteById(this.developerId, this.websiteId).subscribe(
      (website: Website) => {
      this.updatedWebsite = website;
    });
  }

  updateWebsite() {
    if (this.updatedWebsite.name.trim() !== '') {
      this.websiteService.updateWebsite(this.developerId, this.updatedWebsite).subscribe(
        (website: Website) => {
          this.updatedWebsite = website;
          const url: any = '/user/' + this.developerId + '/website';
          this.router.navigate([url]);
        }
      );
    }
  }

  deleteWebsite() {
    this.websiteService.deleteWebsite(this.developerId, this.websiteId).subscribe(
      () => {
        const url: any = '/user/' + this.developerId + '/website';
        this.router.navigate([url]);
      }
    );
  }

}
