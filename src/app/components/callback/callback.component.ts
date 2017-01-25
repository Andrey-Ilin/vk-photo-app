
import { Component, OnInit } from '@angular/core';
import { Auth } from '../../services/authService/auth.service'
import { Router } from '@angular/router';

@Component({

  selector: 'callback',
  templateUrl: './callback.component.html'
})
export class CallbackComponent implements OnInit {
  constructor(private auth: Auth, private router: Router) {}

  ngOnInit(){
    if (window.location.hash) {
      let vkProfileInfo = JSON.stringify(this.parseQuery(window.location.hash.substr(1)));
      localStorage.setItem('connectedVK', vkProfileInfo);
    }
    this.router.navigate(['/']);
  }

  parseQuery(qstr:string) {
    let query = {};
    let a = qstr.split('&');
    for (let i = 0; i < a.length; i++) {
      let b = a[i].split('=');
      query[decodeURIComponent(b[0])] = decodeURIComponent(b[1] || '');
    }
    return query;
  }
}
