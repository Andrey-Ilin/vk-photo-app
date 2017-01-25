
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Auth } from '../../services/authService/auth.service'
import { AlbumsService } from '../../services/vkAlbumsService/albums.service'

@Component({
    selector: 'album',
    templateUrl: './album.component.html',
    styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit{
    private userId: any;
    private photos: any;
    public html: string;

    constructor(
        private auth: Auth,
        private _albums: AlbumsService,
        private router:Router,
        private _route: ActivatedRoute
    ) {}

    ngOnInit(){
        this.userId = this._albums.getUserId();
        this._route.params
            .map(params => params['id'])
            .subscribe((albumId) => {
                this._albums.getPhotosFromAlbum(this.userId, albumId)
                    .subscribe(data => {
                        if (data.error) {
                            this.router.navigate(['/']);
                            return;
                        }
                        this.photos = data.response.items;
                        console.log(this.photos)
                    })
            });
    }

  openPhoto(photo:any){
     this.router.navigate(['album/' + photo.album_id + '/photo/' + photo.id])
  }
}

