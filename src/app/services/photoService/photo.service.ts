
import { Injectable } from '@angular/core';
import { Http, Headers, Jsonp } from '@angular/http';

import 'rxjs/add/operator/map';

@Injectable()
export class PhotoService {
  private getPhotoUrl: string;

  constructor(private _http:Http, private _jsonp:Jsonp) {}

  getPhoto(userId:string, albumId:string, photoId:string) {
    this.getPhotoUrl = 'https://api.vk.com/method/photos.get?owner_id=' + userId + '&photo_sizes=1&album_id=' + albumId + '&photo_ids=' + photoId + '&v=5.62&callback=JSONP_CALLBACK';
    return this._jsonp.get(this.getPhotoUrl)
      .map( res => res['_body'])
  }
}
