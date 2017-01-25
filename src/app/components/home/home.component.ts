
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '../../services/authService/auth.service'
import { AlbumsService } from '../../services/vkAlbumsService/albums.service'
import { FileUploader } from 'ng2-file-upload';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  private accessToken: string;
  private userId: string;
  private profile: any;
  private albumsCount: any;
  private albumsInfo: any;
  private albums: any;
  public user = {
    first_name: '',
    last_name: ''
  };
  public uploadMode:boolean = false;
  public uploader:FileUploader = new FileUploader({url: ''});;

  private uploadPhotoUrl:string
  public items:Array<any> = [];
  private value:any = {};
  public selected(value:any):void {
    this._albums.getUploadFotosUrl(value.id, this.accessToken)
      .subscribe(data => {
        this.uploadPhotoUrl = data.response.upload_url;
        this.uploader = new FileUploader({url: this.uploadPhotoUrl, authToken: this.accessToken});
      });
  }
  public removed(value:any):void {
    console.log('Removed value is: ', value);
  }
  public typed(value:any):void {
    console.log('New search input: ', value);
  }
  public refreshValue(value:any):void {
    this.value = value;
  }

  public hasBaseDropZoneOver:boolean = false;

  public fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }


  constructor(
      private auth: Auth,
      private _albums: AlbumsService,
      private router:Router
  ) {}

  public getToken() {
    this.auth.getAccessToken();
  }

  ngOnInit(){
     if (localStorage.getItem('connectedVK')) {
       this.profile = JSON.parse(localStorage.getItem('connectedVK'));
       this.accessToken = this.profile.access_token;
       this.userId = this.profile.user_id;
       this._albums.setUserId(this.userId);

       this._albums.getUser(this.userId)
         .subscribe(data => {
             this.user = data.response[0];
         });

       this._albums.getAlbums(this.userId, this.accessToken)
         .subscribe(data => {
           this.albumsInfo = data.response;
           this.albumsCount = this.albumsInfo.count;
           this.albumsInfo.items.forEach((item) => {
               item.created = item.created * 1000;
               item.updated = item.updated * 1000;
           });
          this.albumsInfo.items.forEach((item) => {
            this.items.push({
              id: item.id,
              text: item.title
            })
          });
           console.log(this.items)
         })
       }
  }

    showConnectionButton() {
      return this.auth.authenticated() && !localStorage.getItem('connectedVK');
    }

    showGreatePlace() {
        return this.auth.authenticated() && localStorage.getItem('connectedVK');
    }

    openAlbum(albumId:string) {
      this.router.navigate(['/album/' + albumId]);
    }

  turnUploadMode() {
      this.uploadMode = !this.uploadMode;
    }

}
