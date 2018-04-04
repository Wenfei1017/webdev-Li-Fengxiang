import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable() // needed as we're injecting Http service into this service
export class FlickrService {

  key = 'c0c6d322f4f9bac48fa8eaa4bcf95bee';
  secret = 'f16fb29025444787';
  urlBase = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=API_KEY&text=TEXT';

  constructor(private http: Http) {}

  searchPhotos(searchTerm: any) {
    const url = this.urlBase
      .replace('API_KEY', this.key)
      .replace('TEXT', searchTerm);
    return this.http.get(url);
  }
}
