import {Http, Response} from '@angular/http';
import { Injectable } from '@angular/core';
import {Product} from '../models/product.client';
import {environment} from '../../environments/environment';

@Injectable() // needed as we're injecting Http service into this service
export class FlickrService {

  key = 'c0c6d322f4f9bac48fa8eaa4bcf95bee';
  secret = 'f16fb29025444787';
  urlBase = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=API_KEY&text=TEXT';
  baseUrl = environment.baseUrl;
  constructor(private http: Http) {}

  searchProducts(searchTerm: String) {

    const url = this.baseUrl + "/api/searchProducts/" + searchTerm;
    return this.http.get(url)
      .map((res: Response) => {
        return res.json();
      });
  }
}
