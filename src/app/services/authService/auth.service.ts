import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tokenNotExpired } from 'angular2-jwt';
import { options } from '../../auth.options';


declare var Auth0Lock: any;

@Injectable()
export class Auth {
    lock = new Auth0Lock('YqpVPij0BO7V4dNKndbEDmkKffQkysO6', 'andreyilyin.eu.auth0.com', options);
    accessToken:any;

    constructor(private router:Router) {
        this.lock.on("authenticated", (authResult:any) => {
          if (localStorage.getItem('profile') || localStorage.getItem('connectedVK')) {
            return;
          }
            this.lock.getUserInfo(authResult.accessToken, (error: any, profile: any) => {
                if (error) {
                    throw new Error(error)
                }
                this.accessToken = authResult.accessToken;

                localStorage.setItem('id_token', authResult.idToken);
                localStorage.setItem('profile', JSON.stringify(profile));
            });
        });
    }

    public login() {
        this.lock.show();
    }

    public authenticated() {
        return tokenNotExpired();
    }

    public logout() {
        localStorage.clear();
        this.router.navigate(['/']);
        window.location.reload();
    }

    public getAccessToken() {
      window.location.href = 'https://oauth.vk.com/authorize?client_id=5835738&display=popup&redirect_uri=http://vkphoto-andreyilyin.rhcloud.com/callback&scope=photos&response_type=token&v=5.62&state=123456';
    }
}
