import { Injectable } from '@angular/core';
import { Http, Headers, Jsonp } from '@angular/http';

import 'rxjs/add/operator/map';

@Injectable()
export class AlbumsService {
  private getAlbumsUrl: string;
  private getUserUrl: string;
  private getAlbumsPhotosUrl: string;
  private getUploadPhotosUrl: string;
  private userId: string;

  constructor(private _http:Http, private _jsonp:Jsonp) {

  }

  getUser(userId: string) {
    this.getUserUrl = 'https://api.vk.com/method/users.get?user_ids=' + userId + '&fields=bdate&v=5.62&callback=JSONP_CALLBACK';
    return this._jsonp.get(this.getUserUrl)
      .map( res => res['_body'])
  }

  getAlbums(userId: string, accessToken: string) {
    this.getAlbumsUrl = 'https://api.vk.com/method/photos.getAlbums?owner_id=' + userId + '&need_covers=1&photo_sizes=1&access_token=' + accessToken + '&v=5.62&callback=JSONP_CALLBACK';
    return this._jsonp.get(this.getAlbumsUrl)
      .map( res => res['_body'])
  }

  getPhotosFromAlbum(userId: string, albumId: string) {
    this.getAlbumsPhotosUrl = 'https://api.vk.com/method/photos.get?owner_id=' + userId + '&photo_sizes=1&album_id=' + albumId + '&v=5.62&callback=JSONP_CALLBACK';
    return this._jsonp.get(this.getAlbumsPhotosUrl)
        .map( res => res['_body'])
  }

  setUserId(userId: string) {
    this.userId = userId;
  }

  getUserId() {
    return this.userId;
  }

  getUploadFotosUrl(albumId:string, accessToken:string) {
    this.getUploadPhotosUrl = 'https://api.vk.com/method/photos.getUploadServer?album_id=' + albumId + '&access_token=' + accessToken + '&v=5.62&callback=JSONP_CALLBACK';
    return this._jsonp.get(this.getUploadPhotosUrl)
      .map( res => res['_body']);
  }
}
