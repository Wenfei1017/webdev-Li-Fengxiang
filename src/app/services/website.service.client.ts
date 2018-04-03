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

  initialWebsite() {
    return new Website(undefined, undefined, undefined, undefined);
  }

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
    });
  }

  createWebsiteForUser(userId: String, website: Website) {
    const url = this.baseUrl + '/api/user/' + userId + '/website';
    return this.http.post(url, website).map((response: Response) => {
      return response.json();
    });
  }

  findWebsitesById(userId: String) {
    const url =  this.baseUrl + '/api/user/' + userId + '/website';
    return this.http.get(url).map((response: Response) => {
      return response.json();
    });
  }

}
