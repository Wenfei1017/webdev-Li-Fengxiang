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
    this.updatedWebsite = this.websiteService.findWebsiteById(this.websiteId);
  }

  updateWebsite() {
    if (this.updatedWebsite.name.trim() !== '') {
      this.updatedWebsite.developId = this.developerId;
      this.websiteService.updateWebsite(this.updatedWebsite._id, this.updatedWebsite);
      const url: any = '/user/' + this.developerId + '/website';
      this.router.navigate([url]);
    }
  }

  deleteWebsite() {
    this.websiteService.deleteWebsite(this.websiteId);
    const url: any = '/user/' + this.developerId + '/website';
    this.router.navigate([url]);
  }

}
