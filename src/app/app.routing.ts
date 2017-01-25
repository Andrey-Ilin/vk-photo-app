import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { CallbackComponent } from './components/callback/callback.component';
import { AlbumComponent } from './components/album/album.component';
import { PhotoComponent } from './components/photo/photo.component';
import { AuthGuard } from "./auth.guard";

const appRoutes: Routes = [
    {
        path: '',
        component: HomeComponent,
    },
    {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [AuthGuard]
    },
    {
      path: 'callback',
      component: CallbackComponent
    },
    {
        path: 'album/:id',
        component: AlbumComponent,
        canActivate: [AuthGuard]
    },
    {
      path: 'album/:albumId/photo/:photoId',
      component: PhotoComponent,
      canActivate: [AuthGuard]
    }
];

export const appRoutingProviders: any[] = [];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
