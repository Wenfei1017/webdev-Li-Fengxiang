import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { WebsiteService } from '../../../services/website.service.client';
import { Website } from '../../../models/website.model.client';

@Component({
  selector: 'app-website-list',
  templateUrl: './website-list.component.html',
  styleUrls: ['./website-list.component.css']
})

export class WebsiteListComponent implements OnInit {

  userId: String;
  websites: Website[] = [];

  constructor(private websiteService: WebsiteService, private activatedRoute: ActivatedRoute) { }


  ngOnInit() {
    this.activatedRoute.params.subscribe(
      (params: any) => {
        console.log("website-list");
        console.log(params);
        this.userId = params['uid'];
      }
    );

    this.websiteService.findWebsitesById(this.userId).subscribe(
      (websites: Website[]) => {
        this.websites = websites;
      }
    );
  }

}








