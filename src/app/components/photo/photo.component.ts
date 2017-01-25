
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Auth } from '../../services/authService/auth.service'
import { AlbumsService } from '../../services/vkAlbumsService/albums.service'
import { PhotoService } from '../../services/photoService/photo.service'

@Component({
  selector: 'photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.css']
})
export class PhotoComponent implements OnInit{

  private userId: any;
  private albumId: any;
  private photoId: any;
  public photo: any = {
    album_id: '',
    owner: '',
    date: '',
    id: ''
  };
  public imageUrl: string

  constructor(
    private auth: Auth,
    private _photo: PhotoService,
    private _albums:AlbumsService,
    private router:Router,
    private _route: ActivatedRoute
  ) {}

  ngOnInit(){
    this.userId = this._albums.getUserId();
    if (!this.userId) {
      this.auth.logout();
    }
    this._route.params
      .map((params) => {
      this.albumId = params['albumId'];
      this.photoId = params['photoId'];
    })
      .subscribe(() => {
         this._photo.getPhoto(this.userId, this.albumId, this.photoId)
           .subscribe(data => {
             this.photo = data.response.items[0];
             console.log(this.photo)
             if (window.innerWidth < 400) {
               this.photo.sizes.forEach((item) => {
                 if (item.type == "s") {
                   this.imageUrl = item.src;
                 }
               });
             } else {
               if (400 < window.innerWidth && window.innerWidth < 800) {
                 this.photo.sizes.forEach((item) => {
                   if (item.type == "m") {
                     this.imageUrl = item.src;
                   }
                 });
             } else {
                 this.photo.sizes.forEach((item) => {
                   if (item.type == "x") {
                     this.imageUrl = item.src;
                   }
                 });
               }
             }
           })
      })
  }

}


