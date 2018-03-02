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
  websites: any[] = [{ _id: "", name: "", developerId: "", description: "" }];
  newWebsite: Website = { _id: "", name: "", developId: "", description: "" };
  // _id: String, name: String, developerId: String, description: String

  constructor(private websiteService: WebsiteService,
              private activatedRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      (params: any) => {
        this.userId = params['uid'];
      }
    );

    this.websites = this.websiteService.findWebsitesByUser(this.userId);
  }

  createWebsite() {
      this.newWebsite.developId = this.userId;
      this.websiteService.createWebsite(this.userId, this.newWebsite);
      console.log(this.userId);
      const url: any = '/user/' + this.userId + '/website';
      this.router.navigate([url]);
  }

}
