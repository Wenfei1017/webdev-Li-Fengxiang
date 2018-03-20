

import { Page } from '../models/page.model.client';
import {Injectable} from '@angular/core';
import {forEach} from '@angular/router/src/utils/collection';
import { environment } from '../../environments/environment';
import { Http, Response } from '@angular/http';

@Injectable()
export class PageService {

  constructor(private http: Http) { }

  baseUrl = environment.baseUrl;

  findPagesByWebsiteId(websiteId: String) {
    const url = this.baseUrl + '/api/website/' + websiteId + '/page';
    return this.http.get(url)
      .map((res: Response) => {
        return res.json();
      });
  }

  findPageById(pageId: String) {
    const url = this.baseUrl + '/api/page/' + pageId;
    return this.http.get(url)
      .map((res: Response) => {
      return res.json();
    });
  }

  updatePage(page: Page) {
    const url = this.baseUrl + '/api/page/' + page._id;
    return this.http.put(url, page)
      .map((res: Response) => {
        return res.json();
      });
  }

  deletePage(pageId: String) {
    const url = this.baseUrl + '/api/page/' + pageId;
    return this.http.delete(url)
      .map((res: Response) => {
        console.log("deleteService");
        return res.json();
      });
  }

  createPage(websiteId: String, page: Page) {
    const url = this.baseUrl + '/api/website/' + websiteId + '/page';
    console.log(url);
    return this.http.post(url, page)
      .map((res: Response) => {
        return res.json();
      });
  }
}
