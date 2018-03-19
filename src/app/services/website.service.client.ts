import { Website } from '../models/website.model.client';
import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/Rx';

import {environment} from '../../environments/environment';

@Injectable()
export class WebsiteService {

  constructor(private http: Http){}

  baseUrl = environment.baseUrl;

  websites: Website[] = [
    new Website('321', 'Facebook', '123', 'test' ),
    new Website('111', 'Facebook1', '123', 'test' ),
    new Website('222', 'Facebook2', '123', 'test' ),
    new Website('333', 'Facebook3', '123', 'test' ),
    new Website('432', 'Twitter', '456', 'test' ),
    new Website('234', 'Amazon', '789', 'test' ),
  ];

  // findAllWebSites() {
  //   return this.websites;
  // }
  //
  // createWebsite(userId: String, website: Website) {
  //
  //   const new_website = {
  //     _id: (new Date()).getTime() + '',
  //     name: website.name,
  //     developId: website.developId,
  //     description: website.description
  //   };
  //
  //   this.websites.push(new_website);
  // }
  //
  // findWebsitesByUser(userId: String) {
  //   const resultSet = [];
  //   for ( const i in this.websites) {
  //     if (this.websites[i].developId === userId) {
  //       resultSet.push(this.websites[i]);
  //     }
  //   }
  //   return resultSet;
  // }
  //
  // findWebsitesByUser2(userId: String) {
  //   return this.websites.filter(function (website) {
  //     return website.developId === userId;
  //   });
  // }
  //
  // findWebsitesById(websiteId: String) {
  //   return this.websites.find(function (website) {
  //     return website._id === websiteId;
  //   });
  // }
  //
  // updateWebsite(websiteId: String, website: Website) {
  //   for (const i in this.websites) {
  //     if (this.websites[i]._id === websiteId) {
  //       this.websites[i].name = website.name;
  //       this.websites[i].description = website.description;
  //     }
  //   }
  // }
  //
  // findWebsiteById(websiteId: String) {
  //   for (let x = 0; x < this.websites.length; x++) {
  //     if (this.websites[x]._id === websiteId) {
  //       return this.websites[x];
  //     }
  //   }
  // }
  //
  // deleteWebsite(websiteId: String) {
  //   for (const i in this.websites) {
  //     if (this.websites[i]._id === websiteId) {
  //       const j = +i;
  //       this.websites.splice(j, 1);
  //     }
  //   }
  // }

  findAllWebSites() {
    return this.websites;
  }

  updateWebsite(userId: String, newWebsite: Website) {
    const url =  this.baseUrl + '/api/user/' + userId + '/website/' + newWebsite._id;
    return this.http.put(url, newWebsite).map((response: Response) => {
      return response.json();
    });
  }

  findWebsiteById(userId: String, websiteId: String) {
    const url = this.baseUrl + '/api/user/' + userId + '/website/' + websiteId;
    return this.http.get(url).map((response: Response) => {
      return response.json();
    });
  }

  deleteWebsite(userId: String,  websiteId: String) {
    const url = this.baseUrl + '/api/user/' + userId + '/website/' + websiteId;
    return this.http.delete(url).map((response: Response) => {
      return response.json();
    });
  }

  createWebsiteForUser(userId: String, website: Website) {
    const url = this.baseUrl + '/api/user/' + userId + '/website';
    return this.http.post(url, website).map((response: Response) => {
      const data = response.json();
      return data;
    });
  }

  findWebsitesById(userId: String) {
    const url =  this.baseUrl + "/" + userId + '/website';
    console.log("ooooo");
    console.log(url);
    return this.http.get(url).map((response: Response) => {
      console.log("ttttt");
      return response.json();
    });
  }



}
