import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { routing, appRoutingProviders } from './app.routing';
import { AUTH_PROVIDERS } from 'angular2-jwt';
import { HttpModule } from '@angular/http';
import { JsonpModule } from '@angular/http';
import { TooltipModule } from 'ng2-bootstrap/tooltip';
import { LazyLoadImageModule } from 'ng2-lazyload-image';
import { SelectModule } from 'ng2-select';
import { FileUploadModule } from 'ng2-file-upload';

import { AppComponent }  from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { CallbackComponent } from  './components/callback/callback.component';
import { AlbumComponent } from './components/album/album.component';
import { PhotoComponent } from './components/photo/photo.component';

import { Auth } from './services/authService/auth.service';
import { AlbumsService } from './services/vkAlbumsService/albums.service';
import { PhotoService } from './services/photoService/photo.service';

import {AuthGuard} from "./auth.guard";

@NgModule({
  imports:      [ TooltipModule.forRoot(), BrowserModule, routing, HttpModule, JsonpModule, LazyLoadImageModule, SelectModule, FileUploadModule ],
  declarations: [
    AppComponent,
    HomeComponent,
    ProfileComponent,
    CallbackComponent,
    AlbumComponent,
    PhotoComponent
  ],
  bootstrap:    [ AppComponent ],
  providers: [
    appRoutingProviders,
    AUTH_PROVIDERS,
    Auth,
    AuthGuard,
    AlbumsService,
    PhotoService
  ]
})
export class AppModule { }
