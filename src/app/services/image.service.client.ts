import { Image } from '../models/image.model.client';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';
import { environment } from '../../environments/environment';
import {Widget} from '../models/widget.model.client';

@Injectable()
export  class ImageService {

  constructor(private http: Http) { }

  baseUrl = environment.baseUrl;
  // constructor(_id:String, type:String, pageId:String, size= '1', text = 'text', url = 'url', width = '100%')
  images: Image[] = [
    new Image('123', 'HEADER', '100', '2', 'GIZMODO'),
    new Image('234', 'HEADER', '100', '4', 'GIZMODO'),
    // new Image('345', 'IMAGE', '100', '2', 'text', '100%', 'https://wow.olympus.eu/webfile/img/1632/x=1024/oly_testwow_stage.jpg'),
    // new Widget('456', 'HTML', '100', '2', '<p>blalbla</p>' ),
    // new Widget('567', 'HEADER', '100', '4', 'text'),
    // new Widget('678', 'IMAGE', '100', '2', 'GIZMODO','100%' , 'http://lorempixel.com/400/200/' ),
    // new Widget('789', 'IMAGE', '100', '2', '<p>Lorem ipsum</p>' ,'100%' , 'http://lorempixel.com/400/200/'),
    // new Widget('789', 'IMAGE', '100', '2', '<p>Lorem ipsum</p>' ,'100%' , 'http://lorempixel.com/400/200/'),
  ];
  initialImage() {
    return new Image(undefined, undefined, undefined, undefined, undefined);
  }

  createImage(userId: String, image: Image) {
    return this.http.post(this.baseUrl + '/api/user/' + userId + '/image', image)
      .map((res: Response) => {
        return res.json();
      });
  }

  updateImage(imageId: String, image: Image) {
    return this.http.put(this.baseUrl + '/api/image/' + imageId, image)
      .map((res: Response) => {
        return res.json();
      });
  }

  deleteImage(imageId: String) {
    return this.http.delete(this.baseUrl + '/api/image/' + imageId)
      .map((res: Response) => {
        return res.json();
      });
  }

  findImagetById(imageId: String) {
    const url = this.baseUrl + '/api/image/' + imageId;
    return this.http.get(url).map(
      (res: Response) => {
        return res.json();
      }
    );
  }
}








