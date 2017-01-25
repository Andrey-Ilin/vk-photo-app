
import { Component } from '@angular/core';
import { Auth } from '../../services/authService/auth.service';

@Component({

  selector: 'profile',
  templateUrl: './profile.component.html',
})
export class ProfileComponent  {
  profile:any;
  profileId: number;

  constructor(private auth: Auth) {
    this.profile = JSON.parse(localStorage.getItem('profile'));
    this.profileId = this.profile.identities[0].userId;
    console.log(this.profile.identities[0].userId);
    console.log(typeof this.profile.identities[0].userId);
  }
}
